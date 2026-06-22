// src/components/Panel/Panel.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Panel.scss';
import Button from '../Button/Button';
import PhotoBox from '../PhotoBox/PhotoBox';
import Navigation from '../Navigation/Navigation';
import { navigationItems } from '../../data/navigation';
import { profileData } from '../../data/resume';

type PanelProps = {
  activeItemId: string;
  isOpen: boolean;
  onToggle: () => void;
};

const MOBILE_BREAKPOINT = 768;

const Panel: React.FC<PanelProps> = ({ activeItemId, isOpen, onToggle }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavItemClick = () => {
    if (isMobile) {
      onToggle();
    }
  };

  return (
    <>
      <aside
        className={`panel ${isOpen ? 'panel--open' : 'panel--closed'} ${
          isMobile ? 'panel--mobile' : 'panel--desktop'
        }`}
      >
        <div className="panel__top">
          <PhotoBox
            name={profileData.name}
            title={profileData.title}
            avatar={profileData.avatar}
            mode={isMobile ? 'compact' : 'panel'}
          />
        </div>

        <div className="panel__nav">
          <Navigation
            items={navigationItems}
            activeItemId={activeItemId}
            compact={isMobile}
            onItemClick={handleNavItemClick}
          />
        </div>

        <div className="panel__bottom">
          <Button
            text={isMobile ? '' : 'Go back'}
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            href="/"
            variant="panel"
          />
        </div>
      </aside>

      <button
        type="button"
        className={`panel-toggle ${
          isOpen ? 'panel-toggle--open' : 'panel-toggle--closed'
        } ${isMobile ? 'panel-toggle--mobile' : 'panel-toggle--desktop'}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Collapse navigation panel' : 'Expand navigation panel'}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </>
  );
};

export default Panel;