// src/components/Info/Info.tsx
import React from 'react';
import './Info.scss';
import type { InfoProps } from '../../../types';

const Info: React.FC<InfoProps> = ({ text, className = '' }) => {
  return <p className={`info ${className}`.trim()}>{text}</p>;
};

export default Info;