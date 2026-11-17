import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
} from './IslandPrimitives';
import { SKILL_GROUPS } from '../../data/portfolioData';

interface SkillsIslandProps {
  activeStop: number;
  selectedSkillGroup: string;
  onSelectSkillGroup: (id: string) => void;
}

export const SkillsIsland: React.FC<SkillsIslandProps> = ({
  activeStop,
  selectedSkillGroup,
  onSelectSkillGroup,
}) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const bulbRef = useRef<THREE.Group>(null);
  const isVisible = activeStop === 3;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.5;
    }
    if (bulbRef.current) {
      bulbRef.current.position.y = 4.35 + Math.sin(t * 2.2) * 0.1;
      bulbRef.current.rotation.y = t * 0.6;
    }
  });

  const monitorPositions: Array<{
    pos: [number, number, number];
    rot: [number, number, number];
    codeIcon: string;
  }> = [
    { pos: [-2.85, 1.55, 0.75], rot: [0, 0.32, 0], codeIcon: 'UI / UX · NEXT' },
    { pos: [2.85, 1.55, 0.75], rot: [0, -0.32, 0], codeIcon: '< / > API · JAVA' },
    { pos: [-2.45, 2.85, -1.1], rot: [0, 0.25, 0], codeIcon: 'SQL · DATA' },
    { pos: [2.45, 2.85, -1.1], rot: [0, -0.25, 0], codeIcon: 'AI · PROMPT' },
  ];

  return (
    <group position={[0, 0, -52]}>
      <FloatingIslandBase
        radiusTop={6.4}
        radiusBottom={1.6}
        depth={4.3}
        grassColor="#7cb342"
        rockColor="#7c6248"
        segments={12}
      />

      {/* Circular Tech Plaza Platform */}
      <mesh position={[0, 0.45, -0.2]} receiveShadow>
        <cylinderGeometry args={[4.4, 4.7, 0.24, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.58, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.6, 3.85, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* ============================================================
          1. CENTRAL GLASS CYLINDER CORE & GLOWING LIGHTBULB (00:26 in Video)
      ============================================================ */}
      <group position={[0, 0.6, -0.2]}>
        {/* Inner Dark Core Column */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <cylinderGeometry args={[0.92, 0.92, 3.1, 24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.6} />
        </mesh>

        {/* Outer Translucent Glass Cylinder */}
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[1.28, 1.28, 3.25, 28, 1, true]} />
          <meshStandardMaterial
            color="#bae6fd"
            transparent
            opacity={0.32}
            roughness={0.1}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top & Bottom Metallic Caps of Cylinder */}
        <mesh position={[0, 3.28, 0]}>
          <cylinderGeometry args={[1.38, 1.38, 0.16, 28]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.5} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[1.45, 1.55, 0.18, 28]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Glowing Orbiting Tech Rings */}
        <mesh ref={ring1Ref} position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.34, 0.035, 12, 36]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.4} />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 2.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.34, 0.035, 12, 36]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.4} />
        </mesh>

        {/* Floating "IDEA -> DESIGN -> CODE -> EXPERIENCE" Stack Inside Cylinder */}
        {isVisible && (
          <Html position={[0, 1.68, 0.98]} transform distanceFactor={8.5} zIndexRange={[10, 0]}>
            <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-slate-950/90 border border-sky-400/40 text-white text-[10px] font-bold tracking-widest uppercase select-none pointer-events-none shadow-lg">
              <span className="text-amber-300">IDEA</span>
              <span className="text-sky-400 text-[8px] my-0.5">↓</span>
              <span className="text-teal-300">DESIGN</span>
              <span className="text-sky-400 text-[8px] my-0.5">↓</span>
              <span className="text-sky-300">CODE</span>
              <span className="text-sky-400 text-[8px] my-0.5">↓</span>
              <span className="text-pink-300">INTELLIGENCE</span>
            </div>
          </Html>
        )}

        {/* Giant Glowing Lightbulb on Top of Cylinder */}
        <group ref={bulbRef} position={[0, 4.35, 0]}>
          {/* Screw Base */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.32, 0.26, 0.36, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Glowing Glass Bulb */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.62, 24, 24]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#facc15"
              emissiveIntensity={1.6}
              transparent
              opacity={0.92}
            />
          </mesh>
          <pointLight position={[0, 0.1, 0]} intensity={2.2} distance={8} color="#fde047" />
        </group>

        {/* "BUILD · ANIMATE · CREATE" Blocks at Front Base (Like 00:26) */}
        {['BUILD', 'INTELLIGENT', 'CREATE'].map((word, idx) => (
          <RoundedBox
            key={word}
            args={[1.05, 0.38, 0.35]}
            radius={0.04}
            position={[(idx - 1) * 1.15, 0.22, 1.55]}
            castShadow
          >
            <meshStandardMaterial color="#e7e5e4" roughness={0.6} />
          </RoundedBox>
        ))}
      </group>

      {/* ============================================================
          2. FUTURISTIC SKYSCRAPER TOWERS BEHIND THE CORE
      ============================================================ */}
      {[
        { pos: [-1.85, 2.2, -1.65] as [number, number, number], h: 3.4 },
        { pos: [1.85, 2.2, -1.65] as [number, number, number], h: 3.4 },
        { pos: [-3.1, 1.8, -0.6] as [number, number, number], h: 2.5 },
        { pos: [3.1, 1.8, -0.6] as [number, number, number], h: 2.5 },
      ].map((t, i) => (
        <group key={i} position={t.pos}>
          <RoundedBox args={[0.95, t.h, 0.95]} radius={0.05} castShadow receiveShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </RoundedBox>
          {/* Dark Vertical Window Stripes */}
          <mesh position={[0, 0, 0.48]}>
            <boxGeometry args={[0.62, t.h * 0.82, 0.02]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ============================================================
          3. 4 INTERACTIVE 3D SKILL MONITORS & FLOATING LABELS
      ============================================================ */}
      {SKILL_GROUPS.map((group, idx) => {
        const cfg = monitorPositions[idx];
        const isSelected = selectedSkillGroup === group.id;
        return (
          <Float key={group.id} speed={1.4} rotationIntensity={0.04} floatIntensity={0.2}>
            <group
              position={cfg.pos}
              rotation={cfg.rot}
              onClick={(e) => {
                e.stopPropagation();
                onSelectSkillGroup(group.id);
              }}
            >
              {/* Monitor Stand */}
              <mesh position={[0, -0.68, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.14, 0.45, 12]} />
                <meshStandardMaterial color="#cbd5e1" />
              </mesh>
              {/* Monitor Bezel */}
              <RoundedBox
                args={[1.75, 1.1, 0.14]}
                radius={0.06}
                castShadow
              >
                <meshStandardMaterial
                  color={isSelected ? '#38bdf8' : '#f8fafc'}
                  roughness={0.25}
                />
              </RoundedBox>
              {/* Dark Screen Surface */}
              <mesh position={[0, 0, 0.08]}>
                <planeGeometry args={[1.55, 0.9]} />
                <meshStandardMaterial
                  color="#0f172a"
                  emissive={group.color}
                  emissiveIntensity={isSelected ? 0.35 : 0.12}
                />
              </mesh>

              {isVisible && (
                <Html position={[0, 0, 0.11]} transform distanceFactor={8.2} zIndexRange={[15, 0]}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSkillGroup(group.id);
                    }}
                    className={`w-44 p-2 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-slate-900/95 border-teal-400 shadow-lg shadow-teal-500/20 scale-105'
                        : 'bg-slate-950/90 border-white/15 hover:border-sky-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${group.color}25`, color: group.color }}
                      >
                        {cfg.codeIcon}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {group.skills.length} skills
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1 truncate">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {group.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-slate-200 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                      {group.skills.length > 4 && (
                        <span className="text-[8px] px-1 py-0.5 text-teal-300 font-semibold">
                          +{group.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </button>
                </Html>
              )}
            </group>
          </Float>
        );
      })}

      {/* ============================================================
          4. WOODEN SIGNBOARD & ENTRANCE STAIRS (Front Left like 00:25)
      ============================================================ */}
      <group position={[-3.3, 0.4, 2.7]} rotation={[0, 0.4, 0]}>
        <RoundedBox args={[2.1, 0.95, 0.16]} radius={0.04} position={[0, 0.95, 0]} castShadow>
          <meshStandardMaterial color="#6d4c3d" roughness={0.8} />
        </RoundedBox>
        <mesh position={[-0.65, 0.45, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.9, 8]} />
          <meshStandardMaterial color="#4e342e" />
        </mesh>
        <mesh position={[0.65, 0.45, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.9, 8]} />
          <meshStandardMaterial color="#4e342e" />
        </mesh>
      </group>

      {/* Trees framing the Skills Lab */}
      <RoundTree position={[-4.5, 0.4, -0.5]} scale={1.15} />
      <PineTree position={[-3.9, 0.4, -2.2]} scale={1.1} />
      <RoundTree position={[4.5, 0.4, -0.4]} scale={1.15} />
      <PineTree position={[3.9, 0.4, -2.2]} scale={1.1} />
    </group>
  );
};
