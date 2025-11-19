// src/components/CameraButtons.tsx
import React from "react";

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
};

const CameraButtons: React.FC<Props> = ({ zoomIn, zoomOut, rotateLeft, rotateRight }) => {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2 z-50">
      <button onClick={zoomIn} className="bg-white px-3 py-2 rounded shadow">➕ Zoom In</button>
      <button onClick={zoomOut} className="bg-white px-3 py-2 rounded shadow">➖ Zoom Out</button>
      <button onClick={rotateLeft} className="bg-white px-3 py-2 rounded shadow">↺ Rotate</button>
      <button onClick={rotateRight} className="bg-white px-3 py-2 rounded shadow">↻ Rotate</button>
    </div>
  );
};

export default CameraButtons;
