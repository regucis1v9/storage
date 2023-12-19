<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Replace these database connection details with your actual credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "storage";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch users
$sql = "SELECT id, username FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Convert result to associative array
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Output JSON
    header('Content-Type: application/json');
    echo json_encode($users);
} else {
    echo "No users found";
}

$conn->close();

?>
