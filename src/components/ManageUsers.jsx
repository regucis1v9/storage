import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Regnars.css';
import Cookies from 'js-cookie';

function ManageUsers() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role');
    if (role !== 'admin') {
      navigate('../login');
    }
  }, [navigate]);

  const [applicantsData, setApplicantsData] = useState([]);

  const fetchApplicantsData = async () => {
    try {
      const response = await fetch('http://localhost:8888/storageAPI/getAllUsers.php');
      const data = await response.json();
      setApplicantsData(data);
    } catch (error) {
      console.error('Error fetching applicants data:', error);
    }
  };

  useEffect(() => {
    fetchApplicantsData();
  }, []); 

  const redirect = (id) => {
    navigate('/userDetails/' + id);
  };

  return (
    <div className='applicantMain'>
      <div className="applicantContainer">
        <div className="usersTop">
          <div className="containerIndex">#</div>
          <div className="userUsername">USERNAME</div>
          <div className="userJob">JOB</div>
        </div>
        {applicantsData.length === 0 ? (
          <div className="noResultsMessage">No results found.</div>
        ) : (
          applicantsData.map((applicant, index) => (
            <button className="applicantRow" key={index + 1} onClick={() => redirect(applicant.id)}>
              <div className="containerIndex">{index + 1}</div>
              <div className="userUsername">{applicant.username}</div>
              <div className="userJob">{applicant.role}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
