import React, { useState } from 'react';
import Input from './Input';

function Apply() {

  const [formData, setFormData] = useState({
    NAME: '',
    SURNAME: '',
    EMAIL: '',
    CITY: '',
    JOB: '',
    'BIRTH DATE': '',
    letter: ''
  });
  const resetForm = () => {
    setFormData({
      NAME: '',
      SURNAME: '',
      EMAIL: '',
      CITY: '',
      JOB: '',
      'BIRTH DATE': '',
      letter: ''
    });
  }
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cityError, setCityError] = useState('');
  const [jobError, setJobError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [letterError, setLetterError] = useState('');

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

  const handleLetterChange = (event) => {
    const letterValue = event.target.value;
    handleInputChange('letter', letterValue);
  };

  const handleDropdownChange = (value) => {
    handleInputChange('JOB', value);
  };

  const handleApplyClick = async () => {
    let errors = false;

    if(formData.NAME === ''){
      setNameError('This field needs to be filled out');
      errors = true;
    }else{
      setNameError('');
      errors =false;
    }
    if(formData.SURNAME === ''){
      setSurnameError('This field needs to be filled out');
      errors = true;
    }else{
      setSurnameError('');
      errors =false;
    }
    if(formData.EMAIL === ''){
      setEmailError('This field needs to be filled out');
      errors = true;
    }else{
      setEmailError('');
      errors =false;
    }
    if(formData.CITY === ''){
      setCityError('This field needs to be filled out');
      errors = true;
    }else{
      setEmailError('');
      errors =false;
    }
    if(formData.JOB === ''){
      setJobError('This field needs to be filled out');
      errors = true;
    }else{
      setJobError('');
      errors =false;
    }
    if(formData['BIRTH DATE'] === ''){
      setBirthError('This field needs to be filled out');
      errors = true;
    }else{
      setBirthError('');
      errors =false;
    }
    if(formData.letter === ''){
      setLetterError('This field needs to be filled out');
      errors = true;
    }else{
      setLetterError('');
      errors =false;
    }
    if(errors === false){
      try {
      const response = await fetch('http://localhost:8888/storageAPI/createApplicant.php ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, workExperienceData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        if (result['message'] === "Applicant inserted") {
          setNotificationClass();
          resetForm();
          handleInputChange('letter', '')
        }
      } else {
        console.error('Failed to submit data to the server.');
        // Set the class to 'error' to show notification and overlay
      }
    } catch (error) {
      console.error('Error sending data to the server:', error);
      // Set the class to 'error' to show notification and overlay
    }
    }
 
  };

  const closeAlert = () => {
    setNotificationClass('none');
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

  const jobOptions = ['Plauktu kartotajs', 'Darbinieks'];

  return (
    <div className='applyMain'>
      <div className={`overlay ${notificationClass}`}></div>
      <div className={`notification ${notificationClass}`}>
        You've applied successfully, we'll get back to you as soon as possible!
        <div className="closeNotification" onClick={closeAlert}>X</div>
      </div>
      <div className="applyContainer">
        <div className="applySection">
          <div className="sectionTitle">PERSONAL INFORMATION</div>
          <Input label="NAME" type="text" inputValue={formData['NAME']} handleInputChange={(value) => handleInputChange('NAME', value)} />
          <p className='applyError'>{nameError}</p>
          <Input label="SURNAME" type="text" inputValue={formData['SURNAME']} handleInputChange={(value) => handleInputChange('SURNAME', value)} />
          <p className='applyError'>{surnameError}</p>
          <Input label="EMAIL" type="text" inputValue={formData['EMAIL']} handleInputChange={(value) => handleInputChange('EMAIL', value)} />
          <p className='applyError'>{emailError}</p>
          <Input label="CITY" type="text" inputValue={formData['CITY']} handleInputChange={(value) => handleInputChange('CITY', value)} />
          <p className='applyError'>{cityError}</p>
          <Input label="JOB" type="dropdown" inputValue={formData['JOB']} handleInputChange={handleDropdownChange} options={jobOptions} />
          <p className='applyError'>{jobError}</p>
          <Input label="BIRTH DATE" type="date" inputValue={formData['BIRTH DATE']} handleInputChange={(value) => handleInputChange('BIRTH DATE', value)} />
          <p className='applyError'>{birthError}</p>
        </div>
        <div className="applySection secondBox" id="experience">
          <div className="sectionTitle">WORK EXPERIENCE</div>
          <div className="experienceInputs">
            {[...Array(workExperienceCount)].map((_, index) => (
              <Input
                key={index}
                label={`Experience ${index + 1}`}
                inputValue={workExperienceData[index + 1]}
                handleInputChange={(value) => handleWorkExperienceChange(index + 1, value)}
              />
            ))}
          </div>
          <div className="appendButton" onClick={appendInput}>+</div>
          <div className="removeButton" onClick={removeInput}>-</div>
          <div className="sectionTitle">Motivation letter</div>
          <textarea className="motivationLetter" onChange={handleLetterChange}></textarea>
          <p className='letterError'>{letterError}</p>
        </div>
        <div className='button' onClick={handleApplyClick}>APPLY</div>
      </div>
    </div>
  );
}

export default Apply;
