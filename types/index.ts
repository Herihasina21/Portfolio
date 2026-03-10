export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  link: string
  github?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
