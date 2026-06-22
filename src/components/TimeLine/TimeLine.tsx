// src/components/TimeLine/TimeLine.tsx
import React from 'react';
import './TimeLine.scss';
import type { TimelineItem } from '../../types';

type TimeLineProps = {
  data: TimelineItem[];
};

const TimeLine: React.FC<TimeLineProps> = ({ data }) => {
  return (
    <div className="timeline" aria-label="Education timeline">
      <ol className="timeline__list">
        {data.map((item, index) => (
          <li className="timeline__item" key={`${item.date}-${index}`}>
            <div className="timeline__date-column">
              <time className="timeline__date" dateTime={String(item.date)}>
                {item.date}
              </time>
              <span className="timeline__line" aria-hidden="true" />
            </div>

            <article className="timeline__card">
              <h3 className="timeline__title">{item.title}</h3>
              <p className="timeline__text">{item.text}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TimeLine;