<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "root";
$database = "storage";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $searchQuery = $_POST["searchQuery"];

    $stmt = $conn->prepare("SELECT * FROM shelved WHERE 
                           color LIKE ? OR
                           size LIKE ? OR
                           type LIKE ? OR
                           amount LIKE ?");
    $searchParam = "%$searchQuery%";
    $stmt->bind_param("ssss", $searchParam, $searchParam, $searchParam, $searchQuery);

    $stmt->execute();
    $result = $stmt->get_result();
    $shirts = [];

    while ($row = $result->fetch_assoc()) {
        $shirts[] = $row;
    }

    $stmt->close();
    $conn->close();

    // Return the result as JSON
    echo json_encode($shirts);
}
?>
