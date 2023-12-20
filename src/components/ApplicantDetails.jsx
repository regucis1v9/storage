import '../css/Regnars.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ApplicantDetails() {

  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role');
    if (role !== 'admin') {
      navigate('../login');
    }
  }, [navigate]);

  const { id } = useParams();
  const [applicantData, setApplicantData] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [notificationClass, setNotificationClass] = useState('none');

  const fetchApplicantData = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/selectApplicantByID.php?id=${id}`);
      const data = await response.json();
      setApplicantData(data[0] || {});
    } catch (error) {
      console.error('Error fetching applicant data:', error);
    }
  };

  const fetchExperienceData = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/selectExperiencesByID.php?id=${id}`);
      const data = await response.json();
      setExperienceData(data || []);
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const handleAcceptClick = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/acceptUser.php?id=${id}`);
      if(response.ok){
        const accepted = await response.json();
        console.log(accepted);
        setNotificationClass();
      }
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleDenyClick = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/denyUser.php?id=${id}`);
      if(response.ok){
        navigate('../Applicants')
      }
    } catch (error) {
      console.error('Error denying applicant:', error);
    }
  };

  const closeAlert = () => {
    setNotificationClass('none');
    navigate('../Applicants')
  };

  useEffect(() => {
    fetchApplicantData();
    fetchExperienceData();
  }, [id]);

  return (
    <div className='applyMain'>
      <div className={`overlay ${notificationClass}`}></div>
      <div className={`notification ${notificationClass}`}>
        Person hired successfully!
        <div className="closeNotification" onClick={closeAlert}>X</div>
      </div>
      <div className="detailContainer">
        <div className="left">
          <div className="basicDataRow">Name: {applicantData.name}</div>
          <div className="basicDataRow">City: {applicantData.city}</div>
          <div className="basicDataRow">Birth date: {applicantData.birth_date}</div>
          <div className="basicDataRow">Desired position: {applicantData.job}</div>
          <div className="applicationLetter">{applicantData?.letter}</div>
        </div>
        <div className="right">
          <div className="buttonContainer">
            <button className='acceptUser' onClick={handleAcceptClick}>
              ACCEPT
            </button>
            <button className='denyUser' onClick={handleDenyClick}>
              DENY
            </button>
          </div>
          <div className="experienceTitle">WORK EXPERIENCE</div>
          {experienceData.map((experience, index) => (
            <div key={index} className="experienceContainer">
              {experience.experience}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetails;
