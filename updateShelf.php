<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "storage";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$orderId = $data->orderId;
$shelf = $data->shelf;

$sql = "UPDATE orders SET shelf = '$shelf' WHERE id = $orderId";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => $conn->error));
}

$conn->close();
?>
