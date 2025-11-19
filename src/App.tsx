// src/App.tsx
import React from "react";
import ThreeScene from "./components/ThreeScene";
import ControlPanel from "./components/ControlPanel";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex">
      <ControlPanel />
      <div className="flex-1 relative">
        <ThreeScene />
      </div>
    </div>
  );
};

export default App;
