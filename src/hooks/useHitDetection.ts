import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { state as playerState } from "../stores/player";
import useGameStore from "../stores/game";

export const useHitDetection = (
  vehicleRef: React.RefObject<THREE.Group | null>,
  rowIndex: number
) => {
  const endGame = useGameStore((state) => state.endGame);

  useFrame(() => {
    if (!vehicleRef.current) return;
    if (!playerState.ref) return;

    if (
      rowIndex === playerState.currentRow ||
      rowIndex === playerState.currentRow + 1 ||
      rowIndex === playerState.currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicleRef.current);

      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(playerState.ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        endGame();
      }
    }
  });
};
