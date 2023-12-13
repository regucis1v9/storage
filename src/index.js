import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  LandingPage,
  Apply,
  Admin,
  Applicants
} from './components';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/applicants" element={<Applicants />} />
      </Routes>
    </Router>
  );