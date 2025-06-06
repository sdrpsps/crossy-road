import * as THREE from "three";

import { TILE_SIZE } from "../constants";
import { Wheel } from "./Wheel";

interface CarProps {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: THREE.ColorRepresentation;
}

export const Car = ({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}: CarProps) => {
  return (
    <group
      position-x={initialTileIndex * TILE_SIZE}
      rotation-z={direction ? 0 : Math.PI}
    >
      <mesh position={[0, 0, 12]} castShadow receiveShadow>
        <boxGeometry args={[60, 30, 15]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <mesh position={[-6, 0, 25.5]} castShadow receiveShadow>
        <boxGeometry args={[33, 24, 12]} />
        <meshLambertMaterial color={0xffffff} flatShading />
      </mesh>
      <Wheel x={-18} />
      <Wheel x={18} />
    </group>
  );
};
