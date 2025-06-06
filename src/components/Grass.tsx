import { TILE_SIZE, TILES_PER_ROW } from "../constants";

interface GrassProps {
  rowIndex: number;
  children?: React.ReactNode;
}

export const Grass = ({ rowIndex, children }: GrassProps) => {
  return (
    <group position-y={rowIndex * TILE_SIZE}>
      <mesh receiveShadow>
        <boxGeometry args={[TILES_PER_ROW * TILE_SIZE, TILE_SIZE, 3]} />
        <meshLambertMaterial color={0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  );
};
