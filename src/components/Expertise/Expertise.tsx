// src/components/Expertise/Expertise.tsx
import React from 'react';
import './Expertise.scss';
import type { ExpertiseItem } from '../../types';

type ExpertiseProps = {
  data: ExpertiseItem[];
};

const Expertise: React.FC<ExpertiseProps> = ({ data }) => {
  return (
    <div className="expertise">
      <ul className="expertise__list">
        {data.map((item, index) => (
          <li className="expertise__item" key={`${item.info.company}-${index}`}>
            <div className="expertise__meta">
              <h3 className="expertise__company">{item.info.company}</h3>
              <p className="expertise__date">{item.date}</p>
            </div>

            <article className="expertise__content">
              <h4 className="expertise__job">{item.info.job}</h4>
              <p className="expertise__description">{item.info.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expertise;