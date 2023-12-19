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

$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $orders = array();

    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode($orders);
} else {
    echo json_encode(array());
}

$conn->close();
?>
