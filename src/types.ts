import * as THREE from "three";

export type RowType = "forest" | "car" | "truck";

// TODO: pick a standalone type for the row type
export type Row =
  | {
      type: "forest";
      trees: { tileIndex: number; height: number }[];
    }
  | {
      type: "car";
      direction: boolean; // true 表示车辆向右移动， false 表示车辆向左移动
      speed: number;
      vehicles: {
        initialTileIndex: number;
        color: THREE.ColorRepresentation;
      }[];
    }
  | {
      type: "truck";
      direction: boolean; // true 表示车辆向右移动， false 表示车辆向左移动
      speed: number;
      vehicles: {
        initialTileIndex: number;
        color: THREE.ColorRepresentation;
      }[];
    };
