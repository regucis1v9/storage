<?php
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

class EmailSender
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function sendPasswordResetEmail($id)
    {
        $this->conn->begin_transaction();

        try {
            $selectApplicantSql = "SELECT * FROM `users` WHERE `id` = $id";
            $result = $this->conn->query($selectApplicantSql);
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $recipientEmail = $row['email'];

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
                $mail->Subject = 'Notification: Employment Termination';
                $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#1a1a1a;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#d33838;}p{color:#fff}</style></head><body><div class="container"><h1>Employment Termination Notification</h1><p>We regret to inform you that your employment has been terminated. If you have any queries, please contact HR.</p></div></body></html>';
    
                $mail->send();

                $deleteUserSql = "DELETE FROM users WHERE id = '$id'";
                $deleteResult = $this->conn->query($deleteUserSql);

                $this->conn->commit(); // Commit the transaction

                echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Applicant not found']);
            }
        } catch (Exception $e) {
            $this->conn->rollback(); // Rollback the transaction in case of an exception
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
}

// Example of usage
$db = new DB(); // Assuming you have a DB class for database connection
$emailSender = new EmailSender($db->conn);

// Assuming $id is obtained from the link or some other source
$id = $_GET['id'];
$emailSender->sendPasswordResetEmail($id);
?>
