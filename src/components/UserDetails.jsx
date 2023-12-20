import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Regnars.css';

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState({});
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [notificationClass, setNotificationClass] = useState('none');

  const storedRole = Cookies.get('role');
  const storedUsername = Cookies.get('username');

  useEffect(() => {
    if (storedRole !== 'admin') {
      navigate('../login');
    } else {
      setUsername(storedUsername || ''); // Initialize with an empty string
      setRole(storedRole || ''); // Initialize with an empty string
    }
  }, [navigate, storedRole, storedUsername]);

  const fetchApplicantData = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/selectUsersByID.php?id=${id}`);
      const data = await response.json();
      setApplicantData(data[0] || {});
      console.log('Fetch Applicant Data Response:', data);
      return data[0] || {};
    } catch (error) {
      console.error('Error fetching applicant data:', error);
      return {};
    }
  };

  const handleAcceptClick = async () => {
    const id = applicantData.id;

    try {
      const response = await fetch(`http://localhost:8888/storageAPI/updateUser.php?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          username: username,
          role: role,
        }),
      });
  
      if (response.ok) {
        const accepted = await response.json();
        console.log('Accept Click Response:', accepted);
        setNotificationClass('none'); // Assuming you want to hide the notification on successful update
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleDenyClick = async () => {
    const id = applicantData.id;
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/deleteUser.php?id=${id}`);
      const denied = await response.json();
      console.log('Deny Click Response:', denied);
      if(response.ok){
        navigate('../ManageUsers');
      }
    } catch (error) {
      console.error('Error denying applicant:', error);
    }
  };

  useEffect(() => {
    fetchApplicantData().then(data => {
      setUsername(data.username || '');
      setRole(data.role || '');
    });
  }, [id]);

  const closeAlert = () => {
    setNotificationClass('none');
  };

  return (
    <div className='applyMain'>
      <div className={`overlay ${notificationClass}`}></div>
      <div className={`notification ${notificationClass}`}>
        User updated successfully
        <div className="closeNotification" onClick={closeAlert}>X</div>
      </div>
      <div className="updateContainer">
        <div className="basicDataRow2">
          <label htmlFor="username">Username:</label>
          <input className='input' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="basicDataRow2">
          <label htmlFor="role">Role:</label>
          <select className='input' id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Darbinieks">Darbinieks</option>
            <option value="Plauktu kartotajs">Plauktu kartotajs</option>
          </select>
        </div>
        <button className='acceptUser' onClick={handleAcceptClick}>
          UPDATE
        </button>
        <button className='denyUser' onClick={handleDenyClick}>
          DELETE
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
