// src/components/ThreeScene.tsx
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sky,
  Environment,
  Html,
  Line,
} from "@react-three/drei";

import Drone from "./Drone";
import CampusMap from "./CampusMap";
import CameraButtons from "./CameraButtons";
import { createDronePath } from "../utils/path";

const path = createDronePath();
const points = path.getPoints(400);

/* Loader */
function Loader() {
  return (
    <Html center>
      <div className="bg-black/70 text-white px-4 py-2 rounded">
        Loading...
      </div>
    </Html>
  );
}

/* Camera follow logic MUST be inside Canvas */
function CameraFollow({ controlsRef, droneRef }: any) {
  useFrame(() => {
    if (!controlsRef.current || !droneRef.current) return;
    const p = droneRef.current.position;
    controlsRef.current.target.set(p.x, p.y, p.z);
    controlsRef.current.update();
  });
  return null;
}

export default function ThreeScene() {
  const droneRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full">
      <CameraButtons
        zoomIn={() => controlsRef.current?.dollyIn?.(0.9)}
        zoomOut={() => controlsRef.current?.dollyOut?.(0.9)}
        rotateLeft={() => controlsRef.current?.rotateLeft?.(0.2)}
        rotateRight={() => controlsRef.current?.rotateRight?.(0.2)}
      />

      <Canvas shadows camera={{ position: [40, 40, 40], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <directionalLight castShadow intensity={1} position={[60, 150, 60]} />

        <Sky sunPosition={[60, 150, 60]} />
        <Environment preset="city" />

        <Suspense fallback={<Loader />}>
          <CampusMap />               {/* Load campus */}
          <Drone ref={droneRef} />    {/* Drone with forwarded ref */}
          <Line points={points} color="yellow" lineWidth={3} />  
        </Suspense>

        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.06} />
        {/* FOLLOW CAMERA FIXED */}
        <CameraFollow controlsRef={controlsRef} droneRef={droneRef} />
      </Canvas>
    </div>
  );
}
