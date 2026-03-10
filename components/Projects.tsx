'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projects, projectCategories } from '@/data/projects'
import type { Project } from '@/types'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      )
    }
  }, [activeCategory])

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'top center',
          toggleActions: 'play none none none',
        },
      }
    )

    // Animate project cards
    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'top center',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [filteredProjects])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-background border border-border text-foreground hover:border-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group rounded-xl overflow-hidden border border-border hover:border-accent/50 bg-background transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300" />
                <div className="text-center relative z-10">
                  <div className="text-4xl font-bold text-accent/30 group-hover:text-accent/50 transition-colors">
                    {project.title.split(' ')[0][0]}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </Button>
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
