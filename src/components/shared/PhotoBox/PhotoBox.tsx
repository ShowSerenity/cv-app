// src/components/PhotoBox/PhotoBox.tsx
import React from 'react';
import './PhotoBox.scss';

type PhotoBoxMode = 'full' | 'panel' | 'compact';

type PhotoBoxProps = {
  name: string;
  title?: string;
  description?: string;
  avatar: string;
  mode?: PhotoBoxMode;
};

const PhotoBox: React.FC<PhotoBoxProps> = ({
  name,
  title,
  description,
  avatar,
  mode = 'panel'
}) => {
  const isFull = mode === 'full';
  const isPanel = mode === 'panel';
  const isCompact = mode === 'compact';

  return (
    <div className={`photo-box photo-box--${mode}`}>
      <div className="photo-box__avatar-wrapper">
        <img className="photo-box__avatar" src={avatar} alt={name} />
      </div>

      {!isCompact && <h1 className="photo-box__name">{name}</h1>}

      {isFull && title && <p className="photo-box__title">{title}</p>}

      {isFull && description && (
        <p className="photo-box__description">{description}</p>
      )}

      {isPanel && title && <p className="photo-box__panel-subtitle">{title}</p>}
    </div>
  );
};

export default PhotoBox;