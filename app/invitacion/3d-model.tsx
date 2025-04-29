"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Float } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import type { Mesh } from "three";

function GraduationCap() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <motion.group
      initial={{ scale: 0, rotateX: 0 }}
      animate={{ scale: 1, rotateX: Math.PI * 2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <mesh position={[0, 0, 0]} scale={1}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.2, 1, 0.8, 4]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </motion.group>
  );
}

function EngineeringGear({ position, rotation, scale, color }: any) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        state.clock.getElapsedTime() * (rotation === "clockwise" ? 0.5 : -0.5);
    }
  });

  // Create a gear shape
  const createGearShape = () => {
    const teeth = 12;
    const innerRadius = 0.7;
    const outerRadius = 1;
    const toothHeight = 0.2;

    return (
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[outerRadius, outerRadius, 0.2, teeth * 2]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    );
  };

  return createGearShape();
}

export default function EngineeringScene() {
  return (
    <div className="w-full h-[40vh] md:h-[50vh]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <MotionConfig transition={{ duration: 0.5 }}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <GraduationCap />
          </Float>

          <EngineeringGear
            position={[-2, -1, 0]}
            rotation="clockwise"
            scale={0.8}
            color="#d4af37"
          />
          <EngineeringGear
            position={[-1, 0, 0]}
            rotation="counterclockwise"
            scale={0.6}
            color="#f59e0b"
          />
          <EngineeringGear
            position={[2, -1, 0]}
            rotation="counterclockwise"
            scale={0.8}
            color="#d4af37"
          />
          <EngineeringGear
            position={[1, 0, 0]}
            rotation="clockwise"
            scale={0.6}
            color="#f59e0b"
          />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <Text
              position={[0, -2, 0]}
              fontSize={0.5}
              color="#f59e0b"
              font="/fonts/Geist_Bold.json"
              anchorX="center"
              anchorY="middle"
            >
              INGENIERÍA 2025
            </Text>
          </Float>
        </MotionConfig>
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
