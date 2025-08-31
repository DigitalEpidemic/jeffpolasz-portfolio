import ResumePageClient from '@/components/resume-page';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://jeffpolasz.com'),
    title: 'Resume - Jeffrey Polasz',
    description:
      'Resume of Jeffrey Polasz, Full Stack Developer with skills in web applications, software, and game development using React, TypeScript, .NET Core, C#, and Unity',
    authors: [{ name: 'Jeffrey Polasz' }],
    keywords: [
      'Jeffrey Polasz',
      'Resume',
      'Full Stack Developer',
      'React Developer',
      'TypeScript Developer',
      'C# Developer',
      '.NET Core Developer',
      'Unity Developer',
      'Game Developer',
      'Software Engineer',
      'Web Developer',
      'Portfolio',
      'Experience',
      'Skills',
      'Projects',
      'Vehikl',
      'Adknown',
    ].join(','),
    alternates: {
      canonical: 'https://jeffpolasz.com/resume',
    },
    openGraph: {
      title: 'Resume - Jeffrey Polasz',
      description:
        'Resume of Jeffrey Polasz, Full Stack Developer with skills in web applications, software, and game development using React, TypeScript, .NET Core, C#, and Unity',
      images: [
        {
          url: 'https://jeffpolasz.com/opengraph-image.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'Jeffrey Polasz Resume',
        },
      ],
      url: 'https://jeffpolasz.com/resume',
      siteName: 'Jeffrey Polasz Portfolio',
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Resume - Jeffrey Polasz',
      description:
        'Resume of Jeffrey Polasz, Full Stack Developer with skills in web applications, software, and game development using React, TypeScript, .NET Core, C#, and Unity',
      images: [
        {
          url: 'https://jeffpolasz.com/twitter-image.png',
          alt: 'Jeffrey Polasz Resume',
        },
      ],
      creator: '@DigitalEpidemic',
      site: '@DigitalEpidemic',
    },
  };
}

export default function ResumePage() {
  return <ResumePageClient />;
}
