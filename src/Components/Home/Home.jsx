import React from 'react'
import { useToken } from "../TokenContext/TokenProvider"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Home.css'

function Home() {
  const user = useToken();

  return (
    <>
    <CssBaseline />
      {user && <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#3aafa954',marginTop:"15px",border:"1px solid gray",borderRadius:"4px"}} >
        <Box component="section" sx={{ p: 1,color:"black", width:"100%"}}>
          <div className='Home_Start'><h1>Password Reset Flow Task</h1></div>
          <div className='Home_Start'><h4>Welcome {user.userName}</h4></div>
          <div className='Home_TaskDetail'><h3>Task Details:</h3>
          <ol style={{fontSize: "small"}}>
            <li>Design Forgot password page, where user enter there email id</li>
            <li>Check if the user Exists in DB</li>
            <li>If user not present send error msg</li>
            <li>If the user is found generate the random string adn send a link with that random string to there email </li>
            <li>Store the random string in DB for later verification</li>
            <li>When user enters the link retrive the string and pass it to DB</li>
            <li>Check if the Random string matches</li>
            <li>Store the updated password and clear the radnom string in DB once the user submited the form</li>
            <li>If the string dose not match, send an error to user</li>
          </ol>
          </div>
        </Box>
        <Box component="section" sx={{ p: 1,color:"black", width:"100%", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
          <h2 className='Home_Satrt'>Flow Diagram</h2>
          <div style={{ display:"flex",justifyContent:'center',marginBottom:"5px",paddingBottom:"5px",minWidth: "60%"}}>
            <img className='Home_Img' src='/PasswordReset_FlowDiagram.png' alt='Flow Diagram'/>
          </div>
        </Box>
        </Box>
      </Container>}
      {!user && <Box sx={{ bgcolor: '#3aafa954',marginTop:"15px",border:"1px solid gray",borderRadius:"4px"}} >
        <Box component="section" sx={{ p: 1,color:"black", width:"100%"}}>
          <div className='Home_Error'>
            <p>Please Login to use this application</p>
          </div>
        </Box>
      </Box>}
    </>
  )
}

export default Home

