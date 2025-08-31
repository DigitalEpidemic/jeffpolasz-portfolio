import { ConsoleGreeting } from '@/components/console-greeting';
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from '@/components/structured-data';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  metadataBase: new URL('https://jeffpolasz.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Jeffrey Polasz - Portfolio</title>
        <meta
          name="description"
          content="Full Stack Developer with experience in web applications, software development, and previously in game development."
        />
        <meta name="author" content="Jeffrey Polasz" />
        <meta
          name="keywords"
          content="Jeffrey Polasz,Jeff Polasz,Jeff P,Full Stack Developer,Game Developer,Software Developer,Web Developer,Software Engineer,Developer,Engineer,Programmer,Coder,Frontend,Backend,Game Programming,Game Design,JavaScript,TypeScript,C#,React,Unity,.NET,Portfolio"
        />
        <link rel="canonical" href="https://jeffpolasz.com" />

        <meta property="og:title" content="Jeffrey Polasz - Portfolio" />
        <meta
          property="og:description"
          content="Full Stack Developer of web apps, software, game worlds, and whatever's in the backlog"
        />
        <meta
          property="og:image"
          content="https://jeffpolasz.com/opengraph-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://jeffpolasz.com" />
        <meta property="og:site_name" content="Jeffrey Polasz Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jeffrey Polasz - Portfolio" />
        <meta
          name="twitter:description"
          content="Full Stack Developer of web apps, software, game worlds, and whatever's in the backlog"
        />
        <meta
          name="twitter:image"
          content="https://jeffpolasz.com/twitter-image.png"
        />
        <meta name="twitter:creator" content="@DigitalEpidemic" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} bg-background data-[scroll-locked]:!overflow-visible data-[scroll-locked]:!mr-0`}
      >
        <ConsoleGreeting />
        <PersonStructuredData
          name="Jeffrey Polasz"
          jobTitle="Full Stack Developer"
          description="Full Stack Developer with experience in web applications, software development, and previously in game development."
          url="https://jeffpolasz.com"
          email="jeff_polasz@hotmail.com"
          github="https://github.com/DigitalEpidemic"
          skills={[
            'JavaScript',
            'TypeScript',
            'React',
            'Next.js',
            'C#',
            '.NET Core',
            'Unity',
            'Game Development',
            'Full Stack Development',
            'Software Engineering',
          ]}
        />
        <WebsiteStructuredData
          name="Jeffrey Polasz Portfolio"
          description="Portfolio website of Jeffrey Polasz, Full Stack Developer with experience in web applications, software development, and previously in game development."
          url="https://jeffpolasz.com"
          author="Jeffrey Polasz"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
