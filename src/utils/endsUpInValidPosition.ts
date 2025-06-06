import { calculateFinalPosition } from "./calculateFinalPosition";

import { MAX_TILE_INDEX, MIN_TILE_INDEX } from "../constants";
import useMapStore from "../stores/map";

import type { MoveDirection } from "../types";

export const endsUpInValidPosition = (
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) => {
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // 地图边缘
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === MIN_TILE_INDEX - 1 ||
    finalPosition.tileIndex === MAX_TILE_INDEX + 1
  ) {
    return false;
  }

  // 撞树
  const finalRow = useMapStore.getState().rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    return false;
  }

  return true;
};
