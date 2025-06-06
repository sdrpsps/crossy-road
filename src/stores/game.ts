import { create } from "zustand";

import { reset as resetPlayer } from "./player";
import useMapStore from "./map";

interface GameStoreState {
  status: "running" | "over";
  score: number;
  updateScore: (rowIndex: number) => void;
  endGame: () => void;
  reset: () => void;
}

const useGameStore = create<GameStoreState>((set) => ({
  status: "running",
  score: 0,
  updateScore: (rowIndex) => {
    set((state) => ({
      score: Math.max(state.score, rowIndex),
    }));
  },
  endGame: () => {
    set({ status: "over" });
  },
  reset: () => {
    set({ status: "running", score: 0 });
    useMapStore.getState().reset();
    resetPlayer();
  },
}));

export default useGameStore;
