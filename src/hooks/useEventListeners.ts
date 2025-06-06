import { useEffect } from "react";

import { queueMove } from "../stores/player";

export const useEventListeners = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

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
