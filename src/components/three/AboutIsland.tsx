import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  FloatingIslandBase,
  PineTree,
  RoundTree,
  RobotCompanion,
} from './IslandPrimitives';
import { BRAND_DATA } from '../../data/portfolioData';

interface AboutIslandProps {
  activeStop: number;
  onNavigate: (stopIndex: number) => void;
}

export const AboutIsland: React.FC<AboutIslandProps> = ({
  activeStop,
  onNavigate,
}) => {
  const smoke1Ref = useRef<THREE.Mesh>(null);
  const smoke2Ref = useRef<THREE.Mesh>(null);
  const isVisible = activeStop === 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (smoke1Ref.current) {
      const cycle = (t * 0.65) % 1;
      smoke1Ref.current.position.y = 4.5 + cycle * 1.4;
      smoke1Ref.current.scale.setScalar(0.7 + cycle * 0.7);
    }
    if (smoke2Ref.current) {
      const cycle = ((t * 0.65) + 0.5) % 1;
      smoke2Ref.current.position.y = 4.5 + cycle * 1.4;
      smoke2Ref.current.scale.setScalar(0.7 + cycle * 0.7);
    }
  });

  return (
    <group position={[-48, 0, 0]}>
      <FloatingIslandBase
        radiusTop={5.6}
        radiusBottom={1.3}
        depth={4.0}
        grassColor="#7cb342"
        rockColor="#7c6248"
        segments={11}
      />

      {/* ============================================================
          1. CUTAWAY 2-STORY WORKSPACE CABIN (Like 00:19 in Video)
      ============================================================ */}
      <group position={[-0.45, 0.4, -0.3]}>
        {/* Wooden Deck Foundation */}
        <RoundedBox args={[4.4, 0.28, 3.3]} radius={0.05} position={[0, 0.14, 0.2]} castShadow receiveShadow>
          <meshStandardMaterial color="#8d5b3c" roughness={0.8} />
        </RoundedBox>

        {/* Back Wall & Side Walls (Open Cutaway Front!) */}
        <mesh position={[0, 1.55, -1.15]} castShadow receiveShadow>
          <boxGeometry args={[3.9, 2.6, 0.22]} />
          <meshStandardMaterial color="#d4a373" roughness={0.7} />
        </mesh>
        <mesh position={[-1.85, 1.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 2.6, 2.5]} />
          <meshStandardMaterial color="#b07d52" roughness={0.75} />
        </mesh>
        <mesh position={[1.85, 1.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 2.6, 2.5]} />
          <meshStandardMaterial color="#b07d52" roughness={0.75} />
        </mesh>

        {/* Second Floor Loft Divider */}
        <mesh position={[0, 1.65, -0.1]} castShadow receiveShadow>
          <boxGeometry args={[3.7, 0.16, 2.2]} />
          <meshStandardMaterial color="#9c6644" roughness={0.75} />
        </mesh>

        {/* Interior: First Floor Desk & Glowing AI Developer Monitor */}
        <mesh position={[0.2, 0.72, -0.55]} castShadow>
          <boxGeometry args={[2.1, 0.1, 0.75]} />
          <meshStandardMaterial color="#7f5539" />
        </mesh>
        {/* Desk Monitor */}
        <RoundedBox args={[0.92, 0.56, 0.08]} radius={0.03} position={[0.2, 1.15, -0.75]}>
          <meshStandardMaterial color="#0f172a" />
        </RoundedBox>
        <mesh position={[0.2, 1.15, -0.7]}>
          <planeGeometry args={[0.82, 0.46]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.9} />
        </mesh>

        {/* Interior: Upper Loft Bookshelves & Warm Screen */}
        <RoundedBox args={[1.05, 0.58, 0.08]} radius={0.03} position={[-0.55, 2.2, -0.85]}>
          <meshStandardMaterial color="#0f172a" />
        </RoundedBox>
        <mesh position={[-0.55, 2.2, -0.8]}>
          <planeGeometry args={[0.94, 0.48]} />
          <meshStandardMaterial color="#1e293b" emissive="#2dd4bf" emissiveIntensity={0.5} />
        </mesh>
        {/* Bookshelf on Upper Right */}
        <mesh position={[0.9, 2.15, -0.85]}>
          <boxGeometry args={[0.95, 0.65, 0.25]} />
          <meshStandardMaterial color="#7f5539" />
        </mesh>

        {/* Warm Interior Point Light */}
        <pointLight position={[0, 1.5, 0.4]} intensity={1.8} distance={6} color="#fbbf24" />

        {/* Steep Dark Slate Pitched Roof */}
        <mesh position={[-1.12, 3.32, 0]} rotation={[0, 0, 0.65]} castShadow>
          <boxGeometry args={[2.75, 0.18, 2.95]} />
          <meshStandardMaterial color="#334155" roughness={0.65} />
        </mesh>
        <mesh position={[1.12, 3.32, 0]} rotation={[0, 0, -0.65]} castShadow>
          <boxGeometry args={[2.75, 0.18, 2.95]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} />
        </mesh>

        {/* Brick Chimney & Rising White Smoke Puffs */}
        <mesh position={[1.15, 3.85, -0.45]} castShadow>
          <boxGeometry args={[0.48, 1.25, 0.48]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} />
        </mesh>
        <mesh ref={smoke1Ref} position={[1.15, 4.6, -0.45]}>
          <sphereGeometry args={[0.26, 12, 12]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.75} />
        </mesh>
        <mesh ref={smoke2Ref} position={[1.28, 5.1, -0.45]}>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.55} />
        </mesh>
      </group>

      {/* ============================================================
          2. ROBOT COMPANION & "ORIGIN / ABOUT ME" WOODEN SIGN (Front Left)
      ============================================================ */}
      <RobotCompanion
        position={[-1.4, 0.68, 1.35]}
        rotation={[0, 0.18, 0]}
        scale={0.95}
      />

      {/* Left Wooden Signboard ("Origin — About Me") */}
      <group position={[-3.25, 0.4, 1.55]} rotation={[0, 0.22, 0]}>
        <mesh position={[-0.6, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 1.1, 8]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        <mesh position={[0.6, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 1.1, 8]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        <RoundedBox args={[2.1, 1.05, 0.16]} radius={0.05} position={[0, 1.15, 0]} castShadow>
          <meshStandardMaterial color="#5c3a21" roughness={0.8} />
        </RoundedBox>
        {isVisible && (
          <Html position={[0, 1.15, 0.1]} transform distanceFactor={9} zIndexRange={[10, 0]}>
            <div className="w-44 px-3 py-2 rounded-lg bg-[#4a2e19]/95 border border-amber-400/30 text-center text-amber-50 shadow-lg select-none">
              <div className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                Origin
              </div>
              <div className="text-sm font-bold mt-0.5">About Mekha M.</div>
              <button
                onClick={() => onNavigate(3)}
                className="mt-1 inline-flex items-center gap-1 text-[10px] text-teal-300 hover:text-teal-200 font-medium cursor-pointer"
              >
                Next: Skills Lab →
              </button>
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================
          3. STACKED WOODEN HIGHLIGHT SIGNBOARDS (Right Side, like 00:20)
      ============================================================ */}
      <group position={[2.85, 0.4, 0.65]} rotation={[0, -0.22, 0]}>
        {/* Two Vertical Wooden Posts */}
        <mesh position={[-0.75, 1.65, -0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 3.3, 8]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        <mesh position={[0.75, 1.65, -0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 3.3, 8]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>

        {/* Three Stacked Wooden Planks */}
        {[2.65, 1.75, 0.85].map((yPos, idx) => (
          <RoundedBox
            key={idx}
            args={[2.35, 0.72, 0.15]}
            radius={0.04}
            position={[0, yPos, 0]}
            castShadow
          >
            <meshStandardMaterial color="#c68b59" roughness={0.75} />
          </RoundedBox>
        ))}

        {isVisible && (
          <Html position={[0, 1.75, 0.12]} transform distanceFactor={9.2} zIndexRange={[10, 0]}>
            <div className="flex flex-col gap-2 w-48 select-none pointer-events-none">
              {BRAND_DATA.verifiedHighlights.map((item, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-[#b87d4b]/95 border border-amber-950/30 text-center shadow"
                >
                  <div className="text-base font-extrabold text-slate-950 leading-none">
                    {item.value}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-900 mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================
          4. CARVED ROCK PLAQUE ("Curious · Creative · Problem Solver")
      ============================================================ */}
      <group position={[1.45, -0.55, 4.35]} rotation={[-0.18, 0.22, 0]}>
        <mesh castShadow>
          <dodecahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial color="#d6c7b2" roughness={0.85} flatShading />
        </mesh>
        {isVisible && (
          <Html position={[0, 0.05, 0.75]} transform distanceFactor={9.5} zIndexRange={[10, 0]}>
            <div className="px-2.5 py-1 rounded text-center text-slate-800 font-bold text-[11px] leading-snug select-none pointer-events-none">
              Curious
              <br />
              Creative
              <br />
              Problem Solver
            </div>
          </Html>
        )}
      </group>

      {/* Lush Trees & Garden */}
      <RoundTree position={[-3.4, 0.4, -0.6]} scale={1.35} />
      <RoundTree position={[-2.6, 0.4, -2.1]} scale={1.1} />
      <PineTree position={[2.2, 0.4, -1.9]} scale={1.15} />
      <RoundTree position={[3.6, 0.4, -0.8]} scale={0.95} />
    </group>
  );
};
