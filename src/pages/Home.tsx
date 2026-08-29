import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, ScaleUnblur } from '../components/FadeIn';
import { HeroCtas } from '../components/HeroCtas';
import { PortraitMorph } from '../components/PortraitMorph';
import { ProjectCard } from '../components/ProjectCard';
import { ConnectCard } from '../components/ConnectCard';
import { featuredProjects } from '../data/projects';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Yash Tonde — Website Designer & Automation Architect | InfusedPath';
  }, []);

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
            <FadeIn className="flex flex-col gap-4">
              <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
                Hey<span aria-hidden="true" className="mx-0.5">👋</span>, I’m Yash
              </p>
              <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
                <span className="block whitespace-nowrap">A Designer who</span>
                <span className="block whitespace-nowrap">Judges a book...</span>
              </h1>
              <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
                "Because if the cover does not impress you what else can?" Driving app development, product design, and growth at Doearno (2,000+ users).
              </p>
              <HeroCtas />
            </FadeIn>

            <ScaleUnblur className="flex justify-stretch md:justify-end">
              <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                  <PortraitMorph
                    srcA="/josh.webp"
                    srcB="/josh.webp"
                    alt="Yash portrait"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </ScaleUnblur>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative w-full">
        <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Featured work
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From product launch automations to thoughtful web systems, a look at the work I’m proud to have shipped.
            </p>
          </FadeIn>

          <div className="columns-1 gap-6 md:columns-2 md:gap-7">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              to="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 shadow-sm"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Connect Card */}
      <ConnectCard />

      <div className="h-12 sm:h-16" />
    </main>
  );
};
