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
  App,
  Test,
  MadeInChina,
  Onlyteez,
  OrderCheck,
  Appaerify,
  Zega,
  StorageAdd,
  StorageEdit,
  Mail,
  AllProducts,
  ManageUsers,
  UserDetails,
  AuthWrapper,
  BackButton,
  LogoutButton
} from './components';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Router>
      <AuthWrapper>
      <BackButton/>
      <LogoutButton/>
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
        <Route path="/darbinieks" element={<App/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/MadeInChina" element={<MadeInChina/>}/>
        <Route path="/Onlyteez" element={<Onlyteez/>}/>
        <Route path="/OrderCheck" element={<OrderCheck/>}/>
        <Route path="/Appaerify" element={<Appaerify/>}/>
        <Route path="/Zega" element={<Zega/>}/>
        <Route path="/StorageAdd" element={<StorageAdd/>}/>
        <Route path="/StorageEdit" element={<StorageEdit/>}/>
        <Route path="/Mail" element={<Mail/>}/>
        <Route path="/AllProducts" element={<AllProducts/>}/>
        <Route path="/ManageUsers" element={<ManageUsers/>}/>
        <Route path="UserDetails/:id" element={<UserDetails/>}/>
      </Routes>
      </AuthWrapper>
    </Router>
  );