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
  {
    id: 'infusedpath-cli',
    name: 'CLI Tooling & Automations',
    iconName: 'compass',
    headline: 'Custom AI growth agents, automated reporting, and CLI launch tooling ($ launch --init).',
    description: 'Multi-stage launch playbooks, automated waitlists, and campaign event triggers with developer-first CLI tooling.',
    roleAndYear: 'Automation Architect, 2026',
    image: 'https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'full-stack-ecosystem',
    name: 'Full-Stack Ecosystem',
    iconName: 'chart',
    headline: 'Deep integrations across HubSpot CRM, Slack alerts, transactional emails, and real-time analytics.',
    description: 'Architect multi-stage workflow automations connecting CRMs, real-time team alerts, email campaigns, and analytics tracking.',
    roleAndYear: 'Automation Architect, 2026',
    image: 'https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'modern-web-systems',
    name: 'Modern Web Systems',
    iconName: 'wand',
    headline: 'Designing modern digital experiences with creativity, clean code, and AI-powered workflows.',
    description: 'High-conversion UI/UX design and frontend detail combining design thinking, clean code, and polished motion.',
    roleAndYear: 'Website Designer & UI/UX, 2026',
    image: 'https://cdn.dribbble.com/userupload/43955214/file/original-d4cde1de803e84b97d8892e3444c04b0.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'bug-bash',
    name: 'Funngro Bug Bash & QA',
    iconName: 'layers',
    headline: 'Reviewed and validated 1,200+ user-reported bugs across multiple web and mobile applications.',
    description: 'Reproduced software issues and verified bug authenticity through systematic testing with reproducible steps.',
    roleAndYear: 'Bug Bash Expert, 2026',
    image: 'https://cdn.dribbble.com/userupload/30310902/file/original-621e7fe47be9d11ee14544456c693bec.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'labs-in-progress',
    name: 'In Progress Labs',
    iconName: 'bot',
    headline: 'Explorations in WebGL shaders, 2D physics interactions, and autonomous agent workflows.',
    description: 'Interactive canvas experiments, fluid dynamics simulations, and novel interaction primitives.',
    roleAndYear: 'Creative Technologist, 2026',
    image: 'https://cdn.dribbble.com/userupload/46045865/file/857e3f848a60bc4b92b67f1011400d98.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
];

export const featuredProjects = allProjects.slice(0, 4);

