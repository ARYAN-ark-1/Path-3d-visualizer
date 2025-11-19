import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { useDroneControls } from "../store/useDroneControls";
import { createDronePath } from "../utils/path";

const path = createDronePath();

const Drone = forwardRef<Group>((props, ref) => {
  const gltf = useGLTF("/models/Drone.glb") as any;

  const { isPlaying, progress, setProgress, setPlaying } = useDroneControls();

  useFrame((_, delta) => {
    if (!ref || !(ref as any).current) {
      console.log("❌ Drone ref is NULL");
      return;
    }

    const drone = (ref as any).current as Group;

    // DEBUG: log playing & progress
    console.log("isPlaying:", isPlaying, "progress:", progress);

    // --- IF PLAYING, UPDATE PROGRESS ---
    if (isPlaying) {
      const next = progress + delta * 0.1; // speed
      console.log("nextProgress:", next);

      if (next >= 1) {
        console.log("⛔ Reached end — stopping");
        setPlaying(false);
      } else {
        setProgress(next);
      }
    }

    // --- MOVE DRONE ---
    const pos = new Vector3();
    path.getPointAt(progress, pos);

    // DEBUG: print position
    console.log("Drone position:", pos);

    drone.position.copy(pos);

    // --- ORIENT DRONE ---
    const tangent = path.getTangentAt(progress);
    drone.lookAt(pos.clone().add(tangent));
  });

  return (
    <primitive
      ref={ref as any}
      object={gltf.scene}
      scale={3}
      position={[0, 10, 0]}
    />
  );
});

useGLTF.preload("/models/Drone.glb");

export default Drone;
