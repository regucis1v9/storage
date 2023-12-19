<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost";
$username = "root";
$password = "";
$database = "your_database_name";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Send Message
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'send_message') {
    $sender = $_POST['sender'];
    $receiver = $_POST['receiver'];
    $message = $_POST['message'];

    $sql = "INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $sender, $receiver, $message);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['success' => true]);
}

// Get Messages
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_messages') {
    $user = $_GET['user'];

    $sql = "SELECT * FROM messages WHERE receiver = ? OR sender = ? ORDER BY timestamp DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user, $user);
    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    $stmt->close();
    echo json_encode($messages);
}

$conn->close();
?>
