import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import http from "../../../utils/http"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import "./NewPassword.css";

function NewPassword() {
  const { passResetToken } = useParams();

  const [newPassword,setNewPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const [error,setError] = useState('');
  const [open,setOpen] = useState(false);

  const [animation,setAnimation] = useState(false);

  const updatePassword = async(e) =>{
    e.preventDefault();
    if(!newPassword || !confirmPassword){
      setError("Enter Password")
    } else if(newPassword != confirmPassword){
      setError("Password didnt match")
    } else {
      setAnimation(true);
      try{
        const {data} = await http.put(`/auth/update-pass/${passResetToken}`,{newPassword})
        if(data.message == "Updated password Succesfully"){
          setOpen(true);
        }
      } catch (err){
        setAnimation(false)
        if(err.response.status == 404){
          setError("Invalid Token / Reset Token Expires!")
        } else if (err.response.status == 500){
          setError("Reset Token Expires!")
        } else {
          setError("Connection timeout!")
        }
      }
    }
  }


  return (
    <>
      {!open ? <div className="New_Password_Form">
        <Box
          className="New_Password_Box"
          component="form"
          sx={{ m: 1, width: "35ch" }}
          noValidate
          onSubmit={updatePassword}
          autoComplete="off"
        >
          <Typography
            variant="body2"
            className="New_Password_header"
            sx={{
              textShadow: " -3px 0px 3px gray",
              fontWeight: "600",
              marginTop: " 5px",
            }}
            gutterBottom
          >
            Enter Your New Password
          </Typography>
          <TextField
            type="password"
            name="newPassword"
            id="newPass"
            label="New Password"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            name="confirm_password"
            id="confirm_Password"
            label="Confirm Password"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          {error && (
            <>
              <Typography variant="body2" className="New_Password_Error" gutterBottom>
                {error}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            type="submit"
            color="success"
          >
            {!animation ? "Update Password":<CircularProgress size={24}/>}
          </Button>
        </Box>
      </div> :
      <>
      <div className="New_Password_Form">
            <Box
              className="New_Password_Success_Box"
              component="div"
              sx={{ m: 1, width: "38ch", height: "33vh" }}
            >
              <Typography
                variant="body2"
                className="New_Password_Success_Msg"
                sx={{ fontWeight: "700", fontSize: "18px" }}
                gutterBottom
              >
                password reset successful. please enter updated password to login.
              </Typography>
            </Box>
          </div>
      </>
      }
    </>
  )
}

export default NewPassword
