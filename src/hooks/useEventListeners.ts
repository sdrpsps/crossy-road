import { useEffect } from "react";

import { queueMove } from "../stores/player";
import useGameStore from "../stores/game";

export const useEventListeners = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      if (useGameStore.getState().status !== "running") return;

      switch (event.key) {
        case "ArrowUp":
        case "w":
          queueMove("forward");
          break;
        case "ArrowDown":
        case "s":
          queueMove("backward");
          break;
        case "ArrowLeft":
        case "a":
          queueMove("left");
          break;
        case "ArrowRight":
        case "d":
          queueMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
