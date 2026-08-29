import React, { useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ProjectCard } from '../components/ProjectCard';
import { ConnectCard } from '../components/ConnectCard';
import { allProjects } from '../data/projects';

export const Projects: React.FC = () => {
  useEffect(() => {
    document.title = 'Projects | Yash Tonde';
  }, []);

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      {/* Header Section */}
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-56 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Featured work & showcase
          </h1>
          <p className="max-w-[33ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Product launch automations, AI workflows, and modern web systems.
          </p>
        </FadeIn>
      </section>

      {/* Projects Gallery */}
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
          <div className="columns-1 gap-6 md:columns-2 md:gap-7">
            {allProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Card */}
      <ConnectCard />

      <div className="h-12 sm:h-16" />
    </main>
  );
};
