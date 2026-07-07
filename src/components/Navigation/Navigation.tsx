// src/components/Navigation/Navigation.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.scss';
import type { NavigationItem } from '../../types';

type NavigationProps = {
  items: NavigationItem[];
  activeItemId: string;
  compact?: boolean;
  onItemClick?: (itemId: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({
  items,
  activeItemId,
  compact = false,
  onItemClick
}) => {
  return (
    <nav className={`navigation ${compact ? 'navigation--compact' : ''}`} aria-label="Resume sections">
      <ul className="navigation__list">
        {items.map((item) => {
          const isActive = item.id === activeItemId;

          return (
            <li key={item.id} className="navigation__item">
              <a
                href={item.href}
                className={`navigation__link ${isActive ? 'navigation__link--active' : ''}`}
                onClick={() => onItemClick?.(item.id)}
              >
                <span className="navigation__icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>

                {!compact && <span className="navigation__label">{item.label}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;