import { create } from "zustand";

import { generateRows } from "../utils/generateRows";

import type { Row } from "../types";

interface MapStoreState {
  rows: Row[];
  addRow: () => void;
}

const useMapStore = create<MapStoreState>((set) => ({
  rows: generateRows(20),
  addRow: () => {
    const newRows = generateRows(20);

    set((state) => ({
      rows: [...state.rows, ...newRows],
    }));
  },
}));

export default useMapStore;