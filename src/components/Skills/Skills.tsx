// src/components/Skills/Skills.tsx
import React from 'react';
import './Skills.scss';
import type { SkillsProps } from '../../types';

const scaleMarks = [
  { label: 'Beginner', position: '0%' },
  { label: 'Proficient', position: '25%' },
  { label: 'Expert', position: '75%' },
  { label: 'Master', position: '100%' }
];

const Skills: React.FC<SkillsProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="skills skills--empty">
        <p className="skills__empty-text">
          No skills added yet. Open edit and add your first skill.
        </p>
      </div>
    );
  }

  return (
    <div className="skills" aria-label="Skills list">
      <ul className="skills__list">
        {items.map((skill) => (
          <li key={skill.id} className="skills__item">
            <div
              className="skills__bar"
              style={{ width: `${skill.range}%` }}
              aria-label={`${skill.name} skill level ${skill.range}%`}
            >
              <span className="skills__name">{skill.name}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="skills__scale" aria-hidden="true">
        <div className="skills__scale-line" />
        {scaleMarks.map((mark) => (
          <div
            key={mark.label}
            className="skills__scale-mark"
            style={{ left: mark.position }}
          >
            <span className="skills__scale-tick" />
            <span className="skills__scale-label">{mark.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;