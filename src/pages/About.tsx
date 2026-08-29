import React, { useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';
import { Experience } from '../components/Experience';
import { Stack } from '../components/Stack';
import { ConnectCard } from '../components/ConnectCard';

const skills = [
  'Visual Systems',
  'Fast Prototypes',
  'AI-Powered Work',
  'Frontend Detail',
  'Product Thinking',
  'Modern Delivery',
  'Automation Architecture',
  'UI/UX Design',
  'Next.js & React',
];

const educationData = [
  {
    institution: 'Automation Architecture',
    degree: 'n8n & AI Workflow Systems',
    period: '2026',
    letter: 'A',
  },
  {
    institution: 'UI/UX & Product Design',
    degree: 'Design Systems & Conversion',
    period: '2025',
    letter: 'D',
  },
  {
    institution: 'Web & Frontend Development',
    degree: 'Next.js, TypeScript & React',
    period: '2024',
    letter: 'W',
  },
];

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About | Yash Tonde';
  }, []);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* Intro Card */}
      <section className="mx-auto w-full max-w-160 px-6 pt-40 pb-16 sm:px-10 sm:pt-52 sm:pb-24">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3 shadow-sm">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I’m <span className="border-b border-foreground/30 pb-0.5">Yash Tonde</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A <strong className="font-semibold text-foreground">Website Designer & UI/UX Designer</strong> combining design thinking, clean code, and AI-powered workflows.
              </p>
              <p>
                As the founder of <strong className="font-semibold text-foreground">InfusedPath</strong> — an automation builder agency — I help startups and brands launch products faster with end-to-end strategy, intelligent workflows, and high-conversion UI/UX design.
              </p>
              <p>
                Designing modern digital experiences with creativity and scalable growth systems, I eliminate manual operational overhead so founders can <strong className="font-semibold text-foreground">accelerate time-to-market</strong>.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Main Details Section */}
      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn>
          <div className="flex flex-col gap-10">
            {/* Experience */}
            <Experience />

            {/* Education */}
            <div className="flex flex-col gap-3">
              <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
                Education & Focus
              </h3>
              <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
                <ul className="flex flex-col gap-2">
                  {educationData.map((item) => (
                    <li
                      key={item.institution}
                      className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
                      style={{ minHeight: 64 }}
                    >
                      <span
                        className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border"
                        aria-hidden="true"
                        style={{ borderRadius: 14 }}
                      >
                        <span className="text-foreground/60 text-[18px] font-semibold tracking-tight">
                          {item.letter}
                        </span>
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                          {item.institution}
                        </span>
                        <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                          {item.degree}
                          <span className="text-foreground/30 mx-2">•</span>
                          <span className="text-foreground/55">{item.period}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What I do */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                What I do
              </h3>
              <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-3 sm:p-5 dark:bg-foreground/5">
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px] shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stack Physics Container */}
            <Stack />
          </div>
        </FadeIn>
      </section>

      {/* Connect Card */}
      <ConnectCard />

      <div className="h-12 sm:h-16" />
    </main>
  );
};
