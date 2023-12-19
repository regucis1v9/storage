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

$orderId = $_GET['orderId'];

$sql = "SELECT * FROM orders WHERE id = $orderId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $orderDetails = $result->fetch_assoc();
    echo json_encode([$orderDetails]);
} else {
    echo json_encode(['error' => 'Order not found']);
}

$conn->close();

?>
