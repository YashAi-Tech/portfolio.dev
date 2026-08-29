export interface Project {
  id: string;
  name: string;
  iconName: 'sparkles' | 'compass' | 'chart' | 'wand' | 'layers' | 'bot';
  headline: string;
  description: string;
  roleAndYear: string;
  image: string;
  aspectRatio: number;
}

export const allProjects: Project[] = [
  {
    id: 'infusedpath',
    name: 'InfusedPath',
    iconName: 'sparkles',
    headline: 'InfusedPath — Product Launch & Business Automation Agency',
    description: 'An end-to-end automation builder agency helping startups and brands launch products faster through streamlined strategy, workflow automation, and scalable growth systems.',
    roleAndYear: 'Founder & Lead, 2026',
    image: 'https://cdn.dribbble.com/userupload/46128964/file/b92b9d268dd928642ca94bd49e32923a.jpg?resize=752x497&vertical=center',
    aspectRatio: 1.513,
  },
  {
    id: 'infusedpath-cli',
    name: 'InfusedPath CLI Tooling',
    iconName: 'compass',
    headline: 'Custom AI growth agents, automated reporting, and CLI launch tooling ($ infusedpath launch --init).',
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
    id: 'in-progress',
    name: 'New Client Work & Labs',
    iconName: 'bot',
    headline: 'New client work and personal projects currently in development.',
    description: 'Stay tuned for exciting case studies, live project deployments, and open-source automation tools.',
    roleAndYear: 'In Progress, 2026',
    image: 'https://cdn.dribbble.com/userupload/16560717/file/original-c6f745d50302d66609bfe080f99f5396.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
];

export const featuredProjects = allProjects.slice(0, 4);
