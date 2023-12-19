import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Test from './components/Test.js';
import MadeInChina from './components/MadeInChina.js';
import Onlyteez from './components/Onlyteez.js';
import OrderCheck from './components/OrderCheck.js';
import Appaerify from './components/Appaerify.js';
import Zega from './components/Zega.js';
import StorageAdd from './components/StorageAdd.js';
import StorageEdit from './components/StorageEdit.js';
import Mail from './components/Mail.js';
import AllProducts from './components/AllProducts.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}/>
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
    </Routes>
  </Router>,
  document.getElementById('root')
);