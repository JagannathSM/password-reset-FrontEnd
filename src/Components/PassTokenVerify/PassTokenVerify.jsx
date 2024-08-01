import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import http from "../../../utils/http";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./PassTokenVerify.css";


function PassTokenVerify() {
  let navigate = useNavigate();
  const { passResetToken } = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate(`/password-reset/${passResetToken}`);
  };

  const checkToken = async () => {
    try {
      const { data } = await http.get(`/auth/verify-token/${passResetToken}`);
      console.log(data);
      handleClick();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response.status == 404) {
        setError(err.response.data || "Token already used");
      } else if (err.response.status == 500) {
        setError(err.response.data || "Token validity ends");
      } else {
        setError("Connect timeout! Try again later");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [passResetToken]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Verifyed Token Succesfully! You will redirected to next page in 5s
        </Alert>
      </Snackbar>
      {loading && !error ? (
        <div className="Pass_Token_Verify">
          <Box
            className="Pass_Token_Error_Box"
            component="div"
            sx={{ m: 1, width: "30ch", height: "30vh" }}
          >
            <CircularProgress />
            <Typography
              variant="body2"
              className="Pass_Token_Error_Msg"
              sx={{ fontWeight: "700", fontSize: "18px" }}
              gutterBottom
            >
              Verifying token please wait
            </Typography>
          </Box>
        </div>
      ) : (
        ""
      )}
      <div>
        {!loading && error ? (
          <>
            <div className="Pass_Token_Verify">
              <Box
                className="Pass_Token_Error_Box"
                component="div"
                sx={{ m: 1, width: "30ch", height: "30vh" }}
              >
                <Typography
                  variant="body2"
                  className="Pass_Token_Error_Msg"
                  sx={{ fontWeight: "700", fontSize: "18px" }}
                  gutterBottom
                >
                  {error}
                </Typography>
              </Box>
            </div>
          </>
        ) : (
          ""
        )}
        {!loading && !error ? (
          <>
            <div className="Pass_Token_Verify">
              <Box
                className="Pass_Token_Error_Box"
                component="div"
                sx={{ m: 1, width: "30ch", height: "30vh" }}
              >
                <Typography
                  variant="body2"
                  className="Pass_Token_Error_Msg"
                  sx={{ fontWeight: "700", fontSize: "18px" }}
                  gutterBottom
                >
                  If you didnt redirect to next page, please click below button
                  to redirect
                </Typography>
                <Button
                  onClick={() => navigate(`/password-reset/${passResetToken}`)}
                >
                  Click here
                </Button>
              </Box>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PassTokenVerify;
