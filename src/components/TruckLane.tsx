import type { Row as RowType } from "../types";
import { Road } from "./Road";
import { Truck } from "./Truck";

interface TruckLaneProps {
  rowIndex: number;
  rowData: Extract<RowType, { type: "truck" }>;
}

export const TruckLane = ({ rowIndex, rowData }: TruckLaneProps) => {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Truck
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        />
      ))}
    </Road>
  );
};
