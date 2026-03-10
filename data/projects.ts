import { Project, Service } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern full-stack e-commerce platform with real-time inventory management and secure payments.',
    image: '/projects/ecommerce.jpg',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: '/projects/taskapp.jpg',
    category: 'Web Development',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '3',
    title: 'Brand Design System',
    description: 'A comprehensive design system and component library for enterprise applications.',
    image: '/projects/design.jpg',
    category: 'Design',
    technologies: ['Figma', 'CSS', 'React', 'Storybook'],
    link: 'https://example.com',
  },
  {
    id: '4',
    title: 'AI Chat Interface',
    description: 'An intelligent chatbot interface powered by GPT with natural language processing.',
    image: '/projects/chat.jpg',
    category: 'Web Development',
    technologies: ['Next.js', 'OpenAI', 'Socket.io', 'MongoDB'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '5',
    title: 'Analytics Dashboard',
    description: 'A real-time analytics dashboard with interactive charts and data visualization.',
    image: '/projects/analytics.jpg',
    category: 'Web Development',
    technologies: ['React', 'D3.js', 'Chart.js', 'TypeScript'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '6',
    title: 'Mobile App Design',
    description: 'UI/UX design for a modern fitness tracking mobile application.',
    image: '/projects/mobile.jpg',
    category: 'Design',
    technologies: ['Figma', 'Prototyping', 'User Research'],
    link: 'https://example.com',
  },
]

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices.',
    icon: 'Code2',
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive designs that engage and convert users.',
    icon: 'Palette',
  },
  {
    id: '3',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'Smartphone',
  },
  {
    id: '4',
    title: 'Backend Development',
    description: 'Scalable server-side solutions with databases and APIs.',
    icon: 'Server',
  },
  {
    id: '5',
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed, efficiency, and user experience.',
    icon: 'Zap',
  },
  {
    id: '6',
    title: 'Consulting',
    description: 'Strategic guidance on technology choices and architecture decisions.',
    icon: 'Lightbulb',
  },
]

export const projectCategories = [
  'All',
  'Web Development',
  'Design',
  'Mobile',
]
