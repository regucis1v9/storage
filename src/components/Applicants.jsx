import React, { useState } from 'react';
import '../css/Regnars.css';

function Applicants() {
  // Assuming you have an array of applicants with name, city, and desired job
  const applicantsData = [
    { name: 'John Doe', city: 'New York', desiredJob: 'Software Engineer' },
    { name: 'Jane Smith', city: 'Los Angeles', desiredJob: 'Data Scientist' },
    // Add more applicant data as needed
  ];

  return (
    <div className='applicantMain'>
      <table className='table'>
        <thead>
          <tr>
            <th className='topRow'>#</th>
            <th className='topRow'>Name</th>
            <th className='topRow'> City</th>
            <th className='topRow'>Desired Job</th>
          </tr>
        </thead>
        <tbody>
          {applicantsData.map((applicant, index) => (
            <tr key={index} className='dataIndex'>
              <td className='dataRow' >{index+1}</td>
              <td className='dataRow'>{applicant.name}</td>
              <td className='dataRow'>{applicant.city}</td>
              <td className='dataRow'>{applicant.desiredJob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applicants;
