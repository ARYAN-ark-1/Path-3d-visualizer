// src/components/ControlPanel.tsx
import React from "react";
import { useDroneControls } from "../store/useDroneControls";

const ControlPanel: React.FC = () => {
  const { isPlaying: _isPlaying, setPlaying, reset } = useDroneControls();


  return (
    <div className="w-64 h-full bg-gray-900 text-white p-6 flex flex-col gap-4 shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Drone Controls</h1>

      <button
        onClick={() => {setPlaying(true);
          //  console.log("🔥 START CLICKED");
        }}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        ▶ Start
      </button>

      <button
        onClick={() => setPlaying(false)}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded"
      >
        ⏸ Stop
      </button>

      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        🔄 Reset
      </button>
    </div>
  );
};

export default ControlPanel;
