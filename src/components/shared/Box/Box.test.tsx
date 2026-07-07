import { render, screen } from '@testing-library/react';
import Box from './Box';

describe('Box', () => {
  it('renders title', () => {
    render(<Box title="Education" />);

    expect(
      screen.getByRole('heading', { name: 'Education', level: 2 })
    ).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Box title="Skills">
        <p>Inner content</p>
      </Box>
    );

    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('renders content prop', () => {
    render(<Box title="About" content={<span>About text</span>} />);

    expect(screen.getByText('About text')).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    const { container } = render(<Box title="Portfolio" className="custom-box" />);

    expect(container.firstChild).toHaveClass('box');
    expect(container.firstChild).toHaveClass('custom-box');
  });

  it('links section to heading through aria-labelledby', () => {
    render(<Box title="Contacts" />);

    const section = screen.getByRole('region', { name: 'Contacts' });
    const heading = screen.getByRole('heading', { name: 'Contacts', level: 2 });

    expect(section).toHaveAttribute('aria-labelledby', heading.id);
  });
});