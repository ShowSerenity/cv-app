import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './InnerPage.scss';
import Panel from '../../components/Panel/Panel';
import Box from '../../components/shared/Box/Box';
import Info from '../../components/shared/Info/Info';
import TimeLine from '../../components/TimeLine/TimeLine';
import Expertise from '../../components/Expertise/Expertise';
import Portfolio from '../../components/Portfolio/Portfolio';
import Address from '../../components/Address/Address';
import Feedback from '../../components/Feedback/Feedback';
import ScrollToTop from '../../components/shared/ScrollToTop/ScrollToTop';

import {
  aboutText,
  contactItems,
  educationItems,
  experienceItems,
  feedbackItems,
  portfolioItems
} from '../../data/resumeSections';

const sectionIds = [
  'about',
  'education',
  'experience',
  'portfolio',
  'contacts',
  'feedback'
];

const InnerPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isFirstRender = useRef(true);
  const [activeSection, setActiveSection] = useState('about');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      setIsPanelOpen(!isMobile);
      isFirstRender.current = false;
    }
  }, [isMobile]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.5, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const handleTogglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const pageStateClass = isPanelOpen
    ? isMobile
      ? 'inner-page--mobile-open'
      : 'inner-page--desktop-open'
    : 'inner-page--closed';

  return (
    <div className={`inner-page ${pageStateClass}`}>
      <Panel
        activeItemId={activeSection}
        isOpen={isPanelOpen}
        isMobile={isMobile}
        onToggle={handleTogglePanel}
      />

      <main className="inner-page__content">
        <h1 className="visually-hidden">Assanali Rymgali Resume</h1>

        <div className="inner-page__container">
          <section id="about" className="inner-page__section">
            <Box title="About me">
              <Info text={aboutText} />
            </Box>
          </section>

          <section id="education" className="inner-page__section">
            <Box title="Education">
              <TimeLine data={educationItems} />
            </Box>
          </section>

          <section id="experience" className="inner-page__section">
            <Box title="Experience">
              <Expertise data={experienceItems} />
            </Box>
          </section>

          <section id="portfolio" className="inner-page__section">
            <Box title="Portfolio">
              <Portfolio items={portfolioItems} />
            </Box>
          </section>

          <section id="contacts" className="inner-page__section">
            <Box title="Contacts">
              <Address items={contactItems} />
            </Box>
          </section>

          <section id="feedback" className="inner-page__section">
            <Box title="Feedbacks">
              <Feedback data={feedbackItems} />
            </Box>
          </section>
        </div>

        <ScrollToTop />
      </main>
    </div>
  );
};

export default InnerPage;