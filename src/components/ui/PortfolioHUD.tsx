import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Sparkles,
  Mail,
  Briefcase,
  ChevronUp,
  ChevronDown,
  Edit3,
  Layers,
  Code2,
  Eye,
  EyeOff,
  Orbit,
  Globe,
  Terminal,
} from 'lucide-react';
import {
  ISLAND_STOPS,
  BRAND_DATA,
  SKILL_GROUPS,
  PROJECTS_DATA,
  type ProjectItem,
  type ExperienceItem,
  SERVICES_DATA,
  type ServiceItem,
} from '../../data/portfolioData';

interface PortfolioHUDProps {
  activeStop: number;
  onNavigate: (stopIndex: number) => void;
  isOrbitingWorld: boolean;
  onToggleOrbit: () => void;
  selectedSkillGroup: string;
  onSelectSkillGroup: (id: string) => void;
  focusedProjectIndex: number;
  onFocusProjectIndex: (index: number) => void;
  onSelectProject: (project: ProjectItem) => void;
  experiences: ExperienceItem[];
  selectedExpId: string;
  onSelectExp: (id: string) => void;
  onOpenExpEditor: () => void;
  selectedService: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
  onOpenEnquiry: () => void;
}

export const PortfolioHUD: React.FC<PortfolioHUDProps> = ({
  activeStop,
  onNavigate,
  isOrbitingWorld,
  onToggleOrbit,
  selectedSkillGroup,
  onSelectSkillGroup,
  focusedProjectIndex,
  onFocusProjectIndex,
  onSelectProject,
  experiences,
  selectedExpId,
  onSelectExp,
  onOpenExpEditor,
  selectedService,
  onSelectService,
  onOpenEnquiry,
}) => {
  const [minimizedCard, setMinimizedCard] = useState(false);

  const currentSkillObj =
    SKILL_GROUPS.find((g) => g.id === selectedSkillGroup) || SKILL_GROUPS[0];
  const currentExpObj =
    experiences.find((e) => e.id === selectedExpId) || experiences[0];
  const currentProjectObj =
    PROJECTS_DATA[focusedProjectIndex] || PROJECTS_DATA[0];

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* ============================================================
          TOP BAR: "<- Back to world" button & Quick Island Bar
      ============================================================ */}
      <div className="flex items-center justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2.5">
          {activeStop > 0 ? (
            <button
              onClick={() => onNavigate(0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold shadow-lg border border-white/15 backdrop-blur-md transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-300" />
              <span>Back to world</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-slate-900 text-xs font-extrabold tracking-wide">
              <Compass className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '10s' }} />
              <span>MEKHA M. · 3D WORLD</span>
            </div>
          )}

          {activeStop === 0 && (
            <button
              onClick={onToggleOrbit}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border backdrop-blur-md transition cursor-pointer shadow-sm ${
                isOrbitingWorld
                  ? 'bg-teal-500 text-slate-950 border-teal-300'
                  : 'bg-slate-900/80 text-white border-white/20 hover:bg-slate-900'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>{isOrbitingWorld ? 'Stop 360° Tour' : '360° Aerial Orbit'}</span>
            </button>
          )}
        </div>

        {/* Top Center/Right Quick Island Navigation Pills (Desktop & Tablet) */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-1 p-1.5 rounded-2xl bg-slate-950/65 backdrop-blur-md border border-white/20 shadow-lg">
          {ISLAND_STOPS.map((stop) => {
            const isActive = activeStop === stop.index;
            return (
              <button
                key={stop.id}
                onClick={() => onNavigate(stop.index)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-400 text-slate-950 shadow'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {stop.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Toggle Card Visibility Button on Individual Islands */}
        {activeStop >= 2 && activeStop <= 6 && (
          <button
            onClick={() => setMinimizedCard((prev) => !prev)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold border border-white/15 backdrop-blur-md cursor-pointer"
            title="Toggle info card to inspect 3D island"
          >
            {minimizedCard ? (
              <>
                <Eye className="w-3.5 h-3.5 text-teal-300" />
                <span className="hidden sm:inline">Show Panel</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Pure 3D View</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* ============================================================
          RIGHT-SIDE VERTICAL PAGINATION & SCROLL INDICATOR (Like Video)
      ============================================================ */}
      <div className="pointer-events-auto fixed right-6 sm:right-9 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 bg-white/35 dark:bg-slate-950/40 backdrop-blur-md px-2.5 py-3.5 rounded-full border border-white/40 shadow-lg">
        <span className="text-[10px] font-extrabold text-slate-800 tracking-tighter">
          {activeStop + 1}/{ISLAND_STOPS.length}
        </span>
        <div className="flex flex-col items-center gap-2 my-1">
          {ISLAND_STOPS.map((stop) => {
            const isActive = activeStop === stop.index;
            return (
              <button
                key={stop.id}
                onClick={() => onNavigate(stop.index)}
                title={stop.label}
                className={`rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-slate-900 ring-4 ring-teal-400/50 scale-110'
                    : 'w-1.5 h-1.5 bg-slate-700/60 hover:bg-slate-900'
                }`}
              />
            );
          })}
        </div>
        <div className="w-4 h-6 rounded-full border border-slate-800/70 flex items-start justify-center p-0.5">
          <div className="w-1 h-1.5 rounded-full bg-slate-900 animate-bounce" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-800">
          Scroll
        </span>
      </div>

      {/* ============================================================
          CONTEXTUAL ISLAND OVERLAYS
      ============================================================ */}

      {/* 1. STOP 0 & STOP 1: MAIN HERO — HOME ISLAND (Matches 00:00 - 00:17 in Video) */}
      {(activeStop === 0 || activeStop === 1) && (
        <div className="my-auto max-w-md pointer-events-auto">
          <div className="p-5 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-xl text-slate-900">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-600/30 text-teal-900 text-[11px] font-extrabold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-teal-600" />
              {BRAND_DATA.heroRoleBadge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2.5 leading-none">
              {BRAND_DATA.name}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-teal-800 mt-1.5">
              {BRAND_DATA.role}
            </p>

            <p className="text-sm sm:text-base font-semibold text-slate-800 mt-3 leading-snug">
              &ldquo;{BRAND_DATA.heroTagline}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {BRAND_DATA.brandIntroduction}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate(activeStop === 0 ? 1 : 2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-teal-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg transition cursor-pointer"
              >
                <span>{BRAND_DATA.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(4)}
                className="px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-bold text-xs border border-slate-300/80 shadow-sm transition cursor-pointer"
              >
                Projects Archipelago
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. STOP 2: ORIGIN — ABOUT ISLAND (Matches 00:18 - 00:22 in Video) */}
      {activeStop === 2 && !minimizedCard && (
        <div className="mt-auto max-w-lg pointer-events-auto">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
                02 · Origin — About Island
              </span>
              <div className="flex gap-1.5">
                {BRAND_DATA.aboutTraits.map((trait) => (
                  <span
                    key={trait}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-teal-200 font-semibold"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-extrabold mt-1.5">
              {BRAND_DATA.aboutHeading}
            </h2>
            {BRAND_DATA.aboutParagraphs.map((p, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
                {p}
              </p>
            ))}

            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Career Focus & Engineering Interests
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {BRAND_DATA.careerInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-400/30 text-[11px] font-semibold text-teal-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. STOP 3: CREATIVE LAB — SKILLS ISLAND (Matches 00:24 - 00:30 in Video) */}
      {activeStop === 3 && !minimizedCard && (
        <div className="mt-auto max-w-xl pointer-events-auto">
          <div className="p-5 rounded-3xl bg-slate-900/88 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                  03 · Creative Lab — Technology Island
                </span>
                <h2 className="text-xl font-extrabold flex items-center gap-2 mt-0.5">
                  <Code2 className="w-5 h-5 text-sky-400" />
                  <span>{currentSkillObj.category}</span>
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {SKILL_GROUPS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => onSelectSkillGroup(g.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      g.id === selectedSkillGroup
                        ? 'bg-teal-400 text-slate-950 shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {g.category.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3.5">
              {currentSkillObj.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-teal-400/40 text-xs font-bold text-white shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. STOP 4: PROJECTS ARCHIPELAGO (Matches 00:32 - 00:36 in Video) */}
      {activeStop === 4 && (
        <div className="mt-auto mx-auto w-full max-w-3xl pointer-events-auto">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/88 backdrop-blur-xl border border-white/20 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 text-slate-950"
                style={{ backgroundColor: currentProjectObj.accentColor }}
              >
                0{focusedProjectIndex + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                    Projects Archipelago
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Click any 3D island to inspect)
                  </span>
                </div>
                <h2 className="text-lg font-extrabold leading-tight">
                  {currentProjectObj.title} —{' '}
                  <span className="text-slate-300 font-medium text-sm">
                    {currentProjectObj.subtitle}
                  </span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {PROJECTS_DATA.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => onFocusProjectIndex(idx)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    focusedProjectIndex === idx
                      ? 'bg-teal-400 text-slate-950'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
              <button
                onClick={() => onSelectProject(currentProjectObj)}
                className="ml-1 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-extrabold text-xs shadow cursor-pointer"
              >
                View Project →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. STOP 5: EXPERIENCE ISLAND */}
      {activeStop === 5 && !minimizedCard && currentExpObj && (
        <div className="mt-auto max-w-xl pointer-events-auto">
          <div className="p-5 rounded-3xl bg-slate-900/88 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                05 · Career & Experience Island ({currentExpObj.category})
              </span>
              <button
                onClick={onOpenExpEditor}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-bold border border-amber-400/30 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Edit Timeline
              </button>
            </div>

            <h2 className="text-xl font-extrabold mt-1">{currentExpObj.title}</h2>
            <div className="text-xs font-semibold text-teal-300">
              {currentExpObj.organization} · {currentExpObj.period}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              {currentExpObj.description}
            </p>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {experiences.map((exp, idx) => (
                  <button
                    key={exp.id}
                    onClick={() => onSelectExp(exp.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                      exp.id === currentExpObj.id
                        ? 'bg-teal-400 text-slate-950'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    0{idx + 1} · {exp.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. STOP 6: SERVICES ISLAND (Matches 00:38 - 00:43 in Video) */}
      {activeStop === 6 && !minimizedCard && (
        <div className="mt-auto max-w-xl pointer-events-auto">
          <div className="p-5 rounded-3xl bg-slate-900/88 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                06 · Services & Capabilities Island
              </span>
              <span className="text-xs font-bold text-amber-300">
                Service {selectedService.number} / 06
              </span>
            </div>

            <h2 className="text-xl font-extrabold mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>
                {selectedService.number}. {selectedService.title}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedService.deliverables.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-400/30 text-[11px] font-semibold text-teal-200"
                >
                  ✓ {d}
                </span>
              ))}
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => onSelectService(srv)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    srv.id === selectedService.id
                      ? 'bg-teal-400 text-slate-950'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {srv.number} · {srv.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. STOP 7: CONTACT LIGHTHOUSE ISLAND AT SUNSET (Exact Match to 00:46 - 00:51 in Video) */}
      {activeStop === 7 && (
        <div className="my-auto ml-auto mr-10 sm:mr-16 w-full max-w-sm pointer-events-auto space-y-3">
          {/* Frosted Glass Contact Cards Floating Over Sunset Ocean (Like 00:48 in Video) */}
          <a
            href={BRAND_DATA.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white shadow-xl transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-sm shadow">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold">LinkedIn</div>
                <div className="text-xs text-slate-200">
                  {BRAND_DATA.contact.linkedinDisplay}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition" />
          </a>

          <a
            href={BRAND_DATA.contact.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white shadow-xl transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-sm shadow">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold">GitHub</div>
                <div className="text-xs text-slate-200">
                  {BRAND_DATA.contact.githubDisplay}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition" />
          </a>

          <a
            href={`mailto:${BRAND_DATA.contact.email}`}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white shadow-xl transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold shadow">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold">Let&apos;s Connect</div>
                <div className="text-xs text-slate-200">
                  {BRAND_DATA.contact.email}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition" />
          </a>

          <button
            onClick={onOpenEnquiry}
            className="w-full group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-400/90 to-orange-400/90 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-extrabold shadow-2xl border border-amber-200 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center shadow">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black">Freelance & Project Enquiry</div>
                <div className="text-xs text-slate-900 font-semibold">
                  Start an AI or Full Stack project together
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition" />
          </button>
        </div>
      )}

      {/* ============================================================
          BOTTOM CONTROLS: Prev / Next Island & Current Island Pill
      ============================================================ */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs shadow-lg">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-bold">{ISLAND_STOPS[activeStop].label}</span>
          <span className="hidden sm:inline text-slate-300">
            — {ISLAND_STOPS[activeStop].subtitle}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() =>
              onNavigate(
                (activeStop - 1 + ISLAND_STOPS.length) % ISLAND_STOPS.length
              )
            }
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md border border-white transition cursor-pointer"
            title="Previous Island"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate((activeStop + 1) % ISLAND_STOPS.length)}
            className="p-2.5 rounded-full bg-slate-900 hover:bg-teal-500 text-white hover:text-slate-950 shadow-md border border-white/20 transition cursor-pointer"
            title="Next Island"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
