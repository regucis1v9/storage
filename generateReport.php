<?php

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

$reportType = $_POST['reportType'];

switch ($reportType) {
    case 'daily':
        $dateFilter = "CURDATE()";
        $reportTitle = "Daily Order Report (" . date('Y-m-d') . ")";
        break;
    case 'weekly':
        $dateFilter = "DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
        $reportTitle = "Weekly Order Report";
        break;
    case 'monthly':
        $dateFilter = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
        $reportTitle = "Monthly Order Report";
        break;
    default:
        $dateFilter = "CURDATE()";
        $reportTitle = "Order Report";
}

$sql = "SELECT * FROM orders WHERE orderDate = $dateFilter";
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
