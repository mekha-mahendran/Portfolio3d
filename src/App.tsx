import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ISLAND_STOPS,
  SKILL_GROUPS,
  PROJECTS_DATA,
  type ProjectItem,
  DEFAULT_EXPERIENCE_DATA,
  type ExperienceItem,
  SERVICES_DATA,
  type ServiceItem,
  BRAND_DATA,
} from './data/portfolioData';
import { WorldScene } from './components/three/WorldScene';
import { PortfolioHUD } from './components/ui/PortfolioHUD';
import {
  ProjectModal,
  ExperienceEditorModal,
  EnquiryModal,
} from './components/ui/Modals';

const EXP_STORAGE_KEY = 'mekha_portfolio_experiences_v1';
const SCREENSHOT_STORAGE_KEY = 'mekha_portfolio_screenshots_v1';

export function App() {
  const [activeStop, setActiveStop] = useState<number>(0);
  const [isOrbitingWorld, setIsOrbitingWorld] = useState<boolean>(false);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<string>(
    SKILL_GROUPS[0].id
  );
  const [focusedProjectIndex, setFocusedProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(EXP_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_EXPERIENCE_DATA;
    } catch {
      return DEFAULT_EXPERIENCE_DATA;
    }
  });
  const [selectedExpId, setSelectedExpId] = useState<string>(
    DEFAULT_EXPERIENCE_DATA[0].id
  );
  const [isExpEditorOpen, setIsExpEditorOpen] = useState<boolean>(false);

  const [selectedService, setSelectedService] = useState<ServiceItem>(
    SERVICES_DATA[0]
  );
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);

  const [customScreenshots, setCustomScreenshots] = useState<
    Record<string, string>
  >(() => {
    try {
      const saved = localStorage.getItem(SCREENSHOT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Elegant Initial Loading Sequence
  const [loadingProgress, setLoadingProgress] = useState<number>(18);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 250);
          return 100;
        }
        return prev + 22;
      });
    }, 110);
    return () => clearInterval(interval);
  }, []);

  const handleSaveExperiences = (updated: ExperienceItem[]) => {
    setExperiences(updated);
    if (updated.length > 0) {
      setSelectedExpId(updated[0].id);
    }
    try {
      localStorage.setItem(EXP_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage quota errors
    }
  };

  const handleResetExperiences = () => {
    setExperiences(DEFAULT_EXPERIENCE_DATA);
    setSelectedExpId(DEFAULT_EXPERIENCE_DATA[0].id);
    try {
      localStorage.removeItem(EXP_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleUploadScreenshot = (projectId: string, dataUrl: string) => {
    const next = { ...customScreenshots, [projectId]: dataUrl };
    setCustomScreenshots(next);
    try {
      localStorage.setItem(SCREENSHOT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleNavigate = useCallback((stopIndex: number) => {
    const clamped = Math.max(0, Math.min(ISLAND_STOPS.length - 1, stopIndex));
    setActiveStop(clamped);
    if (clamped !== 0) {
      setIsOrbitingWorld(false);
    }
  }, []);

  // Scroll-controlled island navigation (with debounced smooth step transitions)
  const lastScrollTime = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Do not hijack scroll when a modal is open
      if (selectedProject || isExpEditorOpen || isEnquiryOpen) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 850) return;
      if (Math.abs(e.deltaY) < 22) return;

      lastScrollTime.current = now;
      const direction = e.deltaY > 0 ? 1 : -1;

      // When on Projects Archipelago (Stop 4), scroll cycles through the 5 project islands first
      if (activeStop === 4) {
        if (direction > 0 && focusedProjectIndex < PROJECTS_DATA.length - 1) {
          setFocusedProjectIndex((prev) => prev + 1);
          return;
        }
        if (direction < 0 && focusedProjectIndex > 0) {
          setFocusedProjectIndex((prev) => prev - 1);
          return;
        }
      }

      const nextStop = activeStop + direction;
      if (nextStop >= 0 && nextStop < ISLAND_STOPS.length) {
        handleNavigate(nextStop);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedProject || isExpEditorOpen || isEnquiryOpen) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleNavigate(Math.min(ISLAND_STOPS.length - 1, activeStop + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handleNavigate(Math.max(0, activeStop - 1));
      } else if (e.key === 'ArrowRight' && activeStop === 4) {
        setFocusedProjectIndex((prev) =>
          Math.min(PROJECTS_DATA.length - 1, prev + 1)
        );
      } else if (e.key === 'ArrowLeft' && activeStop === 4) {
        setFocusedProjectIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        handleNavigate(0);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [
    activeStop,
    focusedProjectIndex,
    handleNavigate,
    selectedProject,
    isExpEditorOpen,
    isEnquiryOpen,
  ]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    if (selectedProject || isExpEditorOpen || isEnquiryOpen) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 45) {
      const dir = deltaY > 0 ? 1 : -1;
      handleNavigate(activeStop + dir);
    }
    touchStartY.current = null;
  };

  // Dynamic Sky Gradient matching the Reference Video's exact atmosphere transitions
  const currentEnv = ISLAND_STOPS[activeStop]?.environment || 'day';
  const skyGradientClass =
    currentEnv === 'sunset'
      ? 'bg-gradient-to-b from-[#4c3d75] via-[#a86475] to-[#e8996b]'
      : currentEnv === 'golden'
      ? 'bg-gradient-to-b from-[#7cb9e8] via-[#bae6fd] to-[#fde68a]'
      : 'bg-gradient-to-b from-[#8eb8e5] via-[#c7dff4] to-[#7bd5c8]';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#68b6a7] via-[#55a395] to-[#3d8b7d] p-2 sm:p-4 md:p-6 flex items-center justify-center"
    >
      {/* ============================================================
          ELEGANT INITIAL LOADING OVERLAY
      ============================================================ */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#5aa799] via-[#74bfb1] to-[#8fd3c6] text-slate-950 transition-opacity duration-500">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl max-w-md w-full mx-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 text-teal-300 flex items-center justify-center font-black text-xl shadow-lg">
              M
            </div>
            <h1 className="text-2xl font-black tracking-tight mt-4">
              {BRAND_DATA.name}
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-800 mt-1">
              {BRAND_DATA.role}
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Generating 3D Floating Archipelago, Miniature Architecture & Lighting...
            </p>
            <div className="mt-5 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] font-extrabold text-slate-700">
              {loadingProgress}%
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          ROUNDED WHITE-BORDERED VIEWPORT FRAME (Exact Match to Video)
      ============================================================ */}
      <div
        className={`relative w-full h-full rounded-[24px] sm:rounded-[30px] border-[3px] border-white/95 shadow-2xl overflow-hidden transition-colors duration-1000 ${skyGradientClass}`}
      >
        {/* 3D React Three Fiber World Canvas */}
        <Suspense fallback={null}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 14.5, 29], fov: 42, near: 0.5, far: 260 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <WorldScene
              activeStop={activeStop}
              onNavigate={handleNavigate}
              isOrbitingWorld={isOrbitingWorld}
              selectedSkillGroup={selectedSkillGroup}
              onSelectSkillGroup={setSelectedSkillGroup}
              selectedProject={selectedProject}
              onSelectProject={(project) => setSelectedProject(project)}
              focusedProjectIndex={focusedProjectIndex}
              onFocusProjectIndex={setFocusedProjectIndex}
              experiences={experiences}
              selectedExpId={selectedExpId}
              onSelectExp={setSelectedExpId}
              onOpenExpEditor={() => setIsExpEditorOpen(true)}
              selectedService={selectedService}
              onSelectService={setSelectedService}
              onOpenEnquiry={() => setIsEnquiryOpen(true)}
            />
          </Canvas>
        </Suspense>

        {/* Interactive HUD, Glass Panels & Right-Side Pagination Stepper */}
        <PortfolioHUD
          activeStop={activeStop}
          onNavigate={handleNavigate}
          isOrbitingWorld={isOrbitingWorld}
          onToggleOrbit={() => setIsOrbitingWorld((prev) => !prev)}
          selectedSkillGroup={selectedSkillGroup}
          onSelectSkillGroup={setSelectedSkillGroup}
          focusedProjectIndex={focusedProjectIndex}
          onFocusProjectIndex={setFocusedProjectIndex}
          onSelectProject={(project) => setSelectedProject(project)}
          experiences={experiences}
          selectedExpId={selectedExpId}
          onSelectExp={setSelectedExpId}
          onOpenExpEditor={() => setIsExpEditorOpen(true)}
          selectedService={selectedService}
          onSelectService={setSelectedService}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />
      </div>

      {/* ============================================================
          INTERACTIVE MODALS (Projects, Experience Editor, Contact Enquiry)
      ============================================================ */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => {
          const idx = PROJECTS_DATA.findIndex((p) => p.id === proj.id);
          if (idx >= 0) setFocusedProjectIndex(idx);
          setSelectedProject(proj);
        }}
        allProjects={PROJECTS_DATA}
        customScreenshots={customScreenshots}
        onUploadScreenshot={handleUploadScreenshot}
      />

      <ExperienceEditorModal
        isOpen={isExpEditorOpen}
        onClose={() => setIsExpEditorOpen(false)}
        experiences={experiences}
        onSaveExperiences={handleSaveExperiences}
        onResetDefault={handleResetExperiences}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}

export default App;
