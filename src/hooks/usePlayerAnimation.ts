import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TILE_SIZE } from "../constants";
import { state, stepCompleted } from "../stores/player";

/**
 * 1. 为什么要 moveClock = new THREE.Clock(false)？
 * •	把 autoStart 设为 false，意味着刚创建时时钟并不“自动跑”。
 * •	如果直接写 new THREE.Clock()，默认是 autoStart = true，时钟会立刻开始计时。但我们希望“仅在玩家按键要走动时”才去计时，其他时候保持静止。
 * •	所以在代码里，moveClock 一开始就是 “running = false”，只有到“队列里确实有新一步需要执行”时，才 moveClock.start()。
 *
 * 2. moveClock.start() 会发生什么？
 * •	它把 running = true，并把内部的“起始时间”（startTime）更新到现在这刻。
 * •	也就是说，从 start() 这刻开始往后，getElapsedTime() 就会从 0 秒往上增长。
 *
 * 3. moveClock.getElapsedTime() 怎么用？
 * •	效果：它会返回“自上一次 start() 后，累计经过了多少秒。
 * •	举例：
 * •	如果刚调用 start()，马上调用 getElapsedTime()，几乎是 0.001 秒等非常小的数值。
 * •	过了 0.1 秒，再调用，得到的就是大约 0.1；
 * •	过了 0.2 秒，就会接近 0.2；
 * •	如果一直没调用 stop()，它还会继续往上，比如 0.3、0.5 …。
 *
 * 4. 为什么要 const progress = Math.min(1, elapsed / stepTime)？
 * 因为我们想把这一段“持续 0.2 秒” 的移动动画，转化成一个“从 0→1 之间变化”的归一化进度（progress）：
 * •	stepTime = 0.2：说明“走一格”的动画要持续 0.2 秒。
 * •	当 elapsed = 0（也就是刚 start() 马上调用）时，elapsed / stepTime = 0 / 0.2 = 0 → progress = 0；
 * •	当 elapsed = 0.1 时，elapsed / stepTime = 0.1 / 0.2 = 0.5 → progress = 0.5；
 * •	当 elapsed = 0.2 时，elapsed / stepTime = 0.2 / 0.2 = 1 → progress = 1；
 * •	如果继续帧驱动（假如下一帧 elapsed = 0.25），那 elapsed / stepTime = 1.25，但是我们用 Math.min(1, 1.25)，把进度钳制在 1。
 *
 * 所以，progress 始终在 0, 1 之间平滑变化，还能判断“动画是否已经到末尾（progress >= 1）”。
 */

/**
 * 究竟 progress 是怎么一步步走到 1 的？
 * 假设玩家刚按下“前进”键，这一帧里：
 *
 * 1.	movesQueue 从空变成 ["forward"]。
 *
 * 2.	useFrame 检测到队列非空，moveClock.running 最开始是 false，于是执行 moveClock.start()。
 *
 * 3.	moveClock.getElapsedTime() 立刻返回一个 “非常接近 0” 的值（因为刚 start），
 * 所以：elapsed ≈ 0; progress = Math.min(1, 0 / 0.2) = 0;
 *
 * 4.	于是此时 setPosition(player, 0) 会把玩家精确放在起始瓦片的中心，z = sin(0) * 8 = 0（脚落地），setRotation(player, 0) 会把角色保持当前朝向。
 *
 * 5.	渲染完这一帧后，浏览器马上请求下一次帧，在短短十几毫秒后：
 * •	moveClock.getElapsedTime() 可能变成了 0.016（16 毫秒，相当于 0.016 秒），
 * •	progress = 0.016 / 0.2 ≈ 0.08；
 * •	这时 setPosition(player, 0.08) 会把角色在 x/y 方向沿直线往“下一个瓦片中心”移动约 8% 的距离，并把 z = sin(0.08π) * 8（脚抬起一点点）。
 *
 * 6.	下下帧再过 16ms，则累计 elapsed ≈ 0.032，progress ≈ 0.032/0.2 = 0.16，player 再往目标方向移动 16%……如此每帧累加，直到大约经过 0.2 秒时， elapsed ≈ 0.2，progress = 1，player 恰好走到目标瓦片中心并落地。
 *
 * 到这一帧，if (progress >= 1) 条件满足，就执行 stepCompleted() 和 moveClock.stop()——
 * •	stepCompleted() 更新格子坐标并把队列中的 "forward" 弹出；
 * •	moveClock.stop() 确保 getElapsedTime() 不会再继续增长，以便“下一步”可以重新从 0 开始。
 */
export const usePlayerAnimation = (
  ref: React.RefObject<THREE.Group | null>
) => {
  const moveClock = new THREE.Clock(false);

  useFrame(() => {
    if (!ref.current) return;
    if (!state.movesQueue.length) return;

    const player = ref.current;

    if (!moveClock.running) moveClock.start();
    const stepTime = 0.2;
    const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

    setPosition(player, progress);
    setRotation(player, progress);

    if (progress >= 1) {
      stepCompleted();
      moveClock.stop();
    }
  });
};

function setPosition(player: THREE.Group, progress: number) {
  const startX = state.currentTile * TILE_SIZE;
  const startY = state.currentRow * TILE_SIZE;
  let endX = startX;
  let endY = startY;

  switch (state.movesQueue[0]) {
    case "forward":
      endY += TILE_SIZE;
      break;
    case "backward":
      endY -= TILE_SIZE;
      break;
    case "left":
      endX -= TILE_SIZE;
      break;
    case "right":
      endX += TILE_SIZE;
      break;
  }

  // 根据 progress（0→1）做线性插值 (lerp)，让角色从 (startX, startY) 平滑移动到 (endX, endY)
  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);

  /**
   * 让角色做一个“抛物线高度”抬升：z 轴 = sin(progress * π) * 8
   * 当 progress = 0 时，sin(0) = 0，z = 0（没有抬起）
   * 当 progress = 0.5 时，sin(0.5π) = 1，z = 8（抬到最高点）
   * 当 progress = 1 时，sin(π) = 0，z = 0（落回地面）
   */
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

function setRotation(player: THREE.Group, progress: number) {
  let endRotation = 0;
  switch (state.movesQueue[0]) {
    case "forward":
      endRotation = 0;
      break;
    case "backward":
      endRotation = Math.PI;
      break;
    case "left":
      endRotation = -Math.PI / 2;
      break;
    case "right":
      endRotation = Math.PI / 2;
      break;
  }

  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
