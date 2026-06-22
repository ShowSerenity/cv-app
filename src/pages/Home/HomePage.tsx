// src/pages/Home/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import Button from '../../components/Button/Button';
import PhotoBox from '../../components/PhotoBox/PhotoBox';
import { profileData } from '../../data/resume';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleKnowMoreClick = () => {
    navigate('/inner');
  };

  return (
    <section
      className="home-page"
      style={{
        backgroundImage: `linear-gradient(var(--color-overlay), var(--color-overlay)), url(${profileData.heroBackground})`
      }}
    >
      <div className="home-page__content">
        <PhotoBox
          mode="full"
          name={profileData.name}
          title={profileData.title}
          description={profileData.description}
          avatar={profileData.avatar}
        />

        <Button text="Know more" variant="primary" onClick={handleKnowMoreClick} />
      </div>
    </section>
  );
};

export default HomePage;