import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  RoundTree,
  RobotCompanion,
} from './IslandPrimitives';

interface ContactIslandProps {
  activeStop: number;
  onOpenEnquiry: () => void;
}

export const ContactIsland: React.FC<ContactIslandProps> = ({
  activeStop,
  onOpenEnquiry,
}) => {
  const beamRef = useRef<THREE.Group>(null);
  const rowboatRef = useRef<THREE.Group>(null);
  const isVisible = activeStop === 7;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beamRef.current) {
      beamRef.current.rotation.y = Math.sin(t * 0.75) * 0.65 - 0.3;
    }
    if (rowboatRef.current) {
      rowboatRef.current.position.y = -0.35 + Math.sin(t * 2.0) * 0.08;
      rowboatRef.current.rotation.z = Math.sin(t * 1.4) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 50]}>
      {/* Rocky Sunset Island Base */}
      <FloatingIslandBase
        position={[-1.4, 0, 0]}
        radiusTop={4.4}
        radiusBottom={1.4}
        depth={3.4}
        grassColor="#558b2f"
        rockColor="#6d4c3d"
        segments={10}
      />

      {/* ============================================================
          1. GRAND SUNSET LIGHTHOUSE & ROTATING VOLUMETRIC BEAM (00:46 in Video)
      ============================================================ */}
      <group position={[-1.55, 0.4, -0.65]}>
        {/* Stone Base Ring */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.2, 0.5, 16]} />
          <meshStandardMaterial color="#a8a29e" roughness={0.85} />
        </mesh>
        {/* Main White Lighthouse Tower */}
        <mesh position={[0, 2.0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.72, 0.96, 3.1, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Warm Glowing Windows up the Tower */}
        <mesh position={[0, 2.55, 0.76]}>
          <boxGeometry args={[0.24, 0.34, 0.05]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, 1.45, 0.85]}>
          <boxGeometry args={[0.24, 0.34, 0.05]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.5} />
        </mesh>

        {/* Red Observation Balcony */}
        <mesh position={[0, 3.62, 0]} castShadow>
          <cylinderGeometry args={[0.92, 0.82, 0.22, 20]} />
          <meshStandardMaterial color="#991b1b" roughness={0.5} />
        </mesh>

        {/* Glowing Lantern Glass Room */}
        <mesh position={[0, 4.15, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.85, 20]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#facc15"
            emissiveIntensity={2.2}
          />
        </mesh>
        <pointLight position={[0, 4.2, 0.5]} intensity={3.2} distance={18} color="#fde047" />

        {/* Conical Red/Brown Roof Cap & Spire */}
        <mesh position={[0, 4.88, 0]} castShadow>
          <coneGeometry args={[0.82, 0.72, 20]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.5} />
        </mesh>
        <mesh position={[0, 5.4, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.45, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>

        {/* Sweeping Volumetric Lighthouse Beam (Exact Look from 00:48 in Video) */}
        <group ref={beamRef} position={[0, 4.15, 0]}>
          <mesh position={[4.5, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[1.45, 9.0, 24, 1, true]} />
            <meshBasicMaterial
              color="#fef9c3"
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      {/* ============================================================
          2. KEEPER'S COTTAGE BESIDE THE LIGHTHOUSE (Left Side)
      ============================================================ */}
      <group position={[-2.95, 0.4, 0.25]} rotation={[0, 0.18, 0]}>
        <RoundedBox args={[1.65, 1.35, 1.45]} radius={0.04} position={[0, 0.68, 0]} castShadow>
          <meshStandardMaterial color="#f5ebe0" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 1.72, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[1.45, 0.95, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.7} flatShading />
        </mesh>
        {/* Warm Sunset Glowing Windows */}
        <mesh position={[-0.32, 0.78, 0.74]}>
          <boxGeometry args={[0.3, 0.38, 0.04]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0.32, 0.78, 0.74]}>
          <boxGeometry args={[0.3, 0.38, 0.04]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.6} />
        </mesh>
      </group>

      {/* ============================================================
          3. ROBOT COMPANION & "HAVE AN IDEA? LET'S BUILD IT." SIGNBOARD
      ============================================================ */}
      <RobotCompanion
        position={[-1.05, 0.45, 1.7]}
        rotation={[0, 0.12, 0]}
        scale={0.98}
        onClick={onOpenEnquiry}
      />

      {/* Large Wooden Billboard behind Robot (Like 00:48 in Video) */}
      <group position={[0.35, 0.4, 0.75]} rotation={[0, -0.12, 0]}>
        <mesh position={[-1.1, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 2.2, 8]} />
          <meshStandardMaterial color="#4a2e19" />
        </mesh>
        <mesh position={[1.1, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 2.2, 8]} />
          <meshStandardMaterial color="#4a2e19" />
        </mesh>
        <RoundedBox args={[3.15, 1.55, 0.18]} radius={0.05} position={[0, 2.05, 0]} castShadow>
          <meshStandardMaterial color="#6d4c3d" roughness={0.75} />
        </RoundedBox>
        <RoundedBox args={[2.88, 1.28, 0.06]} radius={0.03} position={[0, 2.05, 0.08]}>
          <meshStandardMaterial color="#d4a373" roughness={0.65} />
        </RoundedBox>

        {isVisible && (
          <Html position={[0, 2.05, 0.14]} transform distanceFactor={8.8} zIndexRange={[15, 0]}>
            <div
              onClick={onOpenEnquiry}
              className="w-56 px-4 py-2.5 rounded-lg bg-[#d4a373] text-center cursor-pointer select-none shadow-inner border border-amber-900/30 hover:brightness-105 transition"
            >
              <div className="text-sm font-black text-slate-900 tracking-tight uppercase">
                HAVE AN IDEA?
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                Let&apos;s build it together.
              </div>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================
          4. WOODEN BRIDGE / DOCK & ROWBOAT ON SUNSET WATER (Right Side)
      ============================================================ */}
      <group position={[3.8, -0.05, 1.45]}>
        {/* Main Wooden Pier Deck */}
        <RoundedBox args={[4.8, 0.16, 1.35]} radius={0.03} position={[0, 0.25, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#7f5539" roughness={0.8} />
        </RoundedBox>
        {/* Dock Support Pilings & Rope Posts */}
        {[-1.8, -0.6, 0.6, 1.8].map((xOff, i) => (
          <group key={i} position={[xOff, 0, 0]}>
            <mesh position={[0, -0.35, -0.58]} castShadow>
              <cylinderGeometry args={[0.09, 0.09, 1.8, 8]} />
              <meshStandardMaterial color="#4a2e19" />
            </mesh>
            <mesh position={[0, -0.35, 0.58]} castShadow>
              <cylinderGeometry args={[0.09, 0.09, 1.8, 8]} />
              <meshStandardMaterial color="#4a2e19" />
            </mesh>
          </group>
        ))}
        {/* Rope Railings */}
        <mesh position={[0, 0.48, -0.58]}>
          <boxGeometry args={[4.4, 0.04, 0.04]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
        <mesh position={[0, 0.48, 0.58]}>
          <boxGeometry args={[4.4, 0.04, 0.04]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>

        {/* Wooden Rowboat with Glowing Lantern Moored to Dock (Like 00:49 in Video) */}
        <group ref={rowboatRef} position={[1.1, -0.35, 1.25]} rotation={[0, 0.08, 0]}>
          <RoundedBox args={[1.85, 0.38, 0.82]} radius={0.14} castShadow>
            <meshStandardMaterial color="#6d4c3d" roughness={0.8} />
          </RoundedBox>
          <RoundedBox args={[1.45, 0.12, 0.62]} radius={0.04} position={[0, 0.18, 0]}>
            <meshStandardMaterial color="#9c6644" />
          </RoundedBox>
          {/* Warm Glowing Boat Lantern */}
          <mesh position={[0.68, 0.35, 0]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={2.0} />
          </mesh>
          <pointLight position={[0.68, 0.45, 0]} intensity={1.2} distance={4} color="#fbbf24" />
        </group>
      </group>

      {/* Sunset Ocean Water Plane with Golden Reflection */}
      <Float speed={0.6} rotationIntensity={0.005} floatIntensity={0.04}>
        <mesh position={[2, -0.65, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[28, 48]} />
          <meshStandardMaterial
            color="#312e81"
            emissive="#d97706"
            emissiveIntensity={0.18}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>
      </Float>

      {/* Lush Trees on Left of Lighthouse */}
      <RoundTree position={[-4.2, 0.4, -0.6]} scale={1.25} color="#4d7c0f" />
      <RoundTree position={[-3.6, 0.4, -1.8]} scale={1.0} color="#3f6212" />
    </group>
  );
};
