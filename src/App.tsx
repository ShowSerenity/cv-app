// src/app/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import InnerPage from './pages/Inner/InnerPage';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inner" element={<InnerPage />} />
      </Routes>
    </div>
  );
};

export default App;