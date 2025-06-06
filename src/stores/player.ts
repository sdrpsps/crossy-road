import * as THREE from "three";

import { endsUpInValidPosition } from "../utils/endsUpInValidPosition";
import useMapStore from "./map";

import type { MoveDirection } from "../types";
import useGameStore from "./game";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
  ref: THREE.Object3D | null;
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
  ref: null,
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

  if (state.currentRow === useMapStore.getState().rows.length - 10) {
    useMapStore.getState().addRow();
  }

  useGameStore.getState().updateScore(state.currentRow);
};

export const setPlayerRef = (ref: THREE.Object3D) => {
  state.ref = ref;
};

export const reset = () => {
  state.currentRow = 0;
  state.currentTile = 0;
  state.movesQueue = [];

  if (!state.ref) return;

  state.ref.position.x = 0;
  state.ref.position.y = 0;
  state.ref.children[0].rotation.z = 0;
};
