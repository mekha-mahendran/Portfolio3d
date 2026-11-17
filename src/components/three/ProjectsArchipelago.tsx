import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
  BlossomTree,
  AnimatedWaterfall,
} from './IslandPrimitives';
import { PROJECTS_DATA, type ProjectItem } from '../../data/portfolioData';

interface ProjectsArchipelagoProps {
  activeStop: number;
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem) => void;
  focusedProjectIndex: number;
  onFocusProjectIndex: (index: number) => void;
}

export const ProjectsArchipelago: React.FC<ProjectsArchipelagoProps> = ({
  activeStop,
  onSelectProject,
  focusedProjectIndex,
  onFocusProjectIndex,
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const zenviaRingRef = useRef<THREE.Mesh>(null);
  const isVisible = activeStop === 4;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.65;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = 1.45 + Math.sin(t * 2.8) * 0.45;
    }
    if (zenviaRingRef.current) {
      zenviaRingRef.current.rotation.z = t * 0.8;
      zenviaRingRef.current.rotation.x = Math.sin(t * 0.7) * 0.35;
    }
  });

  // Arrange the 5 project islands in a gentle arc so all 5 are visible and can be browsed smoothly
  const islandOffsets: Array<[number, number, number]> = [
    [-11.2, 0.3, -1.6],
    [-5.6, 0.0, 0.2],
    [0, 0.2, 0.8],
    [5.6, 0.0, 0.2],
    [11.2, 0.3, -1.6],
  ];

  return (
    <group position={[56, 0, 0]}>
      {PROJECTS_DATA.map((project, idx) => {
        const offset = islandOffsets[idx];
        const isFocused = focusedProjectIndex === idx;

        return (
          <Float
            key={project.id}
            speed={1.1 + idx * 0.12}
            rotationIntensity={0.03}
            floatIntensity={0.28}
          >
            <group
              position={offset}
              scale={isFocused ? 1.06 : 0.96}
              onClick={(e) => {
                e.stopPropagation();
                onFocusProjectIndex(idx);
                onSelectProject(project);
              }}
            >
              {/* Individual Floating Island Base for each Project */}
              <FloatingIslandBase
                radiusTop={2.35}
                radiusBottom={0.35}
                depth={3.1}
                grassColor="#7cb342"
                rockColor="#6d543e"
                segments={9}
              />

              {/* Mini Waterfall pouring off the bottom-right of each island (like 00:33 in Video) */}
              <AnimatedWaterfall
                position={[0.75, -0.2, 1.4]}
                height={3.2}
                width={0.42}
                hasTopPond={false}
              />

              {/* ============================================================
                  BESPOKE 3D MINIATURE ARCHITECTURE PER PROJECT
              ============================================================ */}
              {project.architectureType === 'swifthr' && (
                <group position={[0, 0.4, 0]}>
                  {/* Tall Corporate Skyscraper */}
                  <RoundedBox args={[1.1, 2.8, 0.9]} radius={0.04} position={[-0.45, 1.4, -0.25]} castShadow>
                    <meshStandardMaterial color="#f8fafc" roughness={0.25} />
                  </RoundedBox>
                  {/* Secondary Glass Office Tower */}
                  <RoundedBox args={[0.95, 2.1, 0.85]} radius={0.04} position={[0.55, 1.05, -0.35]} castShadow>
                    <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
                  </RoundedBox>
                  {/* DarkHRMS Telemetry Billboard */}
                  <RoundedBox args={[1.25, 1.65, 0.12]} radius={0.04} position={[-0.2, 1.15, 0.45]} castShadow>
                    <meshStandardMaterial color="#0f172a" />
                  </RoundedBox>
                  {/* Glowing Wireframe Workforce Globe at Front Right (like NOVA in Video 00:33) */}
                  <mesh ref={globeRef} position={[0.68, 0.72, 0.75]}>
                    <sphereGeometry args={[0.52, 14, 14]} />
                    <meshStandardMaterial
                      color="#38bdf8"
                      emissive="#0284c7"
                      emissiveIntensity={0.85}
                      wireframe
                    />
                  </mesh>
                  <RoundTree position={[-1.45, 0, 0.4]} scale={0.75} />
                </group>
              )}

              {project.architectureType === 'manamaalai' && (
                <group position={[0, 0.4, 0]}>
                  {/* Warm Boutique Architectural Villa (like VERA in Video 00:33) */}
                  <RoundedBox args={[1.9, 1.45, 1.4]} radius={0.05} position={[0, 0.72, -0.1]} castShadow>
                    <meshStandardMaterial color="#f5ebe0" roughness={0.45} />
                  </RoundedBox>
                  <RoundedBox args={[1.5, 1.15, 1.1]} radius={0.05} position={[0, 1.9, -0.15]} castShadow>
                    <meshStandardMaterial color="#d5bdaf" roughness={0.5} />
                  </RoundedBox>
                  {/* Warm Terracotta Roof Trim */}
                  <RoundedBox args={[1.7, 0.22, 1.25]} radius={0.04} position={[0, 2.55, -0.15]} castShadow>
                    <meshStandardMaterial color="#9c6644" />
                  </RoundedBox>
                  {/* Glowing Golden Matchmaking Archway */}
                  <mesh position={[0, 0.68, 0.62]}>
                    <boxGeometry args={[0.95, 0.95, 0.05]} />
                    <meshStandardMaterial color="#fbcfe8" emissive="#ec4899" emissiveIntensity={0.45} />
                  </mesh>
                  {/* Pastel Pink Cherry Blossom Trees on Both Sides */}
                  <BlossomTree position={[-1.35, 0, 0.45]} scale={0.82} />
                  <BlossomTree position={[1.35, 0, 0.45]} scale={0.82} />
                </group>
              )}

              {project.architectureType === 'agency' && (
                <group position={[0, 0.4, 0]}>
                  {/* Tall Vertical Glass Workflow Screens (like AURA in Video 00:33) */}
                  <RoundedBox args={[1.15, 2.85, 0.14]} radius={0.06} position={[0.42, 1.5, -0.15]} castShadow>
                    <meshStandardMaterial color="#0f172a" />
                  </RoundedBox>
                  <mesh position={[0.42, 1.5, -0.07]}>
                    <planeGeometry args={[1.02, 2.65]} />
                    <meshStandardMaterial color="#0284c7" emissive="#2dd4bf" emissiveIntensity={0.45} />
                  </mesh>

                  {/* Secondary Frontend Portal Screen */}
                  <RoundedBox args={[0.92, 1.95, 0.12]} radius={0.06} position={[-0.62, 1.05, 0.15]} castShadow>
                    <meshStandardMaterial color="#f8fafc" />
                  </RoundedBox>
                  <mesh position={[-0.62, 1.05, 0.22]}>
                    <planeGeometry args={[0.78, 1.75]} />
                    <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={0.25} />
                  </mesh>

                  {/* Low-rise Agency Studio Building at Base */}
                  <RoundedBox args={[1.6, 0.62, 0.95]} radius={0.04} position={[0.1, 0.31, 0.55]} castShadow>
                    <meshStandardMaterial color="#e2e8f0" />
                  </RoundedBox>
                  <RoundTree position={[1.45, 0, 0.35]} scale={0.75} />
                </group>
              )}

              {project.architectureType === 'counterfeit' && (
                <group position={[0, 0.4, 0]}>
                  {/* Vision Lab Base Platform */}
                  <mesh position={[0, 0.2, 0]} castShadow>
                    <cylinderGeometry args={[1.35, 1.5, 0.4, 16]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
                  </mesh>
                  {/* 3D Inspected Product Cube in Center */}
                  <RoundedBox args={[0.85, 0.85, 0.85]} radius={0.08} position={[0, 1.35, 0]} castShadow>
                    <meshStandardMaterial color="#a78bfa" metalness={0.3} roughness={0.2} />
                  </RoundedBox>
                  {/* Animated Laser Vision Scanner Ring */}
                  <mesh ref={scannerRef} position={[0, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.82, 0.045, 12, 32]} />
                    <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.8} />
                  </mesh>
                  {/* Tall Vision Sensor Tower */}
                  <RoundedBox args={[0.68, 2.5, 0.68]} radius={0.05} position={[-0.95, 1.25, -0.45]} castShadow>
                    <meshStandardMaterial color="#f8fafc" />
                  </RoundedBox>
                  <PineTree position={[1.35, 0, -0.35]} scale={0.8} />
                </group>
              )}

              {project.architectureType === 'zenvia' && (
                <group position={[0, 0.4, 0]}>
                  {/* AI Automation Core Pillar */}
                  <mesh position={[0, 1.25, -0.1]} castShadow>
                    <cylinderGeometry args={[0.55, 0.7, 2.4, 18]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.25} />
                  </mesh>
                  {/* Orbiting Automation Gyro Ring */}
                  <mesh ref={zenviaRingRef} position={[0, 1.55, -0.1]}>
                    <torusGeometry args={[1.05, 0.05, 12, 32]} />
                    <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.5} />
                  </mesh>
                  {/* Connected Workflow Node Towers */}
                  <RoundedBox args={[0.65, 1.55, 0.65]} radius={0.05} position={[-1.05, 0.78, 0.25]} castShadow>
                    <meshStandardMaterial color="#ecfdf5" />
                  </RoundedBox>
                  <RoundedBox args={[0.65, 1.85, 0.65]} radius={0.05} position={[1.05, 0.92, 0.25]} castShadow>
                    <meshStandardMaterial color="#ecfdf5" />
                  </RoundedBox>
                  <RoundTree position={[-1.3, 0, -0.65]} scale={0.72} />
                </group>
              )}

              {/* ============================================================
                  FRONT CLIFF PROJECT TITLE + "VIEW PROJECT ->" PILL (Like 00:33)
              ============================================================ */}
              {isVisible && (
                <Html position={[0, -1.05, 1.85]} center distanceFactor={13.5} zIndexRange={[20, 0]}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onFocusProjectIndex(idx);
                      onSelectProject(project);
                    }}
                    className={`w-48 px-3 py-2.5 rounded-2xl backdrop-blur-md border transition-all duration-300 text-center cursor-pointer select-none shadow-xl ${
                      isFocused
                        ? 'bg-slate-950/90 border-teal-400/70 scale-105'
                        : 'bg-slate-900/80 border-white/15 hover:bg-slate-900/95 hover:scale-105'
                    }`}
                  >
                    <div
                      className="text-[9px] font-bold tracking-widest uppercase"
                      style={{ color: project.accentColor }}
                    >
                      {project.number}
                    </div>
                    <div className="text-sm font-extrabold text-white tracking-tight mt-0.5">
                      {project.title}
                    </div>
                    <div className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                      {project.subtitle}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFocusProjectIndex(idx);
                        onSelectProject(project);
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-white text-[10px] font-semibold border border-white/15 transition"
                    >
                      <span>View Project</span>
                      <span>→</span>
                    </button>
                  </div>
                </Html>
              )}
            </group>
          </Float>
        );
      })}
    </group>
  );
};
