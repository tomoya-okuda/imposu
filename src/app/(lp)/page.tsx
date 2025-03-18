import { WithContext, WebPage as JsonLDWebPage } from 'schema-dts'

import { Benefits } from '@/components/layout/(lp)/Benefits'
import { FV } from '@/components/layout/(lp)/FV'
import { APP_DESCRIPTION, APP_NAME, home } from '@/components/pageData'
import { getCurrentDate } from '@/lib/dateUtils'

export default function LandingPage() {
  const jsonLd: WithContext<JsonLDWebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${home.metadata.title}`,
    description: `${APP_DESCRIPTION}`,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/imposu-ogp.webp`,
    datePublished: '2025-04-01',
    dateModified: getCurrentDate(),
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    author: {
      '@type': 'Organization',
      name: `${APP_NAME}`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: `${APP_NAME}`,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo/imposu-logo.svg`,
      },
    },
  }

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${APP_NAME}`,
    description: `${APP_DESCRIPTION}`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    logo: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo/imposu-logo.svg`,
    email: 'hello@imposu.com',
  }
  return (
    <>
      <script
        key="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        key="json-ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <FV />
      <Benefits />
    </>
  )
}
