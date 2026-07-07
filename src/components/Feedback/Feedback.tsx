// src/components/Feedback/Feedback.tsx
import React from 'react';
import './Feedback.scss';
import type { FeedbackProps } from '../../types';

const Feedback: React.FC<FeedbackProps> = ({ data }) => {
  return (
    <div className="feedback">
      <div className="feedback__list">
        {data.map((item, index) => (
          <figure className="feedback__item" key={`${item.reporter.name}-${index}`}>
            <div className="feedback__card">
              <blockquote className="feedback__quote">
                <p>{item.feedback}</p>
              </blockquote>
            </div>

            <figcaption className="feedback__person">
              <div className="feedback__avatar">
                <img src={item.reporter.photoUrl} alt={item.reporter.name} />
              </div>

              <div className="feedback__meta">
                <p className="feedback__author">{item.reporter.name}</p>
                <a
                  href={item.reporter.citeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="feedback__cite"
                >
                  {item.reporter.citeUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Feedback;