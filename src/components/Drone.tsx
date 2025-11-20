import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { useDroneControls } from "../store/useDroneControls";
import { createDronePath } from "../utils/path";

const path = createDronePath();

const Drone = forwardRef<Group>((_props, ref) => {
  const gltf = useGLTF("/models/Drone.glb") as any;
  const { isPlaying, progress, setProgress, setPlaying } = useDroneControls();

  useFrame((_, delta) => {
    if (!ref || !(ref as any).current) return;

    const drone = (ref as any).current as Group;

    if (isPlaying) {
      const next = progress + delta * 0.1;
      if (next >= 1) {
        setPlaying(false);
      } else {
        setProgress(next);
      }
    }

    const pos = new Vector3();
    path.getPointAt(progress, pos);
    drone.position.copy(pos);

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
