import { Control } from "./components/Control";
import { Map } from "./components/Map";
import { Player } from "./components/Player";
import { Result } from "./components/Result";
import { Scene } from "./components/Scene";
import { Score } from "./components/Score";

const Game = () => {
  return (
    <div className="relative h-full w-full">
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Score />
      <Control />
      <Result />
    </div>
  );
};

export default Game;
