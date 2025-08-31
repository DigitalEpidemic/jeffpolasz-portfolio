import Script from 'next/script';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  email: string;
  github?: string;
  skills?: string[];
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  email,
  github,
  skills = [],
}: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    email,
    sameAs: github ? [github] : [],
    knowsAbout: skills,
    workLocation: {
      '@type': 'Place',
      name: 'Waterloo, Ontario, Canada',
    },
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface ProjectStructuredDataProps {
  name: string;
  description: string;
  url?: string;
  author: string;
  dateCreated: string;
  programmingLanguage?: string[];
  github?: string;
  image?: string;
}

export function ProjectStructuredData({
  name,
  description,
  url,
  author,
  dateCreated,
  programmingLanguage = [],
  github,
  image,
}: ProjectStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    dateCreated,
    programmingLanguage,
    codeRepository: github,
    image,
    applicationCategory: 'DeveloperApplication',
  };

  return (
    <Script
      id={`project-structured-data-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: string;
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  author,
}: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/?filter={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
