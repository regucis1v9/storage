<?php
// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Credentials: true");
    exit;
}

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';
require 'db.php';

class AccountUpdateNotifier extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function sendAccountUpdateEmail($id) {
        $this->conn->begin_transaction();

        try {
            $selectUserSql = "SELECT * FROM `users` WHERE `id` = $id";
            $result = $this->conn->query($selectUserSql);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $recipientEmail = $row['email'];

                $decodedData = json_decode($this->rawData, true);
                $username = $decodedData['username'];
                $role = $decodedData['role'];
                $updateUserSql = "UPDATE users SET username = '$username', role = '$role' WHERE id = $id";
                $updateResult = $this->conn->query($updateUserSql);

                // Send email if there are changes
                    $mail = new PHPMailer(true);
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'ipa21.r.klavins@vtdt.edu.lv';
                    $mail->Password   = 'kela wrej zoxi xkns'; 
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port       = 587;
                    $mail->setFrom('ipa21.r.klavins@vtdt.edu.lv', 'Kreklini team');
                    $mail->addAddress($recipientEmail);
                    $mail->isHTML(true);
                    $mail->Subject = 'Notification: Account Update';
                    $mail->Body = "<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#1a1a1a;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#d33838;}p{color:#fff}</style></head><body><div class=\"container\"><h1>Account Update Notification</h1><p>Your account information has been updated.</p><p>New Username: $username</p><p>New Role: $role</p></div></body></html>";
                    $mail->send();


                    $this->conn->commit(); 

                    echo json_encode(['status' => 'success', 'message' => 'Email sent and user data updated successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
            }
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
}

// Example of usage
$db = new DB();
$accountUpdateNotifier = new AccountUpdateNotifier($db->conn);

// Assuming $id is obtained from the link or some other source
$id = $_GET['id'];
$accountUpdateNotifier->sendAccountUpdateEmail($id);
?>

