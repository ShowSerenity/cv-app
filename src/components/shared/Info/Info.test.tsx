import { render, screen } from '@testing-library/react';
import Info from './Info';

describe('Info', () => {
  it('renders text content', () => {
    render(<Info text="Machine learning engineer and developer." />);

    expect(
      screen.getByText('Machine learning engineer and developer.')
    ).toBeInTheDocument();
  });

  it('applies base class', () => {
    render(<Info text="About me text" />);

    expect(screen.getByText('About me text')).toHaveClass('info');
  });

  it('applies custom class name', () => {
    render(<Info text="Extra styled text" className="info--large" />);

    expect(screen.getByText('Extra styled text')).toHaveClass('info');
    expect(screen.getByText('Extra styled text')).toHaveClass('info--large');
  });
});