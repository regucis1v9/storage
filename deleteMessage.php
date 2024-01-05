<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class selectApplicantByID extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function selectApplicantByID() {
        $id = $_GET['id'];
        $sql = "DELETE FROM `messages` WHERE `id` = '$id'";
        $result = $this->conn->query($sql);
    
        if ($result) {
            echo json_encode(array('success' => 'Data deleted successfully.'));
        } else {
            http_response_code(500); // Set the HTTP response code to indicate a server error
            echo json_encode(array('error' => 'Failed to delete data.'));
        }
    }
}

$selectApplicantByID = new selectApplicantByID();
$selectApplicantByID->selectApplicantByID();
?>
