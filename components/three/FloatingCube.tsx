"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Cube() {
  const cubeRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!cubeRef.current) return;
    const t = clock.getElapsedTime();
    cubeRef.current.rotation.y = t * 0.5;
    cubeRef.current.position.y = Math.sin(t) * 0.3;
  });

  return (
    <RoundedBox ref={cubeRef} args={[2.2, 2.2, 2.2]} radius={0.18} smoothness={4}>
      <meshBasicMaterial color="#c9ff47" wireframe />
    </RoundedBox>
  );
}

export default function FloatingCube() {
  return (
    <div className="mx-auto h-[320px] w-[320px] sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <Cube />
      </Canvas>
    </div>
  );
}
