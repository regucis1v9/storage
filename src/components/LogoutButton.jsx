import Cookies from 'js-cookie';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const excludedRoutes = ['/', '/login', '/apply'];
  const showLogoutButton = !excludedRoutes.includes(location.pathname);

  const handleLogout = async () => {
    // Unset cookies
    Cookies.set('username', '');
    Cookies.set('token', '');
    Cookies.set('role', '');

    // Fetch logout API with the username
    try {
      const username = Cookies.get('username');
      if (username !== '') {
        const response = await fetch(`http://localhost:8888/storageAPI/logout.php?username=${username}`);
        
        // Check if the logout was successful (you might need to adjust based on your API response)
        if (response.ok) {
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      }
    } catch (error) {
      console.error('Error during logout fetch:', error);
    }

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      {showLogoutButton && (
        <button className='LogoutButton' onClick={handleLogout}>Log out</button>
      )}
    </div>
  );
};

export default LogoutButton;
