import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import type { SkillItem } from '../../types';

const mockSkills: SkillItem[] = [
  { id: '1', name: 'HTML', range: 100 },
  { id: '2', name: 'CSS', range: 75 },
  { id: '3', name: 'React', range: 60 }
];

describe('Skills', () => {
  it('renders empty state when skills list is empty', () => {
    render(<Skills items={[]} />);

    expect(
      screen.getByText('No skills added yet. Open edit and add your first skill.')
    ).toBeInTheDocument();
  });

  it('renders skills list with provided items', () => {
    render(<Skills items={mockSkills} />);

    expect(screen.getByLabelText('Skills list')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders scale labels', () => {
    render(<Skills items={mockSkills} />);

    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Proficient')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
    expect(screen.getByText('Master')).toBeInTheDocument();
  });

  it('renders bar aria labels with skill level values', () => {
    render(<Skills items={mockSkills} />);

    expect(
      screen.getByLabelText('HTML skill level 100%')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('CSS skill level 75%')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('React skill level 60%')
    ).toBeInTheDocument();
  });
});