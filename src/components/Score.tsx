import useGameStore from "../stores/game";

export const Score = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div className="absolute top-[20px] left-[20px] text-white text-4xl font-pixel">
      {score}
    </div>
  );
};
