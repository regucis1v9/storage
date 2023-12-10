import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  LandingPage,
  Apply
} from './components';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </Router>
  );