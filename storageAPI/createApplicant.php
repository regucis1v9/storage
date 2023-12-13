<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class createApplicant extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function hasNoEmptyKeys($array) {
        $nonEmptyValues = array_filter($array, function($value) {
            return $value !== '' && $value !== null;
        });
    
        return count($nonEmptyValues) === count($array);
    }

    public function createApplicant() {
        $decodedData = json_decode($this->rawData, true);

        $personalData = $decodedData['formData'];
        $workExperience = $decodedData['workExperienceData'];

        if ($this->hasNoEmptyKeys($personalData)) {
            $name = $personalData['NAME']; 
            $surname = $personalData['SURNAME']; 
            $email = $personalData["EMAIL"];
            $city = $personalData['CITY']; 
            $job = $personalData['JOB']; 
            $birthDate = $personalData['BIRTH DATE'];
        
            $emailCheck = "SELECT * FROM `applicants` WHERE LOWER(`email`) = LOWER('$email')";
            $emailResult = $this->conn->query($emailCheck);
            if (filter_var($email, FILTER_VALIDATE_EMAIL)  && $emailResult->num_rows == 0) {
                $personSQL = "INSERT INTO `applicants`(`name`, `surname`, `email`, `city`, `job`, `birth_date`) VALUES ('$name', '$surname', '$email', '$city', '$job', '$birthDate')";
                $personResult = $this->conn->query($personSQL);
        
                if ($personResult) {
                    $applicantID = $this->conn->insert_id;
                    echo json_encode(array('message' => 'Applicant inserted', 'last_inserted_id' => $applicantID));
                } else {
                    echo json_encode(array('error' => 'Failed to insert data.'));
                }
        
                if ($this->hasNoEmptyKeys($workExperience)) {
                    foreach ($workExperience as $key => $experience) {
                        $experienceDescription = $experience;
                        $experienceSQL = "INSERT INTO `experiences` (`experience`, `applicantID`) VALUES ('$experienceDescription', '$applicantID')";
                        $experienceResult = $this->conn->query($experienceSQL);

                    }
                }
            } else {
                echo json_encode(array('error' => 'Email invalid or already taken.'));
            }
        } else {
            echo json_encode(['error' => 'Personal data needs to be filled out.']);
        }

    }
}

$createApplicant = new createApplicant();

$createApplicant->createApplicant();
?>