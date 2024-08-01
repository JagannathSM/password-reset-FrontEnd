import React from "react";
import "./App.css";
import TokenProvider from "./Components/TokenContext/TokenProvider";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";

function App() {
  return (
    <>
      <TokenProvider>
        <Navbar />
        <Routing />
      </TokenProvider>
    </>
  );
}

export default App;
