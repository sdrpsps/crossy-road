import * as THREE from "three";
import { MAX_TILE_INDEX, MIN_TILE_INDEX, TILE_SIZE } from "../constants";
import { useFrame } from "@react-three/fiber";

export const useVehicleAnimation = (
  ref: React.RefObject<THREE.Group | null>,
  direction: boolean,
  speed: number
) => {
  useFrame((_state, delta) => {
    if (!ref?.current) return;
    const vehicle = ref.current;

    /**
     * EXPLAIN FROM o4-mini-high:
     * -2 和 +2，本质上就是给“可见瓷砖区域”在左右各加两块瓷砖宽度的“隐藏缓冲区”，
     * 保证车辆完全跑出画面后再重生，并且在真正进入可见区域之前，先从缓冲区慢慢跑出来。
     */
    const beginningOfRow = (MIN_TILE_INDEX - 2) * TILE_SIZE;
    const endOfRow = (MAX_TILE_INDEX + 2) * TILE_SIZE;

    // direction true 表示车辆向右移动， false 表示车辆向左移动
    const nextPosition = vehicle.position.x + (direction ? 1 : -1) * speed * delta;

    const isOutOfBounds = direction
      ? nextPosition > endOfRow
      : nextPosition < beginningOfRow;

    vehicle.position.x = isOutOfBounds
      ? direction
        ? beginningOfRow
        : endOfRow
      : nextPosition;
  });
};
