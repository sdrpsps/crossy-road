import { TILE_SIZE, TILES_PER_ROW } from "../constants";

interface RoadProps {
  rowIndex: number;
  children?: React.ReactNode;
}

export const Road = ({ rowIndex, children }: RoadProps) => {
  return (
    <group position-y={rowIndex * TILE_SIZE}>
      <mesh>
        <planeGeometry args={[TILES_PER_ROW * TILE_SIZE, TILE_SIZE]} />
        <meshLambertMaterial color={0x454a59} flatShading />
      </mesh>
      {children}
    </group>
  );
};
