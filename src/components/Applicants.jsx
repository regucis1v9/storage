
import '../css/Regnars.css';

function Applicants() {
  // Assuming you have an array of applicants with name, city, and desired job
  const applicantsData = [
    { name: 'John Doe', city: 'New York', job: 'Software Engineer' },
    { name: 'Jane Smith', city: 'Los Angeles', job: 'Data Scientist' },
    // Add more applicant data as needed
  ];

  return (
    <div className='applicantMain'>
      <div className="applicantContainer">
        <div className="containerTop">
          <div className="containerIndex">#</div>
          <div className="containerName">NAME</div>
          <div className="containerCity">CITY</div>
          <div className="containerJob">JOB</div>
        </div>
        {applicantsData.map((applicant, index) => (
          <button className="applicantRow" key={index+1}>
            <div className="containerIndex">{index+1}</div>
            <div className="containerName">{applicant.name}</div>
            <div className="containerCity">{applicant.city}</div>
            <div className="containerJob">{applicant.job}</div>
        </button>
        ))}
      </div>
    </div>
  );
}

export default Applicants;
