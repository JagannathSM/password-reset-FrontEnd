import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../utils/http";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useToken } from "../TokenContext/TokenProvider";
import CircularProgress from '@mui/material/CircularProgress';
import './Register.css'

function Register() {
  let navigate = useNavigate();
  let user = useToken();

  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [register,setRegister] = useState(false);
  const [animation,setAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.userName || !userDetails.password || !userDetails.email) {
      setError("Credentials are required to register");
    } else {
      setAnimation(true)
      try {
        const { data } = await http.post("/auth/register", userDetails);
        if(data.message == "Successfully Registered"){
          setRegister(true);
        }
      } catch (err) {
        setAnimation(false);
        if(err.message){
          setError("Connection Timeout! DB not responding");
        } else {
          setError(err.response.data);
        }
        }
      }
    };

    useEffect(()=>{
      if(user){
        navigate("/")
      }
    },[])

  return (
    <>
      <div className="Register_Form">
        {!register && <Box
          className="Register_Box"
          component="form"
          sx={{ m: 1, width: "38ch" }}
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Typography
            variant="body2"
            className="Register_header"
            sx={{
              textShadow: " -3px 0px 3px gray",
              fontWeight: "600",
              marginTop: " 5px",
            }}
            gutterBottom
          >
            Provide valid credentials to Register
          </Typography>
          <TextField
            type="text"
            name="userName"
            id="UserName"
            label="User Name"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            onChange={handleChange}
          />
          <TextField
            type="email"
            name="email"
            id="Email"
            label="Email"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            id="Password"
            label="Password"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            onChange={handleChange}
          />
          {error && (
            <>
              <Typography variant="body2" className="Register_Error" gutterBottom>
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
            {!animation ? "Register": <CircularProgress size={24}/>}
          </Button>
        </Box>}

          {register && <Box className="Register_Success_Box"
          component="div"
          sx={{ m: 1, width: "35ch", height:"30vh" }}>
            <Typography variant="body2" className="Register_Success_Msg" sx={{fontWeight:"700",fontSize: "18px"}} gutterBottom>
         successfully Registered please login with registered credentials.
      </Typography>
            </Box>}

      </div>
    </>
  )
}

export default Register;
