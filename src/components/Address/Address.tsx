// src/components/Address/Address.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Address.scss';
import type { AddressProps } from '../../types';

const Address: React.FC<AddressProps> = ({ items }) => {
  return (
    <address className="address">
      <ul className="address__list">
        {items.map((item) => (
          <li className="address__item" key={`${item.value}-${item.href}`}>
            <span className="address__icon" aria-hidden="true">
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
            </span>

            <div className="address__text">
              {item.label && <p className="address__label">{item.label}</p>}

              <a
                className="address__link"
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {item.value}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </address>
  );
};

export default Address;