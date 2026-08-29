export interface Project {
  id: string;
  name: string;
  iconName: 'sparkles' | 'compass' | 'chart' | 'wand' | 'layers' | 'bot';
  headline: string;
  description: string;
  roleAndYear: string;
  image: string;
  aspectRatio: number;
  url?: string;
}

export const allProjects: Project[] = [
  {
    id: 'aetrixa',
    name: 'Aetrixa',
    iconName: 'sparkles',
    headline: 'Aetrixa 2.0 — Next-Gen Tech Agency Landing Page',
    description: 'High-conversion, dynamic landing page designed and engineered for Aetrixa. Built with Next.js, bespoke AI systems showcase, high-performance web architecture, and modern micro-interactions.',
    roleAndYear: 'Website Designer & Lead, 2026',
    image: '/aetrixa.png',
    aspectRatio: 1.777,
    url: 'https://web-nine-xi-48.vercel.app/',
  },
];

export const featuredProjects = allProjects;
