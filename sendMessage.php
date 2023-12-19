<?php

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

// Retrieve data from the POST request
$sender = "YourSenderValue"; // Replace with your actual logic for getting the sender
$receiver = $_POST['receiver'];
$message = $_POST['message'];

// Add your logic for validating inputs, handling authentication, etc.

// Prepare and execute the SQL statement
$sql = "INSERT INTO messages (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')";
if ($conn->query($sql) === TRUE) {
    echo "Message sent successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
