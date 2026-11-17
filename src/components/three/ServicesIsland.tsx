import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
  RobotCompanion,
  AnimatedWaterfall,
} from './IslandPrimitives';
import { SERVICES_DATA, type ServiceItem } from '../../data/portfolioData';

interface ServicesIslandProps {
  activeStop: number;
  selectedService: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesIsland: React.FC<ServicesIslandProps> = ({
  activeStop,
  selectedService,
  onSelectService,
}) => {
  const coreBulbRef = useRef<THREE.Group>(null);
  const orbitRingRef = useRef<THREE.Mesh>(null);
  const isVisible = activeStop === 6;

  // Create spiral rollercoaster / elevated sky-track curve points like 00:39 in Video
  const trackPoints = useMemo(() => {
    const pts: Array<[number, number, number]> = [];
    for (let i = 0; i <= 26; i++) {
      const t = i / 26;
      const angle = t * Math.PI * 2.2 - 0.6;
      const radius = 2.9 - t * 1.1;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.55 + t * 4.2;
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreBulbRef.current) {
      coreBulbRef.current.rotation.y = t * 0.65;
      coreBulbRef.current.position.y = 1.9 + Math.sin(t * 2.4) * 0.08;
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z = t * 0.9;
    }
  });

  const billboardCoords: Array<{
    pos: [number, number, number];
    rot: [number, number, number];
  }> = [
    { pos: [-3.4, 2.0, 0.7], rot: [0, 0.35, 0] },
    { pos: [-1.1, 4.1, -1.2], rot: [0, 0.12, 0] },
    { pos: [1.9, 3.6, -1.1], rot: [0, -0.2, 0] },
    { pos: [3.3, 2.2, 0.8], rot: [0, -0.35, 0] },
    { pos: [-2.2, 1.3, 2.5], rot: [0, 0.25, 0] },
    { pos: [2.2, 1.3, 2.5], rot: [0, -0.25, 0] },
  ];

  return (
    <group position={[48, 0, -50]}>
      <FloatingIslandBase
        radiusTop={6.1}
        radiusBottom={1.4}
        depth={4.1}
        grassColor="#7cb342"
        rockColor="#7c6248"
        segments={12}
      />

      {/* Side Waterfall pouring off the island (like 00:40 in Video) */}
      <AnimatedWaterfall
        position={[3.6, -0.2, 2.2]}
        height={4.2}
        width={0.65}
        hasTopPond={false}
      />

      {/* ============================================================
          1. CENTRAL GLOWING GOLDEN FILAMENT LIGHTBULB CORE (00:40 in Video)
      ============================================================ */}
      <group position={[0, 0.45, 0.2]}>
        {/* Circular Tech Platform Base */}
        <mesh receiveShadow>
          <cylinderGeometry args={[2.15, 2.35, 0.28, 28]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </mesh>
        <mesh ref={orbitRingRef} position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.95, 0.05, 12, 36]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
        </mesh>

        {/* Giant Warm Glowing Lightbulb Sphere */}
        <group ref={coreBulbRef} position={[0, 1.9, 0]}>
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.58, 0.48, 0.55, 20]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[1.15, 28, 28]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={1.4}
              transparent
              opacity={0.78}
              roughness={0.15}
            />
          </mesh>
          {/* Inner Glowing Filament Cage */}
          <mesh>
            <octahedronGeometry args={[0.62, 1]} />
            <meshStandardMaterial color="#ffffff" emissive="#fde047" emissiveIntensity={2.2} wireframe />
          </mesh>
          <pointLight position={[0, 0.2, 0]} intensity={2.6} distance={10} color="#fbbf24" />
        </group>
      </group>

      {/* ============================================================
          2. SPIRAL SKY-TRACK ROLLERCOASTER PATHWAY (00:39 in Video)
      ============================================================ */}
      {trackPoints.map((pt, idx) => (
        <group key={idx} position={pt}>
          <RoundedBox args={[0.68, 0.08, 0.28]} radius={0.02} castShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </RoundedBox>
          {idx % 4 === 0 && (
            <mesh position={[0, -pt[1] * 0.5, 0]}>
              <cylinderGeometry args={[0.04, 0.05, pt[1], 8]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          )}
        </group>
      ))}

      {/* ============================================================
          3. ROBOT COMPANION & WOODEN SIGNBOARD ("Services / Experiments")
      ============================================================ */}
      <RobotCompanion
        position={[-1.95, 0.45, 1.85]}
        rotation={[0, 0.28, 0]}
        scale={0.95}
      />

      <group position={[1.65, 0.4, 2.85]} rotation={[0, -0.2, 0]}>
        <RoundedBox args={[2.5, 0.78, 0.16]} radius={0.04} position={[0, 0.65, 0]} castShadow>
          <meshStandardMaterial color="#d4a373" roughness={0.75} />
        </RoundedBox>
      </group>

      {/* ============================================================
          4. 6 INTERACTIVE 3D SERVICE BILLBOARD STATIONS (01 - 06)
      ============================================================ */}
      {SERVICES_DATA.map((service, idx) => {
        const cfg = billboardCoords[idx];
        const isSelected = selectedService.id === service.id;
        return (
          <Float key={service.id} speed={1.3} rotationIntensity={0.04} floatIntensity={0.2}>
            <group
              position={cfg.pos}
              rotation={cfg.rot}
              onClick={(e) => {
                e.stopPropagation();
                onSelectService(service);
              }}
            >
              {/* Billboard Frame */}
              <RoundedBox args={[1.85, 1.15, 0.12]} radius={0.05} castShadow>
                <meshStandardMaterial
                  color={isSelected ? '#2dd4bf' : '#1e293b'}
                  roughness={0.3}
                />
              </RoundedBox>
              <mesh position={[0, 0, 0.07]}>
                <planeGeometry args={[1.68, 0.98]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>

              {isVisible && (
                <Html position={[0, 0, 0.1]} transform distanceFactor={9.2} zIndexRange={[15, 0]}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className={`w-44 p-2.5 rounded-xl border text-left transition-all cursor-pointer select-none shadow-lg ${
                      isSelected
                        ? 'bg-slate-900/95 border-teal-400 scale-105 shadow-teal-500/20'
                        : 'bg-slate-950/90 border-white/15 hover:border-teal-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-teal-300 tracking-wider">
                        {service.number}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-200">
                        Service
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1 leading-snug">
                      {service.title}
                    </div>
                    <div className="text-[9px] text-slate-300 line-clamp-2 mt-0.5">
                      {service.subtitle}
                    </div>
                  </button>
                </Html>
              )}
            </group>
          </Float>
        );
      })}

      <RoundTree position={[-4.3, 0.4, -1.2]} scale={1.25} />
      <PineTree position={[-3.5, 0.4, -2.5]} scale={1.1} />
      <RoundTree position={[4.2, 0.4, -1.3]} scale={1.25} />
      <PineTree position={[3.3, 0.4, -2.6]} scale={1.05} />
    </group>
  );
};
