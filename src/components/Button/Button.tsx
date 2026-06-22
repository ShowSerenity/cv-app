// src/components/Button/Button.tsx
import React from 'react';
import './Button.scss';
import type { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  href,
  variant = 'primary',
  fullWidth = false,
  type = 'button'
}) => {
  const className = `button button--${variant} ${fullWidth ? 'button--full-width' : ''}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {icon && <span className="button__icon">{icon}</span>}
        <span className="button__text">{text}</span>
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__text">{text}</span>
    </button>
  );
};

export default Button;