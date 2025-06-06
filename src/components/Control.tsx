import { useEventListeners } from "../hooks/useEventListeners";
import { queueMove } from "../stores/player";

export const Control = () => {
  useEventListeners();

  return (
    <div className="absolute bottom-5 flex justify-center items-center w-full">
      <div className="grid grid-cols-3 gap-4">
        <button
          className="control-button col-span-full"
          onClick={() => queueMove("forward")}
        >
          ▲
        </button>
        <button className="control-button" onClick={() => queueMove("left")}>
          ◀
        </button>
        <button
          className="control-button"
          onClick={() => queueMove("backward")}
        >
          ▼
        </button>
        <button className="control-button" onClick={() => queueMove("right")}>
          ▶
        </button>
      </div>
    </div>
  );
};
