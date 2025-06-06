import { Bounds } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { usePlayerAnimation } from "../hooks/usePlayerAnimation";
import { setPlayerRef } from "../stores/player";
import { DirectionLight } from "./DirectionLight";

export const Player = () => {
  const playerRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  const camera = useThree((state) => state.camera);

  usePlayerAnimation(playerRef);

  useEffect(() => {
    if (!playerRef.current) return;
    if (!lightRef.current) return;

    playerRef.current.add(camera);
    playerRef.current.add(lightRef.current);

    setPlayerRef(playerRef.current);
  });

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={playerRef}>
        <group>
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[15, 15, 20]} />
            <meshLambertMaterial color={0xffffff} flatShading />
          </mesh>
          <mesh position={[0, 0, 21]}>
            <boxGeometry args={[2, 4, 2]} />
            <meshLambertMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionLight ref={lightRef} />
      </group>
    </Bounds>
  );
};
