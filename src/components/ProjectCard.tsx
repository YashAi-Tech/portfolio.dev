import React from 'react';
import { Sparkles, Compass, LineChart, Wand2, Layers, Bot } from 'lucide-react';
import { Project } from '../data/projects';

const renderIcon = (iconName: Project['iconName']) => {
  switch (iconName) {
    case 'sparkles':
      return <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    case 'compass':
      return <Compass className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    case 'chart':
      return <LineChart className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    case 'wand':
      return <Wand2 className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    case 'layers':
      return <Layers className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    case 'bot':
      return <Bot className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
    default:
      return <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />;
  }
};

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="mb-6 break-inside-avoid md:mb-7">
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            {renderIcon(project.iconName)}
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.name}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.aspectRatio }}
        >
          <div className="project-card__image-inner">
            <img
              src={project.image}
              alt={project.headline}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover select-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.headline}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.roleAndYear}
        </p>
      </article>
    </div>
  );
};
