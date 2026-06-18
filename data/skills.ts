export interface Skill {
  name: string;
  logo: string;
  glow?: string;
}

export interface SkillTab {
  id: string;
  labelKey: string;
  icon: string;
  items: Skill[];
}

export const skillTabs: SkillTab[] = [
  {
    id: "frontend",
    labelKey: "skills.tab.frontend",
    icon: "code",
    items: [
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        glow: "#f7df1e",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        glow: "#3178c6",
      },
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        glow: "#61dafb",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        glow: "#ffffff",
      },
      {
        name: "Tailwind",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        glow: "#38bdf8",
      },
      {
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        glow: "#e34f26",
      },
      {
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        glow: "#1572b6",
      },
      {
        name: "Kotlin",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        glow: "#7f52ff",
      },
    ],
  },
  {
    id: "backend",
    labelKey: "skills.tab.backend",
    icon: "server",
    items: [
      {
        name: "Spring Boot",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        glow: "#6db33f",
      },
      {
        name: "Django",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        glow: "#092e20",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        glow: "#3776ab",
      },
      {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        glow: "#f89820",
      },
      {
        name: "C#",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        glow: "#68217a",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        glow: "#336791",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        glow: "#47a248",
      },
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        glow: "#00758f",
      },
    ],
  },
  {
    id: "tools",
    labelKey: "skills.tab.tools",
    icon: "wrench",
    items: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        glow: "#f05032",
      },
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        glow: "#2496ed",
      },
      {
        name: "Gradle",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        glow: "#02303a",
      },
      {
        name: "Maven",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
        glow: "#c71a36",
      },
      {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        glow: "#ffca28",
      },
      {
        name: "Jetpack Compose",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        glow: "#3ddc84",
      },
    ],
  },
  {
    id: "design",
    labelKey: "skills.tab.design",
    icon: "palette",
    items: [
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        glow: "#f24e1e",
      },
      {
        name: "UI/UX",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        glow: "#a78bfa",
      },
      {
        name: "Responsive",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        glow: "#38bdf8",
      },
      {
        name: "Tailwind",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        glow: "#38bdf8",
      },
    ],
  },
];

// Legacy export for backward compatibility
export const skillsData = skillTabs.map(function (tab) {
  return {
    title: tab.labelKey,
    items: tab.items,
  };
});
