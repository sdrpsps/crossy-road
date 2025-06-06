import type { MoveDirection } from "../types";

export const state: {
  currentRow: number;
  currentTile: number;
  moveQueue: MoveDirection[];
} = {
  currentRow: 0,
  currentTile: 0,
  moveQueue: [],
};

export const queueMove = (direction: MoveDirection) => {
  state.moveQueue.push(direction);
};

export const stepCompleted = () => {
  const direction = state.moveQueue.shift();
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
