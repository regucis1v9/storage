import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  LandingPage,
  Apply,
  Admin,
  Applicants,
  ApplicantDetails,
  Login,
  KartotajsMain,
  KartotajsMessages,
  KartotajsReports,
  KartotajsStorage,
} from './components';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/applicantdetails/:id" element={<ApplicantDetails />} />
        <Route path="/kartotajs" element={<KartotajsMain />} />
        <Route path="/KartotajsStorage" element={<KartotajsStorage /> } />
        <Route path="/KartotajsReports" element={<KartotajsReports /> } />
        <Route path="/KartotajsMessages" element={<KartotajsMessages /> } />
      </Routes>
    </Router>
  );