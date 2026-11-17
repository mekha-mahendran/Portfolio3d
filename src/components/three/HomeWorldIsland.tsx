import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
  RobotCompanion,
  AnimatedWaterfall,
  FloatingSectionPill,
} from './IslandPrimitives';

interface HomeWorldIslandProps {
  onNavigate: (stopIndex: number) => void;
  activeStop: number;
}

export const HomeWorldIsland: React.FC<HomeWorldIslandProps> = ({
  onNavigate,
  activeStop,
}) => {
  const boatRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (boatRef.current) {
      boatRef.current.position.y = -3.95 + Math.sin(t * 2.1) * 0.12;
      boatRef.current.rotation.z = Math.sin(t * 1.5) * 0.06;
      boatRef.current.rotation.x = Math.cos(t * 1.8) * 0.04;
    }
    if (beamRef.current) {
      beamRef.current.rotation.y = t * 0.85;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================
          1. MAIN CENTRAL FLOATING ISLAND
      ============================================================ */}
      <FloatingIslandBase
        position={[0, 0, 0]}
        radiusTop={7.4}
        radiusBottom={2.2}
        depth={4.8}
        grassColor="#7cb342"
        rockColor="#7c6248"
        segments={12}
      />

      {/* Stone Pathways across the Main Island */}
      <mesh position={[-1.4, 0.41, 1.2]} rotation={[0, 0.45, 0]} receiveShadow>
        <boxGeometry args={[3.4, 0.04, 0.75]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>
      <mesh position={[1.2, 0.41, -0.3]} rotation={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.04, 0.75]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>

      {/* ============================================================
          2. LOW-POLY SNOW-CAPPED MOUNTAIN (Back of Main Island)
      ============================================================ */}
      <group
        position={[-0.4, 0.4, -3.1]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(5);
        }}
      >
        {/* Main Mountain Peak */}
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
          <coneGeometry args={[3.4, 5.6, 7]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.85} flatShading />
        </mesh>
        {/* Snow Cap */}
        <mesh position={[0, 4.55, 0]} castShadow>
          <coneGeometry args={[1.35, 2.15, 7]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} flatShading />
        </mesh>
        {/* Left Secondary Peak */}
        <mesh position={[-2.1, 1.9, 0.6]} castShadow receiveShadow>
          <coneGeometry args={[2.1, 3.8, 6]} />
          <meshStandardMaterial color="#64748b" roughness={0.88} flatShading />
        </mesh>
        <mesh position={[-2.1, 3.15, 0.6]} castShadow>
          <coneGeometry args={[0.82, 1.3, 6]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.65} flatShading />
        </mesh>
        {/* Right Secondary Peak */}
        <mesh position={[2.0, 2.1, 0.4]} castShadow receiveShadow>
          <coneGeometry args={[2.2, 4.2, 6]} />
          <meshStandardMaterial color="#78716c" roughness={0.88} flatShading />
        </mesh>
        <mesh position={[2.0, 3.5, 0.4]} castShadow>
          <coneGeometry args={[0.85, 1.4, 6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.65} flatShading />
        </mesh>

        <FloatingSectionPill
          position={[0, 6.2, 0]}
          label="Experience"
          onClick={() => onNavigate(5)}
        />
      </group>

      {/* ============================================================
          3. ORIGIN / ABOUT CABIN HOUSE (Left side of Main Island)
      ============================================================ */}
      <group
        position={[-3.7, 0.4, 0.7]}
        rotation={[0, 0.35, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(2);
        }}
      >
        {/* Wooden Cabin Base */}
        <RoundedBox args={[2.5, 1.5, 2.1]} radius={0.05} position={[0, 0.75, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#b47b48" roughness={0.75} />
        </RoundedBox>
        {/* Pitched Roof */}
        <mesh position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[2.15, 1.25, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.7} flatShading />
        </mesh>
        {/* Solar Panel on Roof */}
        <mesh position={[0.45, 1.92, 0.55]} rotation={[0.52, 0, 0]}>
          <boxGeometry args={[0.95, 0.05, 0.65]} />
          <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Warm Glowing Window */}
        <mesh position={[0, 0.78, 1.06]}>
          <boxGeometry args={[0.9, 0.62, 0.04]} />
          <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.75} />
        </mesh>

        <FloatingSectionPill
          position={[0, 3.1, 0]}
          label="Origin · About"
          onClick={() => onNavigate(2)}
        />
      </group>

      {/* ============================================================
          4. CREATIVE LAB / MODERN WORKSPACE HOUSE (Center of Main Island)
      ============================================================ */}
      <group
        position={[0.4, 0.4, 1.1]}
        rotation={[0, -0.18, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(3);
        }}
      >
        {/* First Floor Modern Volume */}
        <RoundedBox args={[2.8, 1.25, 2.2]} radius={0.06} position={[0, 0.62, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.35} />
        </RoundedBox>
        {/* Warm Wood Accent Cladding */}
        <mesh position={[-0.6, 0.62, 1.11]}>
          <boxGeometry args={[1.2, 1.0, 0.04]} />
          <meshStandardMaterial color="#c2844f" roughness={0.65} />
        </mesh>
        {/* Glass Sliding Doors */}
        <mesh position={[0.55, 0.58, 1.11]}>
          <boxGeometry args={[1.1, 0.92, 0.04]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.3} roughness={0.15} />
        </mesh>
        {/* Second Floor Cantilever Box */}
        <RoundedBox args={[2.5, 1.15, 1.95]} radius={0.06} position={[0.1, 1.8, -0.1]} castShadow receiveShadow>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </RoundedBox>
        {/* Upper Glass Panorama Window */}
        <mesh position={[0.1, 1.82, 0.89]}>
          <boxGeometry args={[1.85, 0.72, 0.04]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.35} />
        </mesh>
        {/* Roof Overhang Slab */}
        <RoundedBox args={[2.85, 0.16, 2.25]} radius={0.04} position={[0.1, 2.42, -0.1]} castShadow>
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </RoundedBox>

        <FloatingSectionPill
          position={[0, 3.35, 0]}
          label="Creative Lab · Skills"
          onClick={() => onNavigate(3)}
        />
      </group>

      {/* ============================================================
          5. WATERFALL & TURQUOISE POND (Front Center Edge)
      ============================================================ */}
      <AnimatedWaterfall position={[-0.6, 0.38, 6.65]} height={4.6} width={1.45} hasTopPond />

      {/* ============================================================
          6. SAILBOAT IN THE WATER ("Experiments / Services")
      ============================================================ */}
      <group
        ref={boatRef}
        position={[-4.2, -3.95, 7.6]}
        rotation={[0, 0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(6);
        }}
      >
        {/* Wooden Hull */}
        <mesh castShadow>
          <cylinderGeometry args={[0.68, 0.42, 0.45, 8]} />
          <meshStandardMaterial color="#b45309" roughness={0.75} flatShading />
        </mesh>
        {/* Mast */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 1.9, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* White Sail */}
        <mesh position={[0, 1.1, 0.15]} rotation={[0, 0.2, 0]} castShadow>
          <coneGeometry args={[0.75, 1.55, 3]} />
          <meshStandardMaterial color="#fffbeb" roughness={0.5} />
        </mesh>

        <FloatingSectionPill
          position={[0, 2.55, 0]}
          label="Services"
          onClick={() => onNavigate(6)}
        />
      </group>

      {/* ============================================================
          7. PROJECTS SUB-ISLAND (Right Side)
      ============================================================ */}
      <group
        position={[7.6, 0.3, 1.1]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(4);
        }}
      >
        <FloatingIslandBase
          radiusTop={3.2}
          radiusBottom={0.85}
          depth={3.2}
          grassColor="#7cb342"
          rockColor="#7c6248"
          segments={9}
        />
        {/* Modern Projects Villa */}
        <group position={[0, 0.4, 0]} rotation={[0, -0.35, 0]}>
          <RoundedBox args={[2.5, 1.2, 2.0]} radius={0.05} position={[0, 0.6, 0]} castShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.35} />
          </RoundedBox>
          <RoundedBox args={[2.2, 1.05, 1.8]} radius={0.05} position={[0, 1.7, -0.1]} castShadow>
            <meshStandardMaterial color="#d97706" roughness={0.6} />
          </RoundedBox>
          {/* Slanted Roof with Solar Panels */}
          <mesh position={[0, 2.38, -0.1]} rotation={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[2.5, 0.16, 2.1]} />
            <meshStandardMaterial color="#f1f5f9" />
          </mesh>
          <mesh position={[-0.5, 2.48, -0.05]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[0.85, 0.05, 1.1]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.5, 2.48, -0.05]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[0.85, 0.05, 1.1]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Glowing Window */}
          <mesh position={[0, 0.65, 1.02]}>
            <boxGeometry args={[1.6, 0.72, 0.04]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
          </mesh>
        </group>
        <PineTree position={[-1.9, 0.4, -0.9]} scale={0.85} />
        <RoundTree position={[1.8, 0.4, -0.8]} scale={0.8} />

        <FloatingSectionPill
          position={[0, 3.9, 0]}
          label="Projects"
          onClick={() => onNavigate(4)}
        />
      </group>

      {/* ============================================================
          8. VIADUCT BRIDGE + CONTACT LIGHTHOUSE SUB-ISLAND (Front Right)
      ============================================================ */}
      {/* Curved Bridge Deck + Tall Pillars */}
      <group position={[4.2, 0.25, 4.9]} rotation={[0, -0.58, 0]}>
        <RoundedBox args={[1.1, 0.18, 5.4]} radius={0.04} position={[0, 0.15, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </RoundedBox>
        {/* Bridge Railings */}
        <mesh position={[-0.48, 0.35, 0]}>
          <boxGeometry args={[0.06, 0.25, 5.3]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0.48, 0.35, 0]}>
          <boxGeometry args={[0.06, 0.25, 5.3]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        {/* Tall Viaduct Pillars into the Water */}
        {[-1.5, 0, 1.5].map((zOff, i) => (
          <group key={i} position={[0, -2.1, zOff]}>
            <mesh position={[-0.36, 0, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.12, 4.4, 8]} />
              <meshStandardMaterial color="#d6d3d1" />
            </mesh>
            <mesh position={[0.36, 0, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.12, 4.4, 8]} />
              <meshStandardMaterial color="#d6d3d1" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Contact Lighthouse Sub-Island */}
      <group
        position={[6.9, -0.25, 7.2]}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(7);
        }}
      >
        <FloatingIslandBase
          radiusTop={2.2}
          radiusBottom={0.55}
          depth={2.8}
          grassColor="#7cb342"
          rockColor="#7c6248"
          segments={8}
        />
        {/* Red & White Striped Lighthouse */}
        <group position={[0.2, 0.4, 0]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.48, 0.56, 0.9, 14]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.41, 0.48, 0.65, 14]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.41, 0.6, 14]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, 2.3, 0]} castShadow>
            <cylinderGeometry args={[0.31, 0.35, 0.45, 14]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          {/* Lantern Glass Room */}
          <mesh position={[0, 2.72, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.42, 14]} />
            <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={1.5} />
          </mesh>
          {/* Dome Roof */}
          <mesh position={[0, 3.08, 0]}>
            <coneGeometry args={[0.36, 0.38, 14]} />
            <meshStandardMaterial color="#991b1b" />
          </mesh>
          {/* Rotating Light Beam */}
          <group ref={beamRef} position={[0, 2.72, 0]}>
            <mesh position={[1.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.75, 3.8, 16, 1, true]} />
              <meshBasicMaterial
                color="#fef08a"
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          </group>
        </group>
        <PineTree position={[-0.95, 0.4, -0.45]} scale={0.75} />

        <FloatingSectionPill
          position={[0.2, 4.2, 0]}
          label="Contact"
          onClick={() => onNavigate(7)}
        />
      </group>

      {/* ============================================================
          9. HERO FOREGROUND ROBOT PLATFORM & ROPE BRIDGE (00:14 in Video)
      ============================================================ */}
      <group position={[-6.8, -1.2, 8.8]}>
        <FloatingIslandBase
          radiusTop={2.85}
          radiusBottom={0.65}
          depth={2.7}
          grassColor="#7cb342"
          rockColor="#7c6248"
          segments={9}
        />

        {/* Cute Robot Companion on Tech Pad */}
        <RobotCompanion
          position={[-0.2, 0.4, 0.35]}
          rotation={[0, 0.35, 0]}
          scale={1.08}
          withPad
          onClick={() => onNavigate(2)}
        />

        {/* Yellow/Amber Signboard ("EXPLORE MY WORLD / INTELLIGENT WEB AHEAD") */}
        <group
          position={[-1.55, 0.4, -0.35]}
          rotation={[0, 0.48, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(2);
          }}
        >
          {/* Wooden Post */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.08, 1.4, 8]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Signboard Frame */}
          <RoundedBox args={[1.7, 0.9, 0.14]} radius={0.04} position={[0, 1.45, 0]} castShadow>
            <meshStandardMaterial color="#f59e0b" roughness={0.45} />
          </RoundedBox>
          {activeStop <= 1 && (
            <Html position={[0, 1.45, 0.09]} transform distanceFactor={8} zIndexRange={[10, 0]}>
              <button
                onClick={() => onNavigate(2)}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-[11px] leading-tight tracking-wider uppercase shadow-inner border-2 border-amber-700/40 cursor-pointer hover:bg-amber-300 transition"
              >
                EXPLORE MY
                <br />
                WORLD →
              </button>
            </Html>
          )}
        </group>

        <RoundTree position={[1.4, 0.38, -0.8]} scale={0.65} />
        <PineTree position={[-1.4, 0.38, -1.2]} scale={0.72} />
      </group>

      {/* Rope & Plank Bridge connecting Hero Platform to Main Island */}
      <group position={[-4.5, -0.35, 6.2]} rotation={[0.18, -0.58, -0.1]}>
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((zPos, idx) => (
          <RoundedBox
            key={idx}
            args={[1.15, 0.08, 0.38]}
            radius={0.02}
            position={[0, Math.sin((idx / 6) * Math.PI) * -0.18, zPos]}
            castShadow
          >
            <meshStandardMaterial color="#b47b48" roughness={0.8} />
          </RoundedBox>
        ))}
        {/* Rope Handrails */}
        <mesh position={[-0.55, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.04, 4.2]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        <mesh position={[0.55, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.04, 4.2]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      </group>

      {/* ============================================================
          10. TREES & GREENERY ON MAIN ISLAND
      ============================================================ */}
      <PineTree position={[-5.4, 0.4, -1.2]} scale={1.15} />
      <PineTree position={[-4.6, 0.4, -2.5]} scale={0.95} />
      <RoundTree position={[-2.1, 0.4, 2.2]} scale={0.9} />
      <PineTree position={[-1.5, 0.4, -0.4]} scale={0.85} />
      <RoundTree position={[2.8, 0.4, 1.9]} scale={0.95} />
      <PineTree position={[3.2, 0.4, -1.6]} scale={1.1} />
      <PineTree position={[4.1, 0.4, -0.4]} scale={0.85} />

      {/* Turquoise Water Surface Pool around the Home Island */}
      <Float speed={0.8} rotationIntensity={0.01} floatIntensity={0.08}>
        <mesh position={[0.5, -4.15, 3.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[14.5, 48]} />
          <meshStandardMaterial
            color="#2dd4bf"
            roughness={0.18}
            metalness={0.12}
            transparent
            opacity={0.88}
          />
        </mesh>
      </Float>
    </group>
  );
};
