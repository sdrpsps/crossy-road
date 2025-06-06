import useGameStore from "../stores/game";

export const Result = () => {
  const status = useGameStore((state) => state.status);
  const score = useGameStore((state) => state.score);
  const reset = useGameStore((state) => state.reset);

  if (status !== "over") return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center font-pixel">
      <div className="flex flex-col items-center justify-center gap-5 bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold">Game Over</h1>
        <p className="text-2xl">Your score: {score}</p>
        <button
          className="bg-amber-500 px-4 py-2 rounded-md cursor-pointer"
          onClick={reset}
        >
          Retry
        </button>
      </div>
    </div>
  );
};
