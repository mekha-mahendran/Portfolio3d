import React, { useState } from 'react';
import {
  X,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Cpu,
  Image as ImageIcon,
  Plus,
  Trash2,
  RotateCcw,
  Send,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import {
  type ProjectItem,
  type ExperienceItem,
  BRAND_DATA,
} from '../../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
  customScreenshots: Record<string, string>;
  onUploadScreenshot: (projectId: string, dataUrl: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  customScreenshots,
  onUploadScreenshot,
}) => {
  if (!project) return null;

  const customImg = customScreenshots[project.id];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadScreenshot(project.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/65 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-slate-900/95 border border-white/20 text-white shadow-2xl p-6 md:p-8 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase"
                style={{
                  backgroundColor: `${project.accentColor}22`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}55`,
                }}
              >
                {project.number}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {project.previewType}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-teal-300 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive System Preview / Screenshot Canvas */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-slate-950/90 border border-white/15 p-5 relative overflow-hidden">
            {customImg ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <img
                  src={customImg}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            ) : (
              /* Interactive Architectural Preview Blueprint for Each Project */
              <div className="flex flex-col justify-between h-64 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 p-4 relative overflow-hidden">
                {/* Browser Window Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-[11px] text-slate-400 font-mono">
                      app://{project.id}.mekha.dev
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                    style={{
                      backgroundColor: `${project.accentColor}25`,
                      color: project.accentColor,
                    }}
                  >
                    Live Architecture Preview
                  </span>
                </div>

                {/* Bespoke System Diagram Inside Preview */}
                {project.architectureType === 'swifthr' && (
                  <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30">
                      <div className="text-[10px] text-sky-300 uppercase font-semibold">
                        Employee Hub
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Directory & Roles
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded bg-sky-950 overflow-hidden">
                        <div className="h-full w-4/5 bg-sky-400" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-400/30">
                      <div className="text-[10px] text-teal-300 uppercase font-semibold">
                        Attendance
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Shift & Leave Logs
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded bg-teal-950 overflow-hidden">
                        <div className="h-full w-5/6 bg-teal-400" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-400/30">
                      <div className="text-[10px] text-indigo-300 uppercase font-semibold">
                        Payroll Engine
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Automated Payslips
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded bg-indigo-950 overflow-hidden">
                        <div className="h-full w-full bg-indigo-400" />
                      </div>
                    </div>
                  </div>
                )}

                {project.architectureType === 'manamaalai' && (
                  <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
                    <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-400/30">
                      <div className="text-[10px] text-pink-300 uppercase font-semibold">
                        Profile Studio
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Verified Bio & Preferences
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30">
                      <div className="text-[10px] text-amber-300 uppercase font-semibold">
                        Horoscope Engine
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Chart Compatibility Match
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/30">
                      <div className="text-[10px] text-purple-300 uppercase font-semibold">
                        Subscriptions
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Tiered Member Access
                      </div>
                    </div>
                  </div>
                )}

                {project.architectureType === 'agency' && (
                  <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-400/30">
                      <div className="text-[10px] text-teal-300 uppercase font-semibold">
                        Client Portal
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Deliverables & Intake
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30">
                      <div className="text-[10px] text-sky-300 uppercase font-semibold">
                        AI Copilot
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Prompt Brief Breakdown
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                        Workflow OS
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Sprint & Task Pipelines
                      </div>
                    </div>
                  </div>
                )}

                {project.architectureType === 'counterfeit' && (
                  <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-400/30">
                      <div className="text-[10px] text-violet-300 uppercase font-semibold">
                        Step 01 · Capture
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Product Packaging Scan
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-400/30">
                      <div className="text-[10px] text-teal-300 uppercase font-semibold">
                        Step 02 · Vision AI
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Logo & Pattern Extraction
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                        Step 03 · Verdict
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Authenticity Verification
                      </div>
                    </div>
                  </div>
                )}

                {project.architectureType === 'zenvia' && (
                  <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                        Trigger Node
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Event & Webhook Listener
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-400/30">
                      <div className="text-[10px] text-teal-300 uppercase font-semibold">
                        AI Agent Node
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Reasoning & Transformation
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30">
                      <div className="text-[10px] text-sky-300 uppercase font-semibold">
                        Action Node
                      </div>
                      <div className="text-xs font-bold text-white mt-1">
                        Automated Execution
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
                  <span>Interactive 3D Island + System Architecture</span>
                  <span className="text-teal-300 font-medium">Mekha M. Engineering</span>
                </div>
              </div>
            )}

            {/* Option to Attach/Replace with Actual Local Project Screenshot */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">
                Have a custom project screenshot? Attach it to this island:
              </span>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-teal-300 cursor-pointer transition border border-white/10">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload Screenshot</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right Column: Overview, Highlights & Tech Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                Project Overview
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mt-2">
                {project.description}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mt-5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                Core Capabilities & Architecture
              </h3>
              <ul className="mt-2.5 space-y-2">
                {project.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-teal-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Switcher for All 5 Islands in the Archipelago */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-400 font-medium">
            Switch Island in Projects Archipelago:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {allProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  p.id === project.id
                    ? 'bg-teal-400 text-slate-950 shadow'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {p.number.replace('PROJECT ', '#')} · {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExperienceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: ExperienceItem[];
  onSaveExperiences: (updated: ExperienceItem[]) => void;
  onResetDefault: () => void;
}

export const ExperienceEditorModal: React.FC<ExperienceEditorModalProps> = ({
  isOpen,
  onClose,
  experiences,
  onSaveExperiences,
  onResetDefault,
}) => {
  const [draft, setDraft] = useState<ExperienceItem[]>(experiences);

  if (!isOpen) return null;

  const updateItem = (idx: number, field: keyof ExperienceItem, value: string | string[]) => {
    const next = [...draft];
    next[idx] = { ...next[idx], [field]: value };
    setDraft(next);
  };

  const addItem = () => {
    setDraft([
      ...draft,
      {
        id: `exp-${Date.now()}`,
        period: '2025 - Present',
        title: 'New Role / Milestone',
        organization: 'Company or University',
        category: 'Development',
        description: 'Describe your responsibilities, technologies, and verified outcomes.',
        skills: ['React', 'TypeScript', 'AI Integration'],
      },
    ]);
  };

  const removeItem = (idx: number) => {
    if (draft.length <= 1) return;
    setDraft(draft.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[86vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/20 text-white p-6 md:p-8 shadow-2xl select-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-extrabold">
              Customize Experience & Education Timeline
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              All changes update the 3D Experience Island immediately and persist in your browser.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {draft.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Milestone 0{idx + 1}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-xs text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  value={item.title}
                  onChange={(e) => updateItem(idx, 'title', e.target.value)}
                  placeholder="Title / Role"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white"
                />
                <input
                  value={item.organization}
                  onChange={(e) => updateItem(idx, 'organization', e.target.value)}
                  placeholder="Organization / University"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white"
                />
                <input
                  value={item.period}
                  onChange={(e) => updateItem(idx, 'period', e.target.value)}
                  placeholder="Period (e.g., 2024 - Present)"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white"
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(idx, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-teal-300 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Milestone
            </button>
            <button
              onClick={() => {
                onResetDefault();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>

          <button
            onClick={() => {
              onSaveExperiences(draft);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg"
          >
            Save Timeline Changes
          </button>
        </div>
      </div>
    </div>
  );
};

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('AI Web Application');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`[Portfolio Enquiry] ${projectType} — from ${name || 'Client'}`);
    const body = encodeURIComponent(
      `Hello Mekha,\n\nName: ${name}\nEmail: ${email}\nInquiry Type: ${projectType}\n\nProject / Role Details:\n${message}`
    );
    window.open(`mailto:${BRAND_DATA.contact.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(BRAND_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-slate-900/95 border border-amber-300/30 text-white p-6 md:p-8 shadow-2xl select-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> Sunset Lighthouse · Contact
            </span>
            <h2 className="text-2xl font-extrabold mt-1">
              Have an Idea? Let&apos;s Build It.
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Send a freelance project brief, startup collaboration, or software engineering role inquiry directly to Mekha M.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Your Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Your Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Collaboration Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'AI Web Application',
                'Full Stack Platform',
                'AI Integration & Automation',
                'Software Engineering Role',
              ].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition cursor-pointer ${
                    projectType === type
                      ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                      : 'bg-slate-950/70 border-white/10 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Project Brief or Message
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your product vision, timeline, or engineering team..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:border-amber-400 outline-none"
            />
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-200 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Email Copied!' : BRAND_DATA.contact.email}</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? 'Opened Mail Client!' : 'Launch Enquiry'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
