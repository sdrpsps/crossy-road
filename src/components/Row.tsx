import { CarLane } from "./CarLane";
import { Forest } from "./Forest";
import { TruckLane } from "./TruckLane";

import type { Row as RowType } from "../types";

interface RowProps {
  rowIndex: number;
  rowData: RowType;
}

export const Row = ({ rowIndex, rowData }: RowProps) => {
  switch (rowData.type) {
    case "forest":
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    case "car":
      return <CarLane rowIndex={rowIndex} rowData={rowData} />;
    case "truck":
      return <TruckLane rowIndex={rowIndex} rowData={rowData} />;
  }
};
