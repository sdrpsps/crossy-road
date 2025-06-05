import { Canvas } from "@react-three/fiber";

interface SceneProps {
  children: React.ReactNode;
}

export const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas
      orthographic
      camera={{
        up: [0, 0, 1],
        position: [300, -300, 300],
      }}
    >
      <ambientLight />
      <directionalLight position={[-100, -100, 200]} />
      {children}
    </Canvas>
  );
};
