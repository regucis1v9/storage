<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

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

$data = json_decode(file_get_contents("php://input"), true);

$supplier = $data['supplier'];
$items = $data['items'];

// Define delivery times for each supplier
$deliveryTimes = array(
    "madeinchina" => 10,
    "onlyteez" => 5,
    "appaerify" => 20,
    "zega" => 4
);

// Set delivery time based on the supplier
$deliveryTime = $deliveryTimes[strtolower($supplier)]; // Convert supplier name to lowercase

$sql = "INSERT INTO orders (supplier, color, `size`, `type`, amount, orderDate, deliveryDate, status) VALUES (?, ?, ?, ?, ?, NOW(), NOW() + INTERVAL ? DAY, 'incoming')";

$stmt = $conn->prepare($sql);

$error = false;

foreach ($items as $item) {
    $stmt->bind_param("ssssds", $supplier, $item['color'], $item['size'], $item['type'], $item['amount'], $deliveryTime);
    if (!$stmt->execute()) {
        $error = true;
        break;
    }
}

$stmt->close();
$conn->close();

if (!$error) {
    $response = array('success' => true, 'message' => 'Order submitted successfully');
} else {
    $response = array('success' => false, 'message' => 'Error submitting order');
}

echo json_encode($response);
?>
