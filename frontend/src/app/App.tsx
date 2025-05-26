import React, { useEffect, useState } from "react";
import PanelGroupComponent from "../components/panelGroup";
import Navbar from "../components/nav";

function App() {
  return (
    <div>
      <Navbar />
      <PanelGroupComponent />
    </div>
  )
}

export default App;
