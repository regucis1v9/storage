import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const excludedRoutes = ['/', '/login', '/apply'];
  const showBackButton = !excludedRoutes.includes(location.pathname);

  return (
    <div>
      {showBackButton && (
        <button className='BackButton' onClick={() => navigate(-1)}>Go Back</button>
      )}
    </div>
  );
};

export default BackButton;
