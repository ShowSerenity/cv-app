import React, { useEffect, useMemo, useState } from 'react';
import './Portfolio.scss';
import type {
  PortfolioCategory,
  PortfolioItem,
  PortfolioProps
} from '../../types';

const categories: PortfolioCategory[] = ['All', 'Web', 'ML', 'NLP'];

type AnimatedPortfolioItem = PortfolioItem & {
  animationState: 'entered' | 'entering' | 'leaving';
};

const REMOVE_DURATION = 180;
const ADD_DURATION = 180;

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [pendingCategory, setPendingCategory] =
    useState<PortfolioCategory | null>(null);
  const [phase, setPhase] = useState<'idle' | 'removing' | 'adding'>('idle');
  const [visibleItems, setVisibleItems] = useState<AnimatedPortfolioItem[]>(
    items.map((item) => ({
      ...item,
      animationState: 'entered'
    }))
  );

  const getCategoryItems = useMemo(
    () => (category: PortfolioCategory) => {
      if (category === 'All') {
        return items;
      }

      return items.filter((item) => item.category === category);
    },
    [items]
  );

  const activeItems = useMemo(() => {
    return getCategoryItems(activeCategory);
  }, [activeCategory, getCategoryItems]);

  const handleCategoryChange = (category: PortfolioCategory) => {
    if (category === activeCategory || pendingCategory || phase !== 'idle') {
      return;
    }

    const nextItems = getCategoryItems(category);
    const nextIds = new Set(nextItems.map((item) => item.id));

    setPendingCategory(category);
    setPhase('removing');

    setVisibleItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        animationState: nextIds.has(item.id) ? 'entered' : 'leaving'
      }))
    );
  };

  useEffect(() => {
    if (phase !== 'removing' || !pendingCategory) {
      return;
    }

    const removeTimer = window.setTimeout(() => {
      const nextItems = getCategoryItems(pendingCategory);

      setActiveCategory(pendingCategory);
      setVisibleItems(
        nextItems.map((item) => ({
          ...item,
          animationState: activeItems.some((activeItem) => activeItem.id === item.id)
            ? 'entered'
            : 'entering'
        }))
      );
      setPhase('adding');
    }, REMOVE_DURATION);

    return () => {
      window.clearTimeout(removeTimer);
    };
  }, [phase, pendingCategory, activeItems, getCategoryItems]);

  useEffect(() => {
    if (phase !== 'adding') {
      return;
    }

    const addTimer = window.setTimeout(() => {
      setVisibleItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          animationState: 'entered'
        }))
      );
      setPendingCategory(null);
      setPhase('idle');
    }, ADD_DURATION);

    return () => {
      window.clearTimeout(addTimer);
    };
  }, [phase]);

  return (
    <div className="portfolio">
      <div className="portfolio__filters" aria-label="Portfolio categories">
        {categories.map((category, index) => {
          const isActive = category === (pendingCategory ?? activeCategory);

          return (
            <React.Fragment key={category}>
              <button
                type="button"
                className={`portfolio__filter ${
                  isActive ? 'portfolio__filter--active' : ''
                }`}
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>

              {index < categories.length - 1 && (
                <span className="portfolio__separator" aria-hidden="true">
                  /
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="portfolio__grid">
        {visibleItems.map((item) => (
          <article
            className={`portfolio__card portfolio__card--${item.animationState}`}
            key={item.id}
          >
            <div className="portfolio__image-wrapper">
              <img
                className="portfolio__image"
                src={item.image}
                alt={item.title}
              />

              <div className="portfolio__overlay">
                <div className="portfolio__body">
                  <h3 className="portfolio__title">{item.title}</h3>
                  <p className="portfolio__description">{item.description}</p>

                  {item.url ? (
                    <a
                      className="portfolio__link"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View project
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;