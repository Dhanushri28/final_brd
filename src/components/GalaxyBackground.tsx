import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Galaxy() {
  const galaxyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.002;
      galaxyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={galaxyRef}>
      {/* Central bright star */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Orbiting planets */}
      {Array.from({ length: 8 }).map((_, i) => (
        <OrbitingPlanet 
          key={i} 
          radius={2 + i * 1.5} 
          speed={0.01 / (i + 1)} 
          size={0.1 + Math.random() * 0.1}
          color={`hsl(${i * 45}, 70%, 60%)`}
        />
      ))}

      {/* Asteroid belt */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Asteroid key={i} index={i} />
      ))}
    </group>
  );
}

function OrbitingPlanet({ radius, speed, size, color }: { 
  radius: number; 
  speed: number; 
  size: number; 
  color: string; 
}) {
  const planetRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (planetRef.current) {
      const angle = state.clock.elapsedTime * speed;
      planetRef.current.position.x = Math.cos(angle) * radius;
      planetRef.current.position.z = Math.sin(angle) * radius;
      planetRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.7}
      />
    </mesh>
  );
}

function Asteroid({ index }: { index: number }) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const radius = 5 + Math.random() * 3;
  const speed = 0.005 + Math.random() * 0.005;
  const size = 0.02 + Math.random() * 0.03;
  
  useFrame((state) => {
    if (asteroidRef.current) {
      const angle = state.clock.elapsedTime * speed + index * 0.3;
      asteroidRef.current.position.x = Math.cos(angle) * radius;
      asteroidRef.current.position.z = Math.sin(angle) * radius;
      asteroidRef.current.position.y = (Math.sin(angle * 2) * 0.5);
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={asteroidRef}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial 
        color="#888888" 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FFD700" />
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
        />
        <Galaxy />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}