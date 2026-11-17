import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIslandBaseProps {
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  radiusTop?: number;
  radiusBottom?: number;
  depth?: number;
  grassColor?: string;
  rockColor?: string;
  segments?: number;
  hasWaterfallCutout?: boolean;
}

export const FloatingIslandBase: React.FC<FloatingIslandBaseProps> = ({
  position = [0, 0, 0],
  scale = 1,
  radiusTop = 6,
  radiusBottom = 1.4,
  depth = 4.2,
  grassColor = '#7cb342',
  rockColor = '#7c6248',
  segments = 11,
}) => {
  const rockGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(radiusTop * 0.96, radiusBottom, depth, segments, 4);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Keep top rim flat so grass sits cleanly, jitter lower vertices for low-poly faceted cliff look
      if (y < depth * 0.42) {
        const seed = Math.sin(x * 3.7 + z * 2.3 + y * 1.9) * 43758.5453;
        const noise = seed - Math.floor(seed);
        const radialFactor = 0.84 + noise * 0.32;
        pos.setX(i, x * radialFactor);
        pos.setZ(i, z * radialFactor);
        pos.setY(i, y + (noise - 0.5) * 0.45);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, [radiusTop, radiusBottom, depth, segments]);

  return (
    <group position={position} scale={scale}>
      {/* Top Lush Grass Cap */}
      <mesh position={[0, 0.18, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[radiusTop, radiusTop * 1.02, 0.42, segments * 2]} />
        <meshStandardMaterial color={grassColor} roughness={0.78} flatShading />
      </mesh>

      {/* Secondary Upper Grass Terrace Rim */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[radiusTop * 1.01, radiusTop * 0.97, 0.25, segments]} />
        <meshStandardMaterial color="#689f38" roughness={0.82} flatShading />
      </mesh>

      {/* Low-Poly Faceted Cliff Underside */}
      <mesh geometry={rockGeo} position={[0, -depth / 2 - 0.05, 0]} receiveShadow castShadow>
        <meshStandardMaterial color={rockColor} roughness={0.9} flatShading />
      </mesh>
    </group>
  );
};

export const PineTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position, scale = 1, color = '#3b6e28' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.14, 0.7, 6]} />
        <meshStandardMaterial color="#6d4c3d" roughness={0.9} flatShading />
      </mesh>
      {/* Tier 1 */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.62, 1.0, 7]} />
        <meshStandardMaterial color={color} roughness={0.8} flatShading />
      </mesh>
      {/* Tier 2 */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.48, 0.85, 7]} />
        <meshStandardMaterial color={color} roughness={0.78} flatShading />
      </mesh>
      {/* Tier 3 */}
      <mesh position={[0, 1.98, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.32, 0.65, 7]} />
        <meshStandardMaterial color={color} roughness={0.75} flatShading />
      </mesh>
    </group>
  );
};

export const RoundTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position, scale = 1, color = '#558b2f' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.9, 6]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} flatShading />
      </mesh>
      {/* Main Canopy */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshStandardMaterial color={color} roughness={0.75} flatShading />
      </mesh>
      <mesh position={[0.35, 1.05, 0.25]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.46, 1]} />
        <meshStandardMaterial color="#689f38" roughness={0.75} flatShading />
      </mesh>
      <mesh position={[-0.35, 1.1, -0.2]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color="#7cb342" roughness={0.75} flatShading />
      </mesh>
    </group>
  );
};

export const BlossomTree: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.15, 0.9, 6]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial color="#f9a8d4" roughness={0.65} flatShading />
      </mesh>
      <mesh position={[0.36, 1.05, 0.2]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.44, 1]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.65} flatShading />
      </mesh>
      <mesh position={[-0.32, 1.08, -0.22]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial color="#f472b6" roughness={0.65} flatShading />
      </mesh>
    </group>
  );
};

export const MiniFloatingRock: React.FC<{
  position: [number, number, number];
  scale?: number;
  speed?: number;
  hasTree?: boolean;
}> = ({ position, scale = 1, speed = 1.2, hasTree = true }) => {
  return (
    <Float speed={speed} rotationIntensity={0.08} floatIntensity={0.85}>
      <group position={position} scale={scale}>
        <FloatingIslandBase radiusTop={1.25} radiusBottom={0.2} depth={1.55} segments={7} />
        {hasTree && <PineTree position={[0, 0.35, 0]} scale={0.75} />}
        {hasTree && <RoundTree position={[0.42, 0.35, 0.25]} scale={0.48} />}
      </group>
    </Float>
  );
};

export const CloudCluster: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
  opacity?: number;
  speed?: number;
}> = ({ position, scale = 1, color = '#ffffff', opacity = 0.92, speed = 0.5 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialX = position[0];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.x =
        initialX + Math.sin(clock.getElapsedTime() * 0.18 * speed + position[2]) * 1.4;
      groupRef.current.position.y =
        position[1] + Math.cos(clock.getElapsedTime() * 0.3 * speed + position[0]) * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.35, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.95} transparent opacity={opacity} />
      </mesh>
      <mesh position={[1.15, -0.15, 0.2]} castShadow>
        <sphereGeometry args={[1.0, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.95} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-1.15, -0.18, -0.1]} castShadow>
        <sphereGeometry args={[1.05, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.95} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.45, 0.45, -0.35]} castShadow>
        <sphereGeometry args={[0.95, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.95} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.5, 0.35, 0.35]} castShadow>
        <sphereGeometry args={[0.85, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.95} transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

export const RobotCompanion: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  withPad?: boolean;
  isFlying?: boolean;
  onClick?: () => void;
}> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  withPad = false,
  isFlying = false,
  onClick,
}) => {
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2.8) * 0.08 + (isFlying ? 0.25 : 0);
      bodyRef.current.rotation.z = Math.sin(t * 1.6) * 0.03;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 0.25 + Math.sin(t * 3.5) * 0.22;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -0.2 + Math.cos(t * 2.5) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} onClick={onClick}>
      {/* Optional Glowing Tech Pad */}
      {withPad && (
        <group position={[0, 0.04, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[0.92, 1.02, 0.08, 24]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.02, 24]} />
            <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.65} />
          </mesh>
          <mesh position={[0, 0.055, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.02, 24]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      )}

      <group ref={bodyRef} position={[0, 0.12, 0]}>
        {/* Legs */}
        <mesh position={[-0.16, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.34, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        <mesh position={[0.16, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.34, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Feet */}
        <RoundedBox args={[0.18, 0.1, 0.26]} radius={0.04} position={[-0.16, 0.05, 0.03]} castShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.1, 0.26]} radius={0.04} position={[0.16, 0.05, 0.03]} castShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </RoundedBox>

        {/* Torso */}
        <RoundedBox args={[0.56, 0.52, 0.4]} radius={0.1} position={[0, 0.58, 0]} castShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.25} />
        </RoundedBox>
        {/* Blue Chest Plate */}
        <RoundedBox args={[0.42, 0.28, 0.05]} radius={0.04} position={[0, 0.58, 0.19]} castShadow>
          <meshStandardMaterial color="#2563eb" roughness={0.35} />
        </RoundedBox>
        {/* Glowing Core Strip */}
        <mesh position={[0, 0.58, 0.22]}>
          <boxGeometry args={[0.24, 0.08, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>

        {/* Backpack */}
        <RoundedBox args={[0.38, 0.38, 0.18]} radius={0.06} position={[0, 0.58, -0.24]} castShadow>
          <meshStandardMaterial color="#94a3b8" metalness={0.4} roughness={0.4} />
        </RoundedBox>

        {/* Arms */}
        <mesh ref={leftArmRef} position={[-0.36, 0.56, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.26, 8, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.36, 0.6, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.26, 8, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>

        {/* Head (Large Cute Rounded Box like Reference Video) */}
        <RoundedBox args={[0.78, 0.54, 0.52]} radius={0.14} position={[0, 1.15, 0]} castShadow>
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </RoundedBox>

        {/* Face Visor Screen */}
        <RoundedBox args={[0.62, 0.34, 0.05]} radius={0.08} position={[0, 1.15, 0.25]}>
          <meshStandardMaterial color="#0f172a" roughness={0.15} />
        </RoundedBox>

        {/* Glowing Eyes */}
        <mesh position={[-0.15, 1.16, 0.28]}>
          <sphereGeometry args={[0.068, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0.15, 1.16, 0.28]}>
          <sphereGeometry args={[0.068, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
        </mesh>

        {/* Ear Caps */}
        <mesh position={[-0.41, 1.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.06, 16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0.41, 1.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.06, 16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 0.22, 8]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, 1.63, 0]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
};

export const AnimatedWaterfall: React.FC<{
  position: [number, number, number];
  height?: number;
  width?: number;
  hasTopPond?: boolean;
}> = ({ position, height = 5.2, width = 1.35, hasTopPond = true }) => {
  const stripe1Ref = useRef<THREE.Mesh>(null);
  const stripe2Ref = useRef<THREE.Mesh>(null);
  const foamRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (stripe1Ref.current) {
      stripe1Ref.current.position.y = -((t * 2.2) % height);
    }
    if (stripe2Ref.current) {
      stripe2Ref.current.position.y = -(((t * 2.2) + height * 0.5) % height);
    }
    if (foamRingRef.current) {
      const s = 1 + Math.sin(t * 3.5) * 0.12;
      foamRingRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position}>
      {/* Top Circular Turquoise Pond */}
      {hasTopPond && (
        <group position={[0, 0.05, -0.55]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.35, 1.35, 0.12, 24]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.15} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <ringGeometry args={[1.25, 1.48, 24]} />
            <meshStandardMaterial color="#cbd5e1" side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Main Waterfall Column */}
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, height, 0.28]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#38bdf8"
          emissiveIntensity={0.22}
          transparent
          opacity={0.86}
          roughness={0.2}
        />
      </mesh>

      {/* Animated White Foam Streaks */}
      <mesh ref={stripe1Ref} position={[-width * 0.2, -1, 0.15]}>
        <boxGeometry args={[width * 0.22, height * 0.35, 0.04]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>
      <mesh ref={stripe2Ref} position={[width * 0.22, -2.5, 0.15]}>
        <boxGeometry args={[width * 0.22, height * 0.35, 0.04]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>

      {/* Splash Foam at Base */}
      <group position={[0, -height + 0.08, 0.1]}>
        <mesh ref={foamRingRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[width * 0.45, width * 1.05, 24]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.4, 0.15, 0.2]}>
          <sphereGeometry args={[0.25, 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.4, 0.18, 0.18]}>
          <sphereGeometry args={[0.28, 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.22, 0.25]}>
          <sphereGeometry args={[0.32, 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
};

export const FloatingSectionPill: React.FC<{
  position: [number, number, number];
  label: string;
  sublabel?: string;
  onClick?: () => void;
  variant?: 'dark' | 'wood' | 'accent';
  distanceFactor?: number;
}> = ({
  position,
  label,
  sublabel,
  onClick,
  variant = 'dark',
  distanceFactor = 18,
}) => {
  const bgClasses =
    variant === 'wood'
      ? 'bg-[#7c4dff]/0'
      : variant === 'accent'
      ? 'bg-teal-500/95 text-slate-950 border-teal-300/60'
      : 'bg-slate-900/90 text-white border-white/20 hover:bg-slate-800';

  return (
    <Html position={position} center distanceFactor={distanceFactor} zIndexRange={[20, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className={`group relative flex flex-col items-center px-3.5 py-1.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer select-none whitespace-nowrap ${bgClasses}`}
      >
        <span className="text-xs font-semibold tracking-wide">{label}</span>
        {sublabel && (
          <span className="text-[10px] opacity-80 font-normal">{sublabel}</span>
        )}
        {/* Little pointer triangle below pill like in reference video */}
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-slate-900/90 border-r border-b border-white/20" />
      </button>
    </Html>
  );
};
