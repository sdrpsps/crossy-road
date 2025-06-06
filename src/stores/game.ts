import { create } from "zustand";

interface GameStoreState {
  score: number;
  updateScore: (rowIndex: number) => void;
}

const useGameStore = create<GameStoreState>((set) => ({
  score: 0,
  updateScore: (rowIndex) => {
    set((state) => ({
      score: Math.max(state.score, rowIndex),
    }));
  },
}));

export default useGameStore;
