import * as THREE from "three";

import { TILE_SIZE } from "../constants";
import { Wheel } from "./Wheel";

interface TrunkProps {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: THREE.ColorRepresentation;
}

export const Truck = ({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}: TrunkProps) => {
  return (
    <group
      position-x={initialTileIndex * TILE_SIZE}
      rotation-z={direction ? 0 : Math.PI}
    >
      <mesh position={[-15, 0, 25]} castShadow receiveShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} flatShading />
      </mesh>
      <mesh position={[35, 0, 20]} castShadow receiveShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <Wheel x={-35} />
      <Wheel x={-5} />
      <Wheel x={37} />
    </group>
  );
};
