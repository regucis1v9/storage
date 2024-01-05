<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "root";
$database = "storage";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$orderId = $data['orderId'];

$sql = "UPDATE orders SET status = 'delivered' WHERE id = ?";

$stmt = $conn->prepare($sql);

$error = false;

$stmt->bind_param("i", $orderId);
if (!$stmt->execute()) {
    $error = true;
}

$stmt->close();
$conn->close();

if (!$error) {
    $response = array('success' => true, 'message' => 'Order status updated successfully');
} else {
    $response = array('success' => false, 'message' => 'Error updating order status');
}

echo json_encode($response);
?>
