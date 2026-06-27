// src/components/Box/Box.tsx
import React from 'react';
import './Box.scss';
import type { BoxProps } from '../../../types';

const Box: React.FC<BoxProps> = ({ title, content, children, className = '' }) => {
  return (
    <section className={`box ${className}`.trim()} aria-labelledby={`box-title-${title}`}>
      <h2 id={`box-title-${title}`} className="box__title">
        {title}
      </h2>

      <div className="box__content">
        {content}
        {children}
      </div>
    </section>
  );
};

export default Box;