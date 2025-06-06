import { Canvas } from "@react-three/fiber";

interface SceneProps {
  children: React.ReactNode;
}

export const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas
      className="font-pixel"
      orthographic
      shadows
      camera={{
        up: [0, 0, 1],
        position: [300, -300, 300],
      }}
    >
      <ambientLight />
      {children}
    </Canvas>
  );
};
