import React, { useState } from 'react';
import '../css/Regnars.css';
import Input from './Input';

function Apply() {
  const [formData, setFormData] = useState({
    NAME: '',
    SURNAME: '',
    EMAIL: '',
    CITY: '',
    JOB: '',
    'BIRTH DATE': '',
  });

  const [workExperienceCount, setWorkExperienceCount] = useState(1);
  const [workExperienceData, setWorkExperienceData] = useState({
    [1]: '',
  });

  const [notificationClass, setNotificationClass] = useState('none');

  const handleInputChange = (label, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [label]: value,
    }));
  };

  const handleWorkExperienceChange = (index, value) => {
    setWorkExperienceData((prevData) => ({
      ...prevData,
      [index]: value,
    }));
  };

  const handleApplyClick = async () => {
    try {
      const response = await fetch('http://localhost/storageAPI/createApplicant.php ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, workExperienceData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        if(result['message'] == "Applicant inserted"){
          setNotificationClass();
        }
      } else {
        console.error('Failed to submit data to the server.');
        // Set the class to 'error' to show notification and overlay
      }
    } catch (error) {
      console.error('Error sending data to the server:', error);
      // Set the class to 'error' to show notification and overlay
    }
  };
  const closeAlert = () =>{
    setNotificationClass('none');
  }
  const appendInput = () => {
    setWorkExperienceCount((prevCount) => prevCount + 1);
  };

  const removeInput = () => {
    if (workExperienceCount > 1) {
      setWorkExperienceCount((prevCount) => prevCount - 1);
      setWorkExperienceData((prevData) => {
        const newData = { ...prevData };
        delete newData[workExperienceCount];
        return newData;
      });
    }
  };

  return (
    <div className='applyMain'>
      <div className={`overlay ${notificationClass}`}></div>
      <div className={`notification ${notificationClass}`}>
        You've applied succesfully, we'll get back to you as soon as possible!
        <div className="closeNotification" onClick={closeAlert}>X</div>
      </div>
      <div className="applyContainer">
        <div className="applySection">
          <div className="sectionTitle">PERSONAL INFORMATION</div>
          <Input label="NAME" type="text" onChange={(value) => handleInputChange('NAME', value)} />
          <Input label="SURNAME" type="text" onChange={(value) => handleInputChange('SURNAME', value)} />
          <Input label="EMAIL" type="text" onChange={(value) => handleInputChange('EMAIL', value)} />
          <Input label="CITY" type="text" onChange={(value) => handleInputChange('CITY', value)} />
          <Input label="JOB" type="text" onChange={(value) => handleInputChange('JOB', value)} />
          <Input label="BIRTH DATE" type="date" onChange={(value) => handleInputChange('BIRTH DATE', value)} />
        </div>
        <div className="applySection secondBox" id="experience">
          <div className="sectionTitle">WORK EXPERIENCE</div>
          <div className="experienceInputs">
            {[...Array(workExperienceCount)].map((_, index) => (
              <Input
                key={index}
                label={`Experience ${index + 1}`}
                onChange={(value) => handleWorkExperienceChange(index + 1, value)}
              />
            ))}
          </div>
          <div className="appendButton" onClick={appendInput}>+</div>
          <div className="removeButton" onClick={removeInput}>-</div>
        </div>
        <div className='button' onClick={handleApplyClick}>APPLY</div>
      </div>
    </div>
  );
}

export default Apply;
