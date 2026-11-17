import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  ISLAND_STOPS,
  type ProjectItem,
  type ExperienceItem,
  type ServiceItem,
} from '../../data/portfolioData';
import {
  CloudCluster,
  MiniFloatingRock,
  RobotCompanion,
} from './IslandPrimitives';
import { HomeWorldIsland } from './HomeWorldIsland';
import { AboutIsland } from './AboutIsland';
import { SkillsIsland } from './SkillsIsland';
import { ProjectsArchipelago } from './ProjectsArchipelago';
import { ExperienceIsland } from './ExperienceIsland';
import { ServicesIsland } from './ServicesIsland';
import { ContactIsland } from './ContactIsland';

interface WorldSceneProps {
  activeStop: number;
  onNavigate: (stopIndex: number) => void;
  isOrbitingWorld: boolean;
  selectedSkillGroup: string;
  onSelectSkillGroup: (id: string) => void;
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem) => void;
  focusedProjectIndex: number;
  onFocusProjectIndex: (index: number) => void;
  experiences: ExperienceItem[];
  selectedExpId: string;
  onSelectExp: (id: string) => void;
  onOpenExpEditor: () => void;
  selectedService: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
  onOpenEnquiry: () => void;
}

export const WorldScene: React.FC<WorldSceneProps> = ({
  activeStop,
  onNavigate,
  isOrbitingWorld,
  selectedSkillGroup,
  onSelectSkillGroup,
  selectedProject,
  onSelectProject,
  focusedProjectIndex,
  onFocusProjectIndex,
  experiences,
  selectedExpId,
  onSelectExp,
  onOpenExpEditor,
  selectedService,
  onSelectService,
  onOpenEnquiry,
}) => {
  const { camera, size, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 0));
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const flyingRobotRef = useRef<THREE.Group>(null);

  const projectXOffsets = [-11.2, -5.6, 0, 5.6, 11.2];

  useFrame(({ clock }, delta) => {
    const stop = ISLAND_STOPS[activeStop] || ISLAND_STOPS[0];
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    const zoomPullback = isMobile ? 1.32 : isTablet ? 1.14 : 1.0;

    let desiredPos = new THREE.Vector3(...stop.cameraPos);
    let desiredTarget = new THREE.Vector3(...stop.cameraTarget);

    // If on World Overview and bird's-eye orbit mode is active (like 00:05-00:11 in Video)
    if (activeStop === 0 && isOrbitingWorld) {
      const angle = clock.getElapsedTime() * 0.55;
      const radius = 23 * zoomPullback;
      desiredPos.set(
        Math.sin(angle) * radius,
        19.5,
        Math.cos(angle) * radius
      );
      desiredTarget.set(0, 1.2, 0);
    } else if (activeStop === 4) {
      // Shift horizontally along Projects Archipelago based on focusedProjectIndex
      const xShift = projectXOffsets[focusedProjectIndex] || 0;
      desiredPos.x += xShift * 0.72;
      desiredTarget.x += xShift * 0.85;
    }

    // Apply responsive pullback along camera-to-target vector
    const offsetVec = desiredPos.clone().sub(desiredTarget).multiplyScalar(zoomPullback);
    desiredPos.copy(desiredTarget).add(offsetVec);

    // Subtle mouse-controlled parallax movement
    const parallaxScale = activeStop === 0 ? 1.4 : 0.65;
    desiredPos.x += pointer.x * parallaxScale;
    desiredPos.y += pointer.y * (parallaxScale * 0.55);

    const smoothFactor = 1 - Math.exp(-2.6 * Math.min(delta, 0.1));
    camera.position.lerp(desiredPos, smoothFactor);
    currentLookAt.current.lerp(desiredTarget, smoothFactor);
    camera.lookAt(currentLookAt.current);

    // Animate Flying Companion Robot when camera is in transit between islands
    if (flyingRobotRef.current) {
      const distToDest = camera.position.distanceTo(desiredPos);
      const isTraveling = distToDest > 2.4 && activeStop > 0;
      flyingRobotRef.current.visible = isTraveling;
      if (isTraveling) {
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        const robotWorldPos = camera.position
          .clone()
          .add(forward.multiplyScalar(7.5))
          .add(new THREE.Vector3(0, -0.5 + Math.sin(clock.getElapsedTime() * 6) * 0.25, 0));
        flyingRobotRef.current.position.copy(robotWorldPos);
        flyingRobotRef.current.rotation.y = clock.getElapsedTime() * 2.5;
      }
    }

    // Smoothly transition lighting between Day, Golden Hour, and Sunset
    if (dirLightRef.current && ambientLightRef.current) {
      const targetDirColor =
        stop.environment === 'sunset'
          ? new THREE.Color('#fb923c')
          : stop.environment === 'golden'
          ? new THREE.Color('#fde047')
          : new THREE.Color('#fffbeb');
      const targetAmbColor =
        stop.environment === 'sunset'
          ? new THREE.Color('#c084fc')
          : stop.environment === 'golden'
          ? new THREE.Color('#bae6fd')
          : new THREE.Color('#e0f2fe');

      dirLightRef.current.color.lerp(targetDirColor, smoothFactor);
      ambientLightRef.current.color.lerp(targetAmbColor, smoothFactor);
    }
  });

  // Scatter atmospheric clouds and mini floating rock islets around the entire 3D universe
  const decorativeIslets = useMemo(
    () => [
      // Around Home World Island (exact framing from 00:00 in Video)
      { pos: [-11.5, 5.2, -5.5] as [number, number, number], scale: 0.9 },
      { pos: [-11.8, -1.5, 2.2] as [number, number, number], scale: 0.78 },
      { pos: [7.8, 5.6, -5.8] as [number, number, number], scale: 0.85 },
      { pos: [12.5, 1.4, 2.5] as [number, number, number], scale: 0.95 },
      { pos: [-10.2, -3.6, 8.8] as [number, number, number], scale: 0.65 },
      // Around About Island
      { pos: [-56, 3.8, -6] as [number, number, number], scale: 0.75 },
      { pos: [-40, 2.5, -5] as [number, number, number], scale: 0.7 },
      // Around Skills Island
      { pos: [-9, 4.2, -58] as [number, number, number], scale: 0.8 },
      { pos: [9.5, 3.5, -57] as [number, number, number], scale: 0.75 },
      // Around Projects Archipelago
      { pos: [44, 4.8, -6] as [number, number, number], scale: 0.85 },
      { pos: [56, 5.4, -7] as [number, number, number], scale: 0.75 },
      { pos: [67, 4.2, -5] as [number, number, number], scale: 0.8 },
      // Around Experience & Services Islands
      { pos: [-56, 4.0, -56] as [number, number, number], scale: 0.75 },
      { pos: [56, 4.2, -56] as [number, number, number], scale: 0.8 },
      // Around Contact Sunset Island
      { pos: [-8.5, 3.8, 44] as [number, number, number], scale: 0.7 },
      { pos: [-5.5, 2.4, 46] as [number, number, number], scale: 0.55 },
      { pos: [8.5, 4.1, 43] as [number, number, number], scale: 0.75 },
    ],
    []
  );

  const cloudClusters = useMemo(
    () => [
      // Home Island Clouds
      { pos: [-12, 6.8, -8] as [number, number, number], scale: 1.4, color: '#ffffff' },
      { pos: [12, 6.2, -9] as [number, number, number], scale: 1.5, color: '#fdf2f8' },
      { pos: [10.5, -2.6, 8.5] as [number, number, number], scale: 1.35, color: '#fce7f3' },
      { pos: [-11.5, -2.8, 9.2] as [number, number, number], scale: 1.3, color: '#fce7f3' },
      // About Island Clouds
      { pos: [-55, -2.2, 4] as [number, number, number], scale: 1.4, color: '#fce7f3' },
      { pos: [-41, 4.8, -7] as [number, number, number], scale: 1.25, color: '#ffffff' },
      // Skills Island Clouds
      { pos: [-8, 3.8, -59] as [number, number, number], scale: 1.5, color: '#fce7f3' },
      { pos: [8.5, 2.2, -58] as [number, number, number], scale: 1.6, color: '#fdf2f8' },
      // Projects Archipelago Clouds (Fluffy bed of clouds below the 5 islands like 00:33)
      { pos: [45, -2.8, 1.5] as [number, number, number], scale: 1.55, color: '#ffffff' },
      { pos: [52, -3.1, 2.0] as [number, number, number], scale: 1.65, color: '#f8fafc' },
      { pos: [59, -2.9, 1.8] as [number, number, number], scale: 1.6, color: '#ffffff' },
      { pos: [66, -2.8, 1.2] as [number, number, number], scale: 1.5, color: '#f8fafc' },
      { pos: [48, 5.5, -8] as [number, number, number], scale: 1.3, color: '#ffffff' },
      { pos: [63, 5.2, -8] as [number, number, number], scale: 1.35, color: '#ffffff' },
      // Experience & Services Clouds
      { pos: [-48, -3.0, -46] as [number, number, number], scale: 1.5, color: '#ffffff' },
      { pos: [48, -3.0, -46] as [number, number, number], scale: 1.55, color: '#ffffff' },
      { pos: [41, 3.5, -56] as [number, number, number], scale: 1.3, color: '#ffffff' },
    ],
    []
  );

  return (
    <>
      {/* Lighting System */}
      <ambientLight ref={ambientLightRef} intensity={0.88} color="#e0f2fe" />
      <directionalLight
        ref={dirLightRef}
        position={[18, 28, 22]}
        intensity={1.65}
        color="#fffbeb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <hemisphereLight args={['#bae6fd', '#689f38', 0.55]} />

      {/* Flying Robot Companion visible mid-flight between islands (Like 00:23 & 00:44 in Video) */}
      <group ref={flyingRobotRef} visible={false}>
        <RobotCompanion position={[0, 0, 0]} scale={0.75} isFlying />
      </group>

      {/* ============================================================
          ALL 7 INTERACTIVE 3D ISLAND ENVIRONMENTS IN ONE CONNECTED WORLD
      ============================================================ */}
      {/* Stop 0 & 1: Home World Island + Foreground Hero Platform */}
      <HomeWorldIsland onNavigate={onNavigate} activeStop={activeStop} />

      {/* Stop 2: Origin / About Island */}
      <AboutIsland activeStop={activeStop} onNavigate={onNavigate} />

      {/* Stop 3: Creative Lab / Skills Island */}
      <SkillsIsland
        activeStop={activeStop}
        selectedSkillGroup={selectedSkillGroup}
        onSelectSkillGroup={onSelectSkillGroup}
      />

      {/* Stop 4: Projects Archipelago (5 Project Islands) */}
      <ProjectsArchipelago
        activeStop={activeStop}
        selectedProject={selectedProject}
        onSelectProject={onSelectProject}
        focusedProjectIndex={focusedProjectIndex}
        onFocusProjectIndex={onFocusProjectIndex}
      />

      {/* Stop 5: Career & Experience Island */}
      <ExperienceIsland
        activeStop={activeStop}
        experiences={experiences}
        selectedExpId={selectedExpId}
        onSelectExp={onSelectExp}
        onOpenEditor={onOpenExpEditor}
      />

      {/* Stop 6: Experiments & Services Island */}
      <ServicesIsland
        activeStop={activeStop}
        selectedService={selectedService}
        onSelectService={onSelectService}
      />

      {/* Stop 7: Sunset Lighthouse Contact Island */}
      <ContactIsland activeStop={activeStop} onOpenEnquiry={onOpenEnquiry} />

      {/* Sunset Horizon Glowing Sun Sphere & Mountain Silhouettes behind Contact Island (00:46 in Video) */}
      <group position={[2.5, 1.2, 34]}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[3.4, 32, 32]} />
          <meshBasicMaterial color="#fde047" transparent opacity={activeStop === 7 ? 0.85 : 0} />
        </mesh>
        <mesh position={[0, 1.5, -0.2]}>
          <sphereGeometry args={[4.6, 32, 32]} />
          <meshBasicMaterial color="#fb923c" transparent opacity={activeStop === 7 ? 0.35 : 0} />
        </mesh>
      </group>

      {/* Decorative Mini Floating Rock Islets */}
      {decorativeIslets.map((item, i) => (
        <MiniFloatingRock
          key={i}
          position={item.pos}
          scale={item.scale}
          speed={1.0 + (i % 4) * 0.25}
        />
      ))}

      {/* Volumetric Drifting Clouds */}
      {cloudClusters.map((c, i) => (
        <CloudCluster
          key={i}
          position={c.pos}
          scale={c.scale}
          color={c.color}
          speed={0.4 + (i % 3) * 0.2}
        />
      ))}
    </>
  );
};
