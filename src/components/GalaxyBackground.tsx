import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Galaxy() {
  const galaxyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001;
      galaxyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={galaxyRef}>
      {/* Realistic Sun - Central bright star */}
      <Sun />

      {/* Mercury - Fast moving small planet */}
      <Mercury />

      {/* Moon - Orbiting around at medium distance */}
      <Moon />

      {/* Other colorful planets */}
      {Array.from({ length: 6 }).map((_, i) => (
        <OrbitingPlanet 
          key={i} 
          radius={4 + i * 2} 
          speed={0.008 / (i + 1)} 
          size={0.12 + Math.random() * 0.08}
          color={`hsl(${i * 60 + 30}, 80%, 65%)`}
        />
      ))}

      {/* Jellyfish floating around */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Jellyfish key={i} index={i} />
      ))}

      {/* Asteroid belt */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Asteroid key={i} index={i} />
      ))}
    </group>
  );
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      sunRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial 
          color="#FFA500" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Sun corona/glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function Mercury() {
  const mercuryRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mercuryRef.current) {
      const angle = state.clock.elapsedTime * 0.02; // Fast orbit
      mercuryRef.current.position.x = Math.cos(angle) * 1.2;
      mercuryRef.current.position.z = Math.sin(angle) * 1.2;
      mercuryRef.current.rotation.y += 0.03;
    }
  });

  return (
    <mesh ref={mercuryRef}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial 
        color="#8C7853" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (moonRef.current) {
      const angle = state.clock.elapsedTime * 0.012;
      moonRef.current.position.x = Math.cos(angle) * 2.5;
      moonRef.current.position.z = Math.sin(angle) * 2.5;
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial 
        color="#C0C0C0" 
        transparent 
        opacity={0.85}
      />
    </mesh>
  );
}

function Jellyfish({ index }: { index: number }) {
  const jellyfishRef = useRef<THREE.Group>(null);
  const radius = 3 + Math.random() * 4;
  const speed = 0.003 + Math.random() * 0.002;
  const floatSpeed = 0.5 + Math.random() * 0.5;
  
  useFrame((state) => {
    if (jellyfishRef.current) {
      const angle = state.clock.elapsedTime * speed + index * 1.2;
      jellyfishRef.current.position.x = Math.cos(angle) * radius;
      jellyfishRef.current.position.z = Math.sin(angle) * radius;
      jellyfishRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed + index) * 2;
      
      // Gentle swaying motion
      jellyfishRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      jellyfishRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.15;
    }
  });

  const jellyfishColor = `hsl(${180 + index * 30}, 70%, 60%)`;

  return (
    <group ref={jellyfishRef}>
      {/* Jellyfish bell/dome */}
      <mesh>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshBasicMaterial 
          color={jellyfishColor}
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* Jellyfish tentacles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.cos(i * Math.PI / 3) * 0.1), 
            -0.3, 
            (Math.sin(i * Math.PI / 3) * 0.1)
          ]}
          rotation={[0, 0, Math.sin(Date.now() * 0.003 + i) * 0.3]}
        >
          <cylinderGeometry args={[0.01, 0.005, 0.4, 4]} />
          <meshBasicMaterial 
            color={jellyfishColor}
            transparent 
            opacity={0.6}
          />
        </mesh>
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