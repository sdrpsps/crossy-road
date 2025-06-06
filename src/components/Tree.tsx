import { TILE_SIZE } from "../constants";

interface TreeProps {
  tileIndex: number;
  height: number;
}

export const Tree = ({ tileIndex, height }: TreeProps) => {
  return (
    <group position-x={tileIndex * TILE_SIZE}>
      <mesh position-z={height / 2 + 20}>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color={0x7aa21d} flatShading />
      </mesh>
      <mesh position-z={10}>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0x4d2926} flatShading />
      </mesh>
    </group>
  );
};
