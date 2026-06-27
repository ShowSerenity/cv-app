// src/pages/Inner/InnerPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchEducations } from '../../features/education/educationSlice';
import {
  clearCreateStatus,
  createSkill,
  fetchSkills
} from '../../features/skills/skillsSlice';
import './InnerPage.scss';
import Panel from '../../components/Panel/Panel';
import Box from '../../components/shared/Box/Box';
import Info from '../../components/shared/Info/Info';
import TimeLine from '../../components/TimeLine/TimeLine';
import Expertise from '../../components/Expertise/Expertise';
import Skills from '../../components/Skills/Skills';
import AddSkillForm from '../../components/AddSkillForm/AddSkillForm';
import Portfolio from '../../components/Portfolio/Portfolio';
import Address from '../../components/Address/Address';
import Feedback from '../../components/Feedback/Feedback';
import ScrollToTop from '../../components/shared/ScrollToTop/ScrollToTop';
import Button from '../../components/shared/Button/Button';

import {
  aboutText,
  contactItems,
  experienceItems,
  feedbackItems,
  portfolioItems
} from '../../data/resumeSections';

const sectionIds = [
  'about',
  'education',
  'experience',
  'skills',
  'portfolio',
  'contacts',
  'feedback'
];

const InnerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isFirstRender = useRef(true);
  const [activeSection, setActiveSection] = useState('about');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);

  const educationItems = useAppSelector((state) =>
    state.education.items.map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title,
      text: item.description
    }))
  );
  const educationStatus = useAppSelector((state) => state.education.status);
  const educationError = useAppSelector((state) => state.education.error);

  const skills = useAppSelector((state) => state.skills.items);
  const skillsStatus = useAppSelector((state) => state.skills.status);
  const createSkillStatus = useAppSelector((state) => state.skills.createStatus);
  const createSkillError = useAppSelector((state) => state.skills.createError);

  useEffect(() => {
    if (educationStatus === 'idle') {
      dispatch(fetchEducations());
    }
  }, [dispatch, educationStatus]);

  useEffect(() => {
    if (skillsStatus === 'idle') {
      dispatch(fetchSkills());
    }
  }, [dispatch, skillsStatus]);

  useEffect(() => {
    if (createSkillStatus === 'succeeded') {
      setIsSkillFormOpen(false);
      dispatch(clearCreateStatus());
    }
  }, [createSkillStatus, dispatch]);

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

  const handleToggleSkillForm = () => {
    setIsSkillFormOpen((prev) => !prev);

    if (createSkillError) {
      dispatch(clearCreateStatus());
    }
  };

  const handleSkillSubmit = async (values: { name: string; range: number }) => {
    await dispatch(createSkill(values)).unwrap();
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
              <TimeLine
                data={educationItems}
                status={educationStatus}
                error={educationError}
              />
            </Box>
          </section>

          <section id="experience" className="inner-page__section">
            <Box title="Experience">
              <Expertise data={experienceItems} />
            </Box>
          </section>

          <section id="skills" className="inner-page__section">
            <Box title="Skills">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    text={isSkillFormOpen ? 'Close edit' : 'Open edit'}
                    variant="dark"
                    onClick={handleToggleSkillForm}
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  />
                </div>

                {isSkillFormOpen ? (
                  <div
                    style={{
                      border: '1px solid rgba(47, 197, 141, 0.9)',
                      padding: '1.1rem 0.9rem 1.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.28)'
                    }}
                  >
                    <AddSkillForm
                      onSubmit={handleSkillSubmit}
                      isSubmittingExternally={createSkillStatus === 'loading'}
                    />
                  </div>
                ) : null}

                {createSkillError ? (
                  <p
                    style={{
                      color: '#d64545',
                      fontSize: '0.95rem',
                      lineHeight: 1.4
                    }}
                  >
                    {createSkillError}
                  </p>
                ) : null}

                <Skills items={skills} />
              </div>
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