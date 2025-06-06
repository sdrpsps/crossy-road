import { Car } from "./Car";
import { Road } from "./Road";

import type { Row as RowType } from "../types";

interface CarLaneProps {
  rowIndex: number;
  rowData: Extract<RowType, { type: "car" }>;
}

export const CarLane = ({ rowIndex, rowData }: CarLaneProps) => {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        ></Car>
      ))}
    </Road>
  );
};
