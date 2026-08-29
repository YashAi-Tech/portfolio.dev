import React from 'react';
import { Sparkles, Compass, LineChart, Wand2, Layers, Bot, ArrowUpRight } from 'lucide-react';
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
  const CardContent = (
    <article className="project-card group flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 transition-all duration-300 hover:border-foreground/20 hover:shadow-md">
      <header className="flex items-center justify-between px-1 pt-2">
        <div className="flex items-center gap-2.5">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors group-hover:border-foreground/20">
            {renderIcon(project.iconName)}
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.name}
          </span>
        </div>

        {project.url && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        )}
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
            className="absolute inset-0 h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.02]"
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
  );

  return (
    <div className="mb-6 break-inside-avoid md:mb-7">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline"
          title={`Visit ${project.name}`}
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </div>
  );
};
