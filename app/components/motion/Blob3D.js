"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";

function Blob() {
  const mesh = useRef(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    mesh.current.rotation.y += 0.0015;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.3}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#ff5a1f"
          distort={0.45}
          speed={1.8}
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

export default function Blob3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <directionalLight position={[-3, -2, -3]} intensity={0.5} color="#5b4cff" />
      <Blob />
    </Canvas>
  );
}
