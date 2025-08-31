'use client';

import { AnimatedTabs } from '@/components/animated-tabs';
import { NavigationLayout } from '@/components/navigation-layout';
import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import {
  POST_ANIMATIONS,
  RESUME_TAB_ITEMS,
  ResumeViewType,
} from '@/data/constants';
import { resumeItems } from '@/data/navigation';
import { useIsMobile } from '@/hooks/use-media-query';
import { useTabState } from '@/hooks/use-tab-state';
import { getIconComponent } from '@/lib/icon-utils';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ResumePageClient() {
  const isMobile = useIsMobile();

  const {
    activeTab: viewMode,
    isInitialLoad,
    handleTabChange,
    handleValueChange,
  } = useTabState<ResumeViewType>({
    initialValue: ResumeViewType.HTML,
  });

  const tabItems = RESUME_TAB_ITEMS.map((item) => ({
    ...item,
    icon: getIconComponent(item.icon),
  }));

  const handleFilterChange = handleTabChange;

  return (
    <NavigationLayout
      activeFilter={viewMode}
      onFilterChange={handleFilterChange}
      filterCategories={tabItems}
      isResumePage
      searchDisabled
      recentItems={resumeItems}
    >
      <div className="max-w-[1000px] mx-auto px-4 flex gap-4 py-4 md:pb-4 pb-16">
        <div className="flex-1">
          <div className="bg-card p-1 border border-border rounded">
            <AnimatedTabs
              defaultValue={viewMode}
              value={viewMode}
              tabItems={tabItems}
              onValueChange={handleValueChange}
              className="mb-0"
              fullWidth
            >
              {tabItems.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-0"
                />
              ))}
            </AnimatedTabs>
          </div>

          <motion.div
            className="mt-4"
            key={viewMode}
            initial={
              isInitialLoad
                ? POST_ANIMATIONS.INITIAL_LOAD.initial
                : POST_ANIMATIONS.RESUME_VIEW_CHANGE.getInitial(
                    Math.random() > 0.5 ? -50 : 50
                  )
            }
            animate={
              isInitialLoad
                ? POST_ANIMATIONS.INITIAL_LOAD.animate
                : POST_ANIMATIONS.RESUME_VIEW_CHANGE.animate
            }
            transition={POST_ANIMATIONS.RESUME_VIEW_CHANGE.transition}
          >
            {viewMode === ResumeViewType.PDF ? (
              <>
                {isMobile && (
                  <motion.div
                    className="mb-3 text-center"
                    initial={POST_ANIMATIONS.MOBILE_WARNING.initial}
                    animate={POST_ANIMATIONS.MOBILE_WARNING.animate}
                    transition={POST_ANIMATIONS.MOBILE_WARNING.transition}
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      HTML View is recommended for mobile
                    </p>
                  </motion.div>
                )}
                <motion.div
                  className="aspect-[8.5/11] w-full mb-6 rounded-lg overflow-hidden shadow-lg"
                  initial={POST_ANIMATIONS.PDF_IFRAME.initial}
                  animate={POST_ANIMATIONS.PDF_IFRAME.animate}
                  transition={POST_ANIMATIONS.PDF_IFRAME.transition}
                >
                  <iframe
                    src="/jeffreypolasz-resume.pdf#toolbar=0&navpanes=0&view=FitH"
                    className="w-full h-full"
                    title="Resume PDF"
                  />
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={POST_ANIMATIONS.HTML_CONTENT.initial}
                animate={POST_ANIMATIONS.HTML_CONTENT.animate}
                transition={POST_ANIMATIONS.HTML_CONTENT.transition}
              >
                <Card className="p-4 sm:p-6 md:p-8">
                  <section className="mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold mb-1 text-center">
                      Jeffrey Polasz
                    </h2>
                    <div className="flex flex-wrap gap-y-1 text-sm text-gray-700 dark:text-gray-300 justify-center">
                      <p className="text-primary">519-277-5337</p>
                      <span className="px-1">|</span>
                      <p>
                        <Link
                          href="mailto:jeff_polasz@hotmail.com"
                          className="text-primary hover:underline"
                        >
                          jeff_polasz@hotmail.com
                        </Link>
                      </p>
                      <span className="px-1">|</span>
                      <p>
                        <Link
                          href="https://jeffpolasz.com"
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          jeffpolasz.com
                        </Link>
                      </p>
                      <span className="px-1">|</span>
                      <p>
                        <Link
                          href="https://github.com/DigitalEpidemic"
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          github.com/DigitalEpidemic
                        </Link>
                      </p>
                    </div>
                  </section>

                  <section className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold border-b pb-1 mb-3 md:mb-4">
                      Skills
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Languages:</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          C#, JavaScript, TypeScript, HTML, CSS, Java, Ruby,
                          PHP, Python, C++, SQL
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">
                          Frameworks/Libraries:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          React, Vite, React Native, TypeORM, .NET Core, Entity
                          Framework, Tailwind, Node, Electron, Laravel, Ruby on
                          Rails, Jest, Vitest, Playwright, React Testing
                          Library, Vue, Redux, Unity, Unreal Engine
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Tools:</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Docker, SQL Server, PostgreSQL, Xcode, GitHub Actions,
                          JIRA, Confluence, Azure, Firebase, WordPress, Git,
                          Postman, Figma, Adobe Photoshop & Illustrator
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold border-b pb-1 mb-3 md:mb-4">
                      Experience
                    </h3>
                    <div className="space-y-5 md:space-y-6">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                          <h4>
                            <span className="font-medium">Developer</span>,{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              Vehikl - Waterloo, ON
                            </span>
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Sep 2020 - Present
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Optimized .NET Core project&apos;s CI pipeline by
                            splitting long running jobs into several smaller
                            parallel jobs, reducing total CI runtime by 50%
                          </li>
                          <li>
                            Created a GitHub PR Slack bot that combines all 5 of
                            our project&apos;s repositories&apos; open and
                            unreviewed PRs into an organized and scheduled
                            message that gets posted every morning, helping
                            streamline morning standups
                          </li>
                          <li>
                            Implemented a pull request code coverage analysis
                            job that detects if overall coverage has increased
                            or decreased for any open PR on 5 separate projects,
                            improving overall test coverage and reducing
                            regressions
                          </li>
                          <li>
                            Optimized React project&apos;s CI pipeline and test
                            runtime and output by removing 30k lines of output
                            warnings and errors, reducing total CI runtime by
                            33%
                          </li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                          <h4>
                            <span className="font-medium">
                              Unity Game Developer
                            </span>
                            ,{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              Adknown - Guelph, ON
                            </span>
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            May 2019 - Sep 2020
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Designed, developed, and published 21 mobile games
                            on both the Google Play Store and AppStore in 9-day
                            development cycles
                          </li>
                          <li>
                            Built a reusable ad and mission reward system
                            template, improving player retention and reducing
                            integration time across new games
                          </li>
                          <li>
                            Optimized development cycles by creating a
                            standardized process for adding polish to every
                            game, improving the overall look and feel of all our
                            published games
                          </li>
                          <li>
                            Refactored and updated legacy games to comply with
                            AdMob, Google Play, AppStore, and company standards
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                          <h4>
                            <span className="font-medium">
                              Web Developer & Graphic Designer
                            </span>
                            ,{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              Freelance - Cambridge, ON
                            </span>
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Jun 2013 - May 2019
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Developed and maintained 10+ websites for local
                            businesses and start-ups using WordPress and custom
                            solutions
                          </li>
                          <li>
                            Designed a wide variety of logos, comics, tattoos,
                            and graphics for several businesses
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold border-b pb-1 mb-3 md:mb-4">
                      Projects
                    </h3>
                    <div className="space-y-5 md:space-y-6">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h4 className="mb-1 sm:mb-0">
                            <span className="font-medium">
                              AI Voice Translator
                            </span>{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              | Electron, TypeScript, React, Chakra UI
                            </span>
                          </h4>
                          <p className="text-sm text-primary">
                            <Link
                              href="https://github.com/DigitalEpidemic/ai-voice-translator"
                              className="flex items-center hover:underline"
                              target="_blank"
                            >
                              github.com/DigitalEpidemic/ai-voice-translator{' '}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Developed an Electron application that uses AI voice
                            synthesis and transcription to translate your actual
                            voice or a predefined voice into 32 different
                            languages while providing transcriptions and
                            translations for all languages
                          </li>
                          <li>
                            Built to help me communicate more clearly with my
                            non-English-speaking family and friends
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h4 className="mb-1 sm:mb-0">
                            <span className="font-medium">Retro Tool</span>{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              | TypeScript, React, Firebase, Tailwind
                            </span>
                          </h4>
                          <p className="text-sm text-primary">
                            <Link
                              href="https://retro-tool.netlify.app"
                              className="flex items-center hover:underline"
                              target="_blank"
                            >
                              retro-tool.netlify.app{' '}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Developed a real-time collaborative retrospective
                            tool for team feedback and insights with
                            drag-and-drop functionality that allows you to
                            export everything to Markdown
                          </li>
                          <li>
                            Built for my team to reflect, prioritize action
                            items, and track project feedback on a weekly basis
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h4 className="mb-1 sm:mb-0">
                            <span className="font-medium">PowerCalc</span>{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              | TypeScript, React Native
                            </span>
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300"></p>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1.5">
                          <li>
                            Developed a powerlifting mobile application that
                            calculates which plates to add to each side of the
                            barbell, calculates powerlifting-specific formulas
                            to compare strength of lifters with different body
                            weights, and unit conversions
                          </li>
                          <li>
                            Built to optimize my gym routine while training for
                            powerlifting provincials, centrals, and nationals
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg md:text-xl font-semibold border-b pb-1 mb-3 md:mb-4">
                      Education
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h4>
                        <span className="font-medium">Western University</span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">
                          - Major in Computer Science, Minor in Game Development
                        </span>
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Sep 2015 - Jan 2018
                      </p>
                    </div>
                  </section>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </NavigationLayout>
  );
}
