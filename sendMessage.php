<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

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

// Retrieve data from the POST request
$sender = $_POST['sender'];
$receiver = $_POST['receiver'];
$topic = $_POST['topic'];
$message = $_POST['message'];

// Add your logic for validating inputs, handling authentication, etc.

// Prepare and execute the SQL statement
$sql = "INSERT INTO messages (sender, receiver, `title`, `message`) VALUES ('$sender', '$receiver', '$topic', '$message')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();

?>
