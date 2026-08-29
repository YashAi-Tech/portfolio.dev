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
    id: 'loom',
    name: 'LOOM',
    iconName: 'sparkles',
    headline: 'An AI writing companion that thinks alongside you, allowing you to capture ideas, edits, and drafts in one focused space.',
    description: 'I designed Loom, a focused writing surface where ideas, edits, and drafts coexist without the chat clutter.',
    roleAndYear: 'Design Engineer, 2024',
    image: 'https://cdn.dribbble.com/userupload/46128964/file/b92b9d268dd928642ca94bd49e32923a.jpg?resize=752x497&vertical=center',
    aspectRatio: 1.513,
  },
  {
    id: 'atlas-studio',
    name: 'Atlas Studio',
    iconName: 'compass',
    headline: 'A two week brand and product sprint for a creative studio.',
    description: 'End to end identity, marketing site, and a small product surface designed to feel quietly confident across every touchpoint.',
    roleAndYear: 'Product & Brand Designer, 2025',
    image: 'https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'rhythm',
    name: 'Rhythm',
    iconName: 'chart',
    headline: 'Calm analytics for indie founders.',
    description: 'A weekly digest that turns raw product data into a simple narrative. Built so you can read it on a Sunday with coffee.',
    roleAndYear: 'Founder & Designer, 2024',
    image: 'https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'groove',
    name: 'Groove',
    iconName: 'wand',
    headline: 'Reimagining the booking flow for a music school, asisting thousands of students in finding the right lessons.',
    description: 'I led a redesign of the lesson booking experience, cutting drop off in half and making the schedule feel like a calendar people actually want to open.',
    roleAndYear: 'Lead Designer, 2023',
    image: 'https://cdn.dribbble.com/userupload/43955214/file/original-d4cde1de803e84b97d8892e3444c04b0.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'fieldnote',
    name: 'Fieldnote',
    iconName: 'layers',
    headline: 'A pocket sized research tool for design teams that want to get out of their docs and into the world.',
    description: 'Capture quotes, tag patterns, and synthesize themes in one place. The interface stays out of the way so the thinking can happen.',
    roleAndYear: 'Design Engineer, 2024',
    image: 'https://cdn.dribbble.com/userupload/30310902/file/original-621e7fe47be9d11ee14544456c693bec.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
  {
    id: 'talkback',
    name: 'Talkback',
    iconName: 'bot',
    headline: 'A friendlier interface for talking to language models.',
    description: 'An exploration of how AI chat could feel less like a terminal and more like a conversation with a curious friend.',
    roleAndYear: 'Independent Project, 2025',
    image: 'https://cdn.dribbble.com/userupload/16560717/file/original-c6f745d50302d66609bfe080f99f5396.png?resize=1024x768&vertical=center',
    aspectRatio: 1.333,
  },
];

export const featuredProjects = allProjects.slice(0, 4);
