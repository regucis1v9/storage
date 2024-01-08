<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Replace these database connection details with your actual credentials
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "storage";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming the request is a POST request with the shirt ID to be moved
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $shirtId = $_POST['id'];

    // Move the record from orders to shelved
    $moveSql = "INSERT INTO shelved SELECT * FROM orders WHERE id = $shirtId";
    $deleteSql = "DELETE FROM orders WHERE id = $shirtId";

    if ($conn->query($moveSql) === TRUE && $conn->query($deleteSql) === TRUE) {
        echo json_encode(["message" => "Shirt moved successfully"]);
    } else {
        echo json_encode(["error" => "Error moving shirt"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();

?>
