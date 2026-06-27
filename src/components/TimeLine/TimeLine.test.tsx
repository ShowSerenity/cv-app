import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeLine from './TimeLine';
import type { TimelineItem } from '../../types';

const mockTimelineData: TimelineItem[] = [
  {
    id: '1',
    date: '2020',
    title: 'Bachelor Degree',
    text: 'Studied computer science fundamentals.'
  },
  {
    id: '2',
    date: '2024',
    title: 'Master Degree',
    text: 'Focused on machine learning and AI systems.'
  }
];

describe('TimeLine', () => {
  it('renders loading state', () => {
    render(<TimeLine data={[]} status="loading" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Loading education timeline')
    ).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<TimeLine data={[]} status="failed" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong; please review your server connection!')
    ).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<TimeLine data={[]} status="succeeded" />);

    expect(
      screen.getByText('No education records found.')
    ).toBeInTheDocument();
  });

  it('renders timeline items', () => {
    render(<TimeLine data={mockTimelineData} status="succeeded" />);

    expect(
      screen.getByLabelText('Education timeline')
    ).toBeInTheDocument();

    expect(screen.getByText('Bachelor Degree')).toBeInTheDocument();
    expect(screen.getByText('Master Degree')).toBeInTheDocument();
    expect(
      screen.getByText('Studied computer science fundamentals.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Focused on machine learning and AI systems.')
    ).toBeInTheDocument();
  });

  it('renders dates for timeline items', () => {
    render(<TimeLine data={mockTimelineData} status="succeeded" />);

    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});