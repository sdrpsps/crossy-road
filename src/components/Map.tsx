import useMapStore from "../stores/map";
import { Grass } from "./Grass";
import { Row } from "./Row";

// 生成一个从start到end的数组（包含start和end）
const range = (start: number, end: number) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const Map = () => {
  const rows = useMapStore((state) => state.rows);

  return (
    <>
      {/* 生成rowIndex从-10到0的草地 */}
      {range(-10, 0).map((rowIndex) => (
        <Grass key={rowIndex} rowIndex={rowIndex} />
      ))}

      {rows.map((row, index) => {
        return <Row key={index} rowIndex={index + 1} rowData={row} />;
      })}
    </>
  );
};
