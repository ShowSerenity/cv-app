// src/components/Portfolio/Portfolio.tsx
import React, { useMemo, useState } from 'react';
import './Portfolio.scss';
import type { PortfolioCategory, PortfolioProps } from '../../types';

const categories: PortfolioCategory[] = ['All', 'Web', 'ML', 'NLP'];

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="portfolio">
      <div className="portfolio__filters" aria-label="Portfolio categories">
        {categories.map((category, index) => {
          const isActive = category === activeCategory;

          return (
            <React.Fragment key={category}>
              <button
                type="button"
                className={`portfolio__filter ${isActive ? 'portfolio__filter--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
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
        {filteredItems.map((item) => (
          <article className="portfolio__card" key={item.id}>
            <div className="portfolio__image-wrapper">
              <img
                className="portfolio__image"
                src={item.image}
                alt={item.title}
              />
            </div>

            <div className="portfolio__body">
              <p className="portfolio__category">{item.category}</p>
              <h3 className="portfolio__title">{item.title}</h3>
              <p className="portfolio__description">{item.description}</p>

              {item.url && (
                <a
                  className="portfolio__link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;