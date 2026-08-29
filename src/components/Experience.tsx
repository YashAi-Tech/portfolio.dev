import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  slug?: string;
  brand: string;
}

const experienceData: ExperienceEntry[] = [
  { company: 'Linear', role: 'Senior Design Engineer', period: 'Mar 2024 – Present', slug: 'linear', brand: '#5E6AD2' },
  { company: 'Vercel', role: 'Product Designer', period: 'Aug 2022 – Feb 2024', slug: 'vercel', brand: '#0a0a0a' },
  { company: 'Stripe', role: 'Design Engineer', period: 'Jun 2021 – Jul 2022', slug: 'stripe', brand: '#635BFF' },
  { company: 'Figma', role: 'UI Engineer', period: 'Sep 2019 – May 2021', slug: 'figma', brand: '#A259FF' },
  { company: 'Notion', role: 'Product Designer', period: 'Jan 2018 – Aug 2019', slug: 'notion', brand: '#111111' },
  { company: 'Airbnb', role: 'Design Intern', period: 'May 2017 – Dec 2017', slug: 'airbnb', brand: '#FF5A5F' },
  { company: 'Freelance', role: 'Designer & Developer', period: '2015 – 2017', brand: '#0AE448' },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

export const Experience: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const collapsedHeight = 64 * 2 + 8 * 2 + 32; // ~176px
  const remainingCount = experienceData.length - 2;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${
          isExpanded ? 'pb-2 sm:pb-4' : 'pb-0'
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{ height: isExpanded ? 'auto' : collapsedHeight }}
          transition={{ duration: 0.5, ease: transitionEase }}
          style={{ overflow: 'hidden' }}
        >
          <ul className="flex flex-col gap-2">
            {experienceData.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
                style={{ minHeight: 64 }}
              >
                <span
                  className="ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center bg-white ring-1 dark:ring-white/10"
                  aria-hidden="true"
                  style={{
                    borderRadius: 14,
                    ...(item.slug ? {} : { backgroundColor: item.brand }),
                  }}
                >
                  {item.slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${item.slug}`}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-[18px] font-semibold tracking-tight text-white">
                      {item.company.charAt(0)}
                    </span>
                  )}
                </span>

                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {item.company}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {item.role}
                    <span className="text-foreground/30 mx-2">•</span>
                    <span className="text-foreground/55">{item.period}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: 64,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
              }}
            />
          )}
        </AnimatePresence>

        {remainingCount > 0 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${
              isExpanded ? 'relative mt-4' : 'absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4'
            }`}
          >
            {isExpanded ? 'Show less' : `Show ${remainingCount} more`}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
};
