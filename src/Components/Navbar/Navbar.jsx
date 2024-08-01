import React from "react";
import { useToken } from "../TokenContext/TokenProvider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";
import './Navbar.css'


function Navbar() {
  const user = useToken();
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            {!user && (
              <>
                <div className="Navbar_Container">
                  <div>
                    <Button variant="outlined" sx={{color:"white"}} onClick={()=>{navigate('/')}}>Home</Button>
                  </div>
                  <div>
                    <Button variant="outlined" sx={{color:"white"}} onClick={()=>navigate('/register')} startIcon={<AppRegistrationIcon />}>
                      Register
                    </Button>
                    <Button variant="outlined" sx={{color:"yellow"}} onClick={()=>{navigate('/login')}} startIcon={<LoginIcon />}>
                      Log In
                    </Button>
                  </div>
                </div>
              </>
            )}
            {user && (
              <>
              <div className="Navbar_Container">
                <div>
                  <Button variant="outlined" sx={{color:"white"}} onClick={()=>{navigate('/')}}>Home</Button>
                  <Button variant="outlined" sx={{color:"white"}} onClick={()=>{navigate('/user')}}>User Detail</Button>
                </div>
                <div>
                  <Button variant="outlined" sx={{color:"red"}} onClick={()=>{navigate('/logout')}} endIcon={<LogoutIcon />}>
                    Log Out
                  </Button>
                </div>
              </div>
              </>
            )}

          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
