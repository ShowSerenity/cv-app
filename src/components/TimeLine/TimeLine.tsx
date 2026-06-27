// src/components/TimeLine/TimeLine.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import './TimeLine.scss';
import type { TimeLineProps } from '../../types';

const ERROR_MESSAGE =
  'Something went wrong; please review your server connection!';

const TimeLine: React.FC<TimeLineProps> = ({
  data,
  status = 'succeeded'
}) => {
  if (status === 'loading') {
    return (
      <div
        className="timeline timeline--state"
        role="status"
        aria-live="polite"
        aria-label="Loading education timeline"
      >
        <div className="timeline__status timeline__status--loading">
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="timeline__spinner-icon"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div
        className="timeline timeline--state"
        role="alert"
        aria-live="assertive"
      >
        <div className="timeline__status timeline__status--error">
          <p className="timeline__status-text">{ERROR_MESSAGE}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="timeline timeline--state" aria-live="polite">
        <div className="timeline__status timeline__status--empty">
          <p className="timeline__status-text">No education records found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline" aria-label="Education timeline">
      <ol className="timeline__list">
        {data.map((item, index) => (
          <li
            className="timeline__item"
            key={item.id ?? `${item.date}-${index}`}
          >
            <div className="timeline__date-column">
              <time className="timeline__date" dateTime={String(item.date)}>
                {item.date}
              </time>
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