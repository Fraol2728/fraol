"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Points } from "three";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const lime = new THREE.Color("#c9ff47");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 14;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 14;

      const color = Math.random() > 0.65 ? lime : white;
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.04;
    pointsRef.current.position.y = Math.sin(t * 0.15) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors sizeAttenuation transparent opacity={0.95} />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <color attach="background" args={["#080808"]} />
        <Particles />
        <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} enablePan={false} />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.25} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
