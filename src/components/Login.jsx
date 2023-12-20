import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Regnars.css';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(''); // Clear the error when the user types in the username field
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(''); // Clear the error when the user types in the password field
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

// ... (other imports and code)

const handleLogin = async () => {
    // Validate input fields
    if (!username.trim()) {
      setUsernameError('Username is required');
    }
  
    if (!password.trim()) {
      setPasswordError('Password is required');
    }
  
    // If there are errors, don't proceed with the fetch
    if (usernameError || passwordError) {
      return;
    }
    const data = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:8888/storageAPI/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      // Handle the response from the backend
      const message = responseData.message;
      console.log('Response from backend:', responseData);
  
      if (message === 'Invalid password') {
        setPasswordError(message);
      }else if(message === "User not found"){
        setUsernameError(message);
      }else if(message === "Successfully logged in."){
        Cookies.set('username', responseData.username);
        Cookies.set('token', responseData.token, { expires: 1/24 });
        let redirect = "";
        if( responseData.role === "admin"){
          Cookies.set('role', 'admin', { expires: 1/24 });
          redirect = "admin";
        }else if( responseData.role === "Plauktu kartotajs" ){
          Cookies.set('role', 'kartotajs', { expires: 1/24 });
          redirect = "kartotajs"
        }else if( responseData.role === "Darbinieks" ){
          Cookies.set('role', 'darbinieks', { expires: 1/24 });
          redirect = "darbinieks"
        }
        navigate(`../${redirect}`)
      }
  
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error during fetch:', error);
    }
  };
  

  return (
    <div className='landingMain'>
      <div className="loginSection">
        <div className="title marginNone">LOG IN</div>
        <div className="inputContainer margint65">
          <label className='inputLabel bg1a1a1a'>USERNAME</label>
          <input
            className="input"
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
          <p className='inputError'>{usernameError}</p>
        </div>
        <div className="inputContainer margint65">
          <label className='inputLabel bg1a1a1a'>PASSWORD</label>
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
          <p className='inputError'>{passwordError}</p>
        </div>
        <label className="passwordButton">
          <input
            className='checkbox'
            type="checkbox"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
          Show Password
        </label>
        <button onClick={handleLogin} className='button margint100'>LOG IN</button>
      </div>
      <div className="rightSide">
        <div className="triangle"></div>
        <div className="square">
          <div className="text">Kreklini</div>
          <img className='logo' src="/images/logo.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
