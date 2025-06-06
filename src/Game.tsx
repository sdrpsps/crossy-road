import { Control } from "./components/Control";
import { Map } from "./components/Map";
import { Player } from "./components/Player";
import { Scene } from "./components/Scene";

const Game = () => {
  return (
    <div className="relative h-full w-full">
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Control />
    </div>
  );
};

export default Game;
