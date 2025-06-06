import type { MoveDirection } from "../types";
import { endsUpInValidPosition } from "../utils/endsUpInValidPosition";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
};

export const queueMove = (direction: MoveDirection) => {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: state.currentRow,
      tileIndex: state.currentTile,
    },
    [...state.movesQueue, direction]
  );

  if (!isValidMove) return;

  state.movesQueue.push(direction);
};

export const stepCompleted = () => {
  const direction = state.movesQueue.shift();
  if (!direction) return;

  switch (direction) {
    case "forward":
      state.currentRow++;
      break;
    case "backward":
      state.currentRow--;
      break;
    case "left":
      state.currentTile--;
      break;
    case "right":
      state.currentTile++;
      break;
  }
};
