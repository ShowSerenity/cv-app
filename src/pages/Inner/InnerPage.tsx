// src/pages/Inner/InnerPage.tsx
import React, { useEffect, useState } from 'react';
import './InnerPage.scss';
import Panel from '../../components/Panel/Panel';
import Box from '../../components/Box/Box';
import Info from '../../components/Info/Info';
import TimeLine from '../../components/TimeLine/TimeLine';
import Expertise from '../../components/Expertise/Expertise';
import Portfolio from '../../components/Portfolio/Portfolio';
import Address from '../../components/Address/Address';
import Feedback from '../../components/Feedback/Feedback';
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

const MOBILE_BREAKPOINT = 768;

const getInitialIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
const getInitialIsPanelOpen = () => window.innerWidth >= MOBILE_BREAKPOINT;

const InnerPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(getInitialIsMobile);
  const [isPanelOpen, setIsPanelOpen] = useState(getInitialIsPanelOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        onToggle={handleTogglePanel}
      />

      <main className="inner-page__content">
        <h1 className="visually-hidden">John Doe Resume</h1>

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
      </main>
    </div>
  );
};

export default InnerPage;