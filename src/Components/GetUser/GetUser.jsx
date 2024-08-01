import React, { useEffect, useState } from "react";
import http from "../../../utils/http";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";

function GetUser() {
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");
  const [avatarName,setAvatarName] = useState('');

  const getUserData = async () => {
    try {
      const { data } = await http.get("/user/");
      setNewUser(data.user);
    } catch (err) {
      setError(`Error loding details ${err}`);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); 

  useEffect(() => {
    if(newUser){
        setAvatarName(newUser.userName.split('')[0])
    }
  }, [newUser]); 

  return (
    <>
      {!error && newUser ? <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height:"55vh",
          paddingTop:"10px"
        }}
      >
        <Card
          sx={{
            maxWidth: 250,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            margin: "10px 0px",
            flexDirection:"column",
            padding:"10px"
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              textAlign: "center",
              justifyContent: "center",
            }}
            alt={newUser.userName}
            src="#"
          >
            {avatarName}
          </Avatar>
          <CardContent
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
              paddingBottom:"16px"
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {newUser.userName}
            </Typography>
            <Typography variant="div" color="text.secondary">
              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom:"0px"
                }}
              >
                <EmailIcon
                  color="secondary"
                  fontSize="small"
                  sx={{ marginRight: "5px" }}
                />
                {newUser.email}
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </div> : ""}
      {!newUser && error ?<div>
        <h3>Error loading user data</h3>
      </div> : ''}
    </>
  );
}

export default GetUser;
