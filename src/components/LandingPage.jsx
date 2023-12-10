import React from 'react';
import '../css/App.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate();

    const redirect = () => {
    navigate('/apply');
  };
  return (
    <div className='main'>
      <div className="loginSection">
        <div className="title">THE BEST <span className="highlightTitle">STORAGE SOLUTION</span> YOU WILL FIND</div>
        <div className="button" onClick={redirect}>Get started</div>
      </div>
      <div className="rightSide">
        <div className="triangle">
        </div>
        <div className="square">
          <div className="text">Kreklini</div>
          <img className='logo' src="/images/logo.png" alt="" />
        </div>
      </div>
    </div>
  );
}
export default LandingPage;