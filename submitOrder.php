<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Read JSON data from the request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$host = "localhost";
$username = "root";
$password = "root";
$database = "storage";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read JSON data from the request
$supplier = $data['supplier'];
$items = $data['items'];

// Define delivery times for each supplier
$deliveryTimes = array(
    "madeinchina" => 10,
    "onlyteez" => 5,
    "appaerify" => 20,
    "zega" => 4,
);

$deliveryTime = $deliveryTimes[strtolower($supplier)];

$error = false;
$kaka = [];
foreach ($items as $item) {
    // Push each item into the $kaka array
    $kaka[] = $item;

    // Insert the data into the database (you should modify this query based on your actual table structure)
    $query = "INSERT INTO orders (supplier, color, size, type, amount, orderDate, deliveryDate, status, shelf)
              VALUES ('$supplier', '{$item['color']}', '{$item['size']}', '{$item['type']}', {$item['amount']}, NOW(), NOW() + INTERVAL $deliveryTime DAY, 'incoming', '');";

    if ($conn->query($query) !== TRUE) {
        $error = true;
        // Handle the error, e.g., log it or send an appropriate response to the client
        echo json_encode(['error' => 'Error inserting data into the database']);
        break;
    }
}

if (!$error) {
    // Close the MySQL connection after all operations are done
    $conn->close();
    
    // Send the response back to the client
    echo json_encode(['data' => $kaka, 'message' => 'Data inserted successfully']);
}
?>
