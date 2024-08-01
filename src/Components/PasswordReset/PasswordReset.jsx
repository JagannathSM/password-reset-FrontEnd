import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import http from "../../../utils/http";
import CircularProgress from '@mui/material/CircularProgress';
import "./PasswordReset.css";

function PasswordReset() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [getToken, setGetToken] = useState(false);
  const [animation,setAnimation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email Needed for verification");
    } else {
      setAnimation(true)
      try {
        const res = await http.post("/auth/reset-pass", { email });
        if (res.data.message) {
          setGetToken(true);
        } else {
          setAnimation(false)
          setError("Something went wrong please try again later!");
        }
      } catch (err) {
        setAnimation(false);
        if (err.message == "Network Error") {
          setError("Connection Timeout! DB not responding");
        } else if (err.response.data) {
          setError(err.response.data);
        }
      }
    }
  };

  return (
    <>
      {!getToken && (
        <div className="Password_Reset_Form">
          <Box
            className="Password_Reset_Box"
            component="form"
            sx={{ m: 1, width: "35ch" }}
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="Password_Reset_Back">
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </div>
            <Typography
              variant="body2"
              className="Password_Reset_header"
              sx={{
                textShadow: "-3px 0px 3px gray",
                fontWeight: "600",
                marginTop: "5px",
                padding: "0px 5px",
              }}
              gutterBottom
            >
              Please Provide registered email to get Password Reset link
            </Typography>
            <TextField
              type="email"
              name="email"
              id="Email"
              label="Registered Email"
              variant="outlined"
              sx={{ margin: "10px 2px", width: "85%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <>
                <Typography
                  variant="body2"
                  className="Password_Reset_Error"
                  gutterBottom
                >
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
              {!animation ? "Get Password Reset Link":<CircularProgress size={24}/>}
            </Button>
          </Box>
        </div>
      )}

      {getToken && (
        <>
          <div className="Password_Reset_Form">
            <Box
              className="Password_Reset_Success_Box"
              component="div"
              sx={{ m: 1, width: "40ch", height: "35vh" }}
            >
              <Typography
                variant="body2"
                className="Password_Reset_Success_Msg"
                sx={{ fontWeight: "700", fontSize: "18px" }}
                gutterBottom
              >
                reset pasword mail sent to <span style={{color:"blue",textDecoration:"underline",textTransform:"lowercase"}}>{email}</span> Successfully. Verify mail and follow the link to resetyour password.
              </Typography>
            </Box>
          </div>
        </>
      ) }
    </>
  );
}

export default PasswordReset;
