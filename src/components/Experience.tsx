import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Palette } from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  skills: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 'doearno',
    company: 'Doearno',
    role: 'Founding Team Member — Product & Growth Lead',
    period: '2026 – Present',
    icon: (
      <img
        src="/doearno.png"
        alt="Doearno logo"
        className="h-8 w-8 rounded-xl object-contain shadow-2xs"
        draggable={false}
      />
    ),
    description:
      'Spearheading product strategy and growth architecture at Doearno, scaling the platform to 2,000+ active users with high-retention onboarding funnels.',
    highlights: [
      'Managing 2,000+ active users across core product workflows and community growth initiatives.',
      'Driving full-funnel product metrics: acquisition, activation, retention, and viral referral loops.',
      'Leading cross-functional execution between UI/UX design, engineering, and user lifecycle automation.',
    ],
    skills: ['Product Management', 'Growth Lead', '2,000+ Users Scale', 'User Retention', 'Growth Funnels', 'Product Analytics'],
  },
  {
    id: 'funngro-bugbash',
    company: 'Funngro',
    role: 'Bug Bash Expert (Internship)',
    period: 'Apr 2026 – Jul 2026 · 4 mos',
    icon: (
      <img
        src="/funngro.png"
        alt="Funngro logo"
        className="h-8 w-8 rounded-full object-cover shadow-2xs"
        draggable={false}
      />
    ),
    description:
      'Reviewed and validated 1,200+ user-reported bugs on the Bug Bash platform across multiple web and mobile applications.',
    highlights: [
      'Reproduced software issues and verified bug authenticity through systematic testing across edge-case scenarios.',
      'Contributed directly to product quality improvements through accurate, reproducible bug reporting and testing workflows.',
    ],
    skills: ['Bug Bash Expert', 'Bug Tracking', 'Quality Assurance', 'Manual Testing', 'Documentation'],
  },
  {
    id: 'funngro-clanleader',
    company: 'Funngro',
    role: 'Clan Leader (Part-time)',
    period: 'Feb 2026 – Jul 2026 · 6 mos',
    icon: (
      <img
        src="/funngro.png"
        alt="Funngro logo"
        className="h-8 w-8 rounded-full object-cover shadow-2xs"
        draggable={false}
      />
    ),
    description:
      'Led and mentored a community of 1,000+ users throughout project participation, onboarding, and milestone completion.',
    highlights: [
      'Guided 1,000+ members during onboarding and project completion with proactive mentorship and communication.',
      'Resolved user queries rapidly and improved community retention through structured support channels.',
    ],
    skills: ['Communication', 'Team Leadership', 'Community Management', 'Mentorship'],
  },
  {
    id: 'funngro-expert',
    company: 'Funngro',
    role: 'Expert (Part-time)',
    period: 'Mar 2026 – May 2026 · 3 mos',
    icon: (
      <img
        src="/funngro.png"
        alt="Funngro logo"
        className="h-8 w-8 rounded-full object-cover shadow-2xs"
        draggable={false}
      />
    ),
    description:
      'Assisted users by resolving technical and project-related queries, helping them successfully complete client projects.',
    highlights: [
      'Provided expert guidance to ensure members met project deliverables with high quality and on-time delivery.',
      'Ensured a smooth user experience through effective communication and timely problem-solving.',
    ],
    skills: ['Technical Support', 'Problem Solving', 'Project Guidance', 'Communication'],
  },
  {
    id: 'website-designer',
    company: 'Website & UI/UX Design',
    role: 'Designer & Developer',
    period: '2024 – Present',
    icon: (
      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
        <Palette className="h-4 w-4" />
      </span>
    ),
    description:
      'Designing modern digital experiences with creativity, clean code, and AI-powered workflows for high-conversion brands.',
    highlights: [
      'Crafting refined design systems, interactive prototypes, and responsive frontend applications.',
      'Balancing brand storytelling, clean UI language, and polished micro-interactions.',
    ],
    skills: ['UI/UX Design', 'Design Systems', 'Next.js & React', 'Tailwind CSS', 'Framer Motion'],
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('doearno');
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? experienceData : experienceData.slice(0, 4);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Experience
        </h3>
        <span className="text-[12px] text-foreground/50">
          Click any role to explore details
        </span>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2.5">
          {visibleItems.map((item) => {
            const isOpen = expandedId === item.id;

            return (
              <motion.li
                key={item.id}
                layout
                transition={{ duration: 0.35, ease: transitionEase }}
                className={`bg-background border-foreground/5 relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? 'ring-1 ring-foreground/15 shadow-sm'
                    : 'hover:border-foreground/12 hover:bg-background/90'
                }`}
              >
                {/* Header button to expand */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 p-3 text-left sm:p-4 focus:outline-none select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className="ring-foreground/8 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-2xs ring-1 dark:bg-foreground/5 dark:ring-white/10 overflow-hidden"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>

                    <div className="flex min-w-0 flex-col">
                      <span className="text-foreground text-[16px] font-semibold tracking-tight sm:text-[17px] truncate">
                        {item.company}
                      </span>
                      <span className="text-foreground/65 mt-0.5 text-[13px] tracking-tight sm:text-[14px] truncate">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-foreground/50 text-[12px] font-medium tracking-tight sm:text-[13px] hidden xs:inline-block">
                      {item.period}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/4 text-foreground/60 transition-colors"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Detailed Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: transitionEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 border-t border-foreground/6 mt-1">
                        <span className="text-foreground/50 text-[11px] font-medium tracking-tight xs:hidden block mb-2">
                          {item.period}
                        </span>

                        <p className="text-[14px] leading-relaxed text-foreground/80 sm:text-[15px]">
                          {item.description}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="mt-3.5 space-y-1.5 rounded-2xl bg-foreground/2 p-3 sm:p-3.5 border border-foreground/4">
                          <div className="flex items-center gap-1.5 text-[12px] font-medium text-foreground/75 mb-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                            <span>Key Responsibilities & Impact</span>
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {item.highlights.map((h, idx) => (
                              <li
                                key={idx}
                                className="text-[13px] leading-relaxed text-foreground/70 flex items-start gap-2"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 mt-2 shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground/80 border border-foreground/6"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        {experienceData.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="focus-ring text-foreground mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-background/50 py-2.5 text-[13px] font-medium tracking-tight transition-colors hover:bg-background shadow-2xs border border-foreground/5"
          >
            <span>{showAll ? 'Show less' : `Show ${experienceData.length - 4} more experiences`}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                showAll ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};
