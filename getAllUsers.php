<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class getAllUsers extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
    }

    public function getAllUsers() {
        $sql = "SELECT * FROM `users` LIMIT 18446744073709551615 OFFSET 1"; // Exclude the first user
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

$getAllUsers = new getAllUsers();

$getAllUsers->getAllUsers();
?>
