import React from 'react';
import { Html, RoundedBox, Float } from '@react-three/drei';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
} from './IslandPrimitives';
import { type ExperienceItem } from '../../data/portfolioData';

interface ExperienceIslandProps {
  activeStop: number;
  experiences: ExperienceItem[];
  selectedExpId: string;
  onSelectExp: (id: string) => void;
  onOpenEditor: () => void;
}

export const ExperienceIsland: React.FC<ExperienceIslandProps> = ({
  activeStop,
  experiences,
  selectedExpId,
  onSelectExp,
  onOpenEditor,
}) => {
  const isVisible = activeStop === 5;

  const nodePositions: Array<[number, number, number]> = [
    [-3.1, 0.75, 2.1],
    [-1.1, 0.95, 1.4],
    [1.2, 1.15, 1.4],
    [3.1, 1.35, 2.1],
  ];

  return (
    <group position={[-48, 0, -50]}>
      <FloatingIslandBase
        radiusTop={6.2}
        radiusBottom={1.5}
        depth={4.2}
        grassColor="#7cb342"
        rockColor="#7c6248"
        segments={12}
      />

      {/* ============================================================
          1. MINIATURE MODERN TECH OFFICE CAMPUS (Center-Back)
      ============================================================ */}
      <group position={[0, 0.4, -1.1]}>
        {/* Main Glass Office Headquarters */}
        <RoundedBox args={[3.8, 2.3, 1.8]} radius={0.08} position={[0, 1.15, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </RoundedBox>
        {/* Glowing Blue Glass Curtain Wall */}
        <mesh position={[0, 1.18, 0.91]}>
          <planeGeometry args={[3.35, 1.75]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.38} roughness={0.15} />
        </mesh>
        {/* Office Penthouse Level */}
        <RoundedBox args={[2.4, 0.85, 1.35]} radius={0.06} position={[0, 2.7, -0.1]} castShadow>
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 2.7, 0.59]}>
          <planeGeometry args={[1.95, 0.5]} />
          <meshStandardMaterial color="#0f172a" emissive="#2dd4bf" emissiveIntensity={0.45} />
        </mesh>

        {/* Left Innovation Wing */}
        <RoundedBox args={[1.7, 1.45, 1.5]} radius={0.06} position={[-2.5, 0.72, 0.35]} castShadow>
          <meshStandardMaterial color="#e7e5e4" roughness={0.45} />
        </RoundedBox>
        {/* Right Learning & Research Wing */}
        <RoundedBox args={[1.7, 1.45, 1.5]} radius={0.06} position={[2.5, 0.72, 0.35]} castShadow>
          <meshStandardMaterial color="#e7e5e4" roughness={0.45} />
        </RoundedBox>
      </group>

      {/* ============================================================
          2. INTEGRATED 3D VISUAL TIMELINE PATH & MILESTONE NODES
      ============================================================ */}
      {/* Glowing Stepping Path Connecting Timeline Nodes */}
      <mesh position={[0, 0.44, 1.75]} receiveShadow>
        <boxGeometry args={[6.8, 0.08, 0.55]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {experiences.slice(0, 4).map((exp, idx) => {
        const pos = nodePositions[idx] || [0, 1, 2];
        const isSelected = selectedExpId === exp.id;
        return (
          <Float key={exp.id} speed={1.5} rotationIntensity={0.04} floatIntensity={0.18}>
            <group
              position={pos}
              onClick={(e) => {
                e.stopPropagation();
                onSelectExp(exp.id);
              }}
            >
              {/* Pedestal Pillar */}
              <mesh position={[0, -0.35, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.28, 0.7, 16]} />
                <meshStandardMaterial color={isSelected ? '#2dd4bf' : '#94a3b8'} />
              </mesh>
              {/* Glowing Milestone Beacon */}
              <mesh position={[0, 0.15, 0]}>
                <octahedronGeometry args={[0.32, 0]} />
                <meshStandardMaterial
                  color={isSelected ? '#2dd4bf' : '#38bdf8'}
                  emissive={isSelected ? '#2dd4bf' : '#0284c7'}
                  emissiveIntensity={isSelected ? 1.5 : 0.7}
                />
              </mesh>

              {isVisible && (
                <Html position={[0, 0.95, 0]} center distanceFactor={11} zIndexRange={[15, 0]}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExp(exp.id);
                    }}
                    className={`w-40 px-2.5 py-2 rounded-xl border text-left transition-all cursor-pointer select-none shadow-lg ${
                      isSelected
                        ? 'bg-slate-900/95 border-teal-400 scale-105'
                        : 'bg-slate-950/85 border-white/15 hover:border-sky-400/50'
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-teal-300">
                      0{idx + 1} · {exp.category}
                    </div>
                    <div className="text-[11px] font-bold text-white truncate mt-0.5">
                      {exp.title}
                    </div>
                    <div className="text-[9px] text-slate-300 truncate">{exp.period}</div>
                  </button>
                </Html>
              )}
            </group>
          </Float>
        );
      })}

      {/* Wooden Signboard with Quick Edit Trigger */}
      {isVisible && (
        <Html position={[0, 3.6, -1.1]} center distanceFactor={12} zIndexRange={[15, 0]}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditor();
            }}
            className="px-3.5 py-1.5 rounded-full bg-amber-400/95 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg border border-amber-200 transition cursor-pointer whitespace-nowrap"
          >
            ✎ Customize Experience Timeline
          </button>
        </Html>
      )}

      <PineTree position={[-4.4, 0.4, -1.6]} scale={1.15} />
      <RoundTree position={[-4.2, 0.4, 0.4]} scale={0.95} />
      <PineTree position={[4.4, 0.4, -1.6]} scale={1.15} />
      <RoundTree position={[4.2, 0.4, 0.4]} scale={0.95} />
    </group>
  );
};
