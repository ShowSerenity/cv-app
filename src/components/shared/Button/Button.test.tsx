import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders button element with text', () => {
    render(<Button text="Click me" />);

    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text="Save" onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders link when href is provided', () => {
    render(<Button text="Open profile" href="/profile" />);

    const link = screen.getByRole('link', { name: 'Open profile' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/profile');
  });

  it('renders disabled button state', () => {
    render(<Button text="Submit" disabled />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('applies full width modifier class', () => {
    render(<Button text="Wide button" fullWidth />);

    expect(screen.getByRole('button', { name: 'Wide button' })).toHaveClass(
      'button--full-width'
    );
  });

  it('renders icon content when icon prop is passed', () => {
    render(
      <Button
        text="Edit"
        icon={<span data-testid="button-icon">icon</span>}
      />
    );

    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });
});