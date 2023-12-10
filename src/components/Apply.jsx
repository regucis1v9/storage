import React, { useState } from 'react';
import '../css/App.css';
import Input from './Input';

function Apply() {
  const [formData, setFormData] = useState({
    NAME: '',
    SURNAME: '',
    CITY: '',
    JOB: '',
    'BIRTH DATE': '',
  });

  const [workExperienceCount, setWorkExperienceCount] = useState(1);
  const [workExperienceData, setWorkExperienceData] = useState({
    [1]: '',
  });

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

  const handleApplyClick = () => {
    console.log('Form Data:', { ...formData, workExperienceData });
    // Add logic to submit or process the form data as needed
  };

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
      <div className="applyContainer">
        <div className="applySection">
          <div className="sectionTitle">PERSONAL INFORMATION</div>
          <Input label="NAME" onChange={(value) => handleInputChange('NAME', value)} />
          <Input label="SURNAME" onChange={(value) => handleInputChange('SURNAME', value)} />
          <Input label="CITY" onChange={(value) => handleInputChange('CITY', value)} />
          <Input label="JOB" onChange={(value) => handleInputChange('JOB', value)} />
          <Input label="BIRTH DATE" onChange={(value) => handleInputChange('BIRTH DATE', value)} />
        </div>
        <div className="applySection" id="experience">
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
