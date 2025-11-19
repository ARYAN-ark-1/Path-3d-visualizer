// src/components/CampusMap.tsx
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, Object3D } from "three";

export const buildingBoxes: Box3[] = [];

interface CampusMapProps {
  url?: string;
}

const CampusMap = ({ url = "/map.glb" }: CampusMapProps) => {
  const gltf = useGLTF(url);

  useEffect(() => {
    buildingBoxes.length = 0;

    if (!gltf || !gltf.scene) return;

    gltf.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const box = new Box3().setFromObject(mesh);
        if (!box.isEmpty()) buildingBoxes.push(box);
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

useGLTF.preload("/map.glb");

export default CampusMap;
