import { render, screen } from '@testing-library/react';
import Feedback from './Feedback';
import type { FeedbackItem } from '../../types';

const mockFeedback: FeedbackItem[] = [
  {
    feedback: 'Excellent engineer with strong ownership.',
    reporter: {
      name: 'Aruzhan S.',
      photoUrl: 'https://example.com/aruzhan.jpg',
      citeUrl: 'https://linkedin.com/in/aruzhan'
    }
  },
  {
    feedback: 'Delivered features on time and communicated clearly.',
    reporter: {
      name: 'Dias K.',
      photoUrl: 'https://example.com/dias.jpg',
      citeUrl: 'https://github.com/dias'
    }
  }
];

describe('Feedback', () => {
  it('renders feedback text items', () => {
    render(<Feedback data={mockFeedback} />);

    expect(
      screen.getByText('Excellent engineer with strong ownership.')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Delivered features on time and communicated clearly.')
    ).toBeInTheDocument();
  });

  it('renders reporter names', () => {
    render(<Feedback data={mockFeedback} />);

    expect(screen.getByText('Aruzhan S.')).toBeInTheDocument();
    expect(screen.getByText('Dias K.')).toBeInTheDocument();
  });

  it('renders reporter images with alt text', () => {
    render(<Feedback data={mockFeedback} />);

    expect(screen.getByAltText('Aruzhan S.')).toBeInTheDocument();
    expect(screen.getByAltText('Dias K.')).toBeInTheDocument();
  });

  it('renders cite links in shortened form', () => {
    render(<Feedback data={mockFeedback} />);

    expect(screen.getByRole('link', { name: 'linkedin.com/in/aruzhan' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/aruzhan'
    );

    expect(screen.getByRole('link', { name: 'github.com/dias' })).toHaveAttribute(
      'href',
      'https://github.com/dias'
    );
  });

  it('opens cite links in new tab', () => {
    render(<Feedback data={mockFeedback} />);

    expect(screen.getByRole('link', { name: 'linkedin.com/in/aruzhan' })).toHaveAttribute(
      'target',
      '_blank'
    );

    expect(screen.getByRole('link', { name: 'github.com/dias' })).toHaveAttribute(
      'rel',
      'noreferrer'
    );
  });
});