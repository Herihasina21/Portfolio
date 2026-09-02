import { getSiteUrl } from '@/lib/site'
import { SOCIAL_LINKS } from '@/constants/social'

export default function JsonLd() {
  var siteUrl = getSiteUrl()

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Herihasina Michael Rakotoarivony',
    url: siteUrl,
    jobTitle: 'Développeur Fullstack Junior',
    email: 'herihasinamichael@gmail.com',
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Spring Boot',
      'Django',
      'Kotlin',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
