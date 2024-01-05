"sCRraA8ZK9ynUbiM"
<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class selectApplicantByID extends DB {


    public function selectApplicantByID() {
        $sql = "SELECT * FROM `experiences` WHERE `applicantID` = $id";
        $result = $this->conn->query($sql);
    
        if ($result) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            echo json_encode(array('error' => 'Failed to retrieve data.'));
        }
    }
    
}

$selectApplicantByID = new selectApplicantByID();

$selectApplicantByID->selectApplicantByID();
?>