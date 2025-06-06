import * as THREE from "three";

import { MAX_TILE_INDEX, MIN_TILE_INDEX } from "../constants";

import type { Row, RowType } from "../types";

export const generateRows = (amount: number) => {
  const rows: Row[] = [];

  for (let i = 0; i < amount; i++) {
    const row = generateRow();
    rows.push(row);
  }

  return rows;
};

const generateRow = () => {
  const type: RowType = randomElement(["forest", "car", "truck"]);

  switch (type) {
    case "forest":
      return generateForestMetaData();
    case "car":
      return generateCarLaneMetaData();
    case "truck":
      return generateTruckLaneMetaData();
  }
};

const randomElement = <T>(types: T[]): T => {
  return types[Math.floor(Math.random() * types.length)];
};

const generateForestMetaData = (): Row => {
  const occupiedTiles = new Set<number>();

  const trees = Array.from({ length: 4 }, () => {
    let tileIndex: number;

    do {
      tileIndex = THREE.MathUtils.randInt(MIN_TILE_INDEX, MAX_TILE_INDEX);
    } while (occupiedTiles.has(tileIndex));

    occupiedTiles.add(tileIndex);

    const height = randomElement([20, 45, 60]);

    return { tileIndex, height };
  });

  return { type: "forest", trees };
};

const generateCarLaneMetaData = (): Row => {
  const occupiedTiles = new Set<number>();

  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);

  const vehicles = Array.from({ length: 3 }, () => {
    let initialTileIndex: number;

    do {
      initialTileIndex = THREE.MathUtils.randInt(
        MIN_TILE_INDEX,
        MAX_TILE_INDEX
      );
    } while (occupiedTiles.has(initialTileIndex));

    // 一辆车占三个格
    occupiedTiles.add(initialTileIndex - 1);
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);

    const color: THREE.ColorRepresentation = randomElement([
      0xa52523, 0xbdb638, 0x78b14b,
    ]);

    return { initialTileIndex, color };
  });

  return { type: "car", vehicles, direction, speed };
};

const generateTruckLaneMetaData = (): Row => {
  const occupiedTiles = new Set<number>();

  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);

  const vehicles = Array.from({ length: 2 }, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(
        MIN_TILE_INDEX,
        MAX_TILE_INDEX
      );
    } while (occupiedTiles.has(initialTileIndex));

    // 一辆卡车占五个格子
    occupiedTiles.add(initialTileIndex - 2);
    occupiedTiles.add(initialTileIndex - 1);
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);
    occupiedTiles.add(initialTileIndex + 2);

    const color: THREE.ColorRepresentation = randomElement([
      0xa52523, 0xbdb638, 0x78b14b,
    ]);

    return { initialTileIndex, color };
  });

  return { type: "truck", direction, speed, vehicles };
};
