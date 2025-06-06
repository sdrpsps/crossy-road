import { Grass } from "./Grass";
import { Tree } from "./Tree";

import type { Row } from "../types";

interface ForestProps {
  rowIndex: number;
  rowData: Extract<Row, { type: "forest" }>;
}

export const Forest = ({ rowIndex, rowData }: ForestProps) => {
  return (
    <Grass rowIndex={rowIndex}>
      {rowData.trees.map((tree, index) => (
        <Tree key={index} tileIndex={tree.tileIndex} height={tree.height} />
      ))}
    </Grass>
  );
};
