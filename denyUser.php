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

    public function sendRejectionEmail($id)
    {
        $this->conn->begin_transaction();

        try {
            // First, select the applicant
            $selectApplicantSql = "SELECT * FROM `applicants` WHERE `id` = $id";
            $result = $this->conn->query($selectApplicantSql);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $recipientEmail = $row['email'];

                // The rest of your email sending code
                $mail = new PHPMailer(true);

                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'ipa21.r.klavins@vtdt.edu.lv';
                $mail->Password   = 'kela wrej zoxi xkns';  // Use your actual App Password here
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;

                $mail->setFrom('ipa21.r.klavins@vtdt.edu.lv', 'Kreklini team');
                $mail->addAddress($recipientEmail);

                $mail->isHTML(true);
                $mail->Subject = 'You\'ve been rejected.';
                $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#1a1a1a;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#d33838;}p{color:#fff}</style></head><body><div class="container"><h1>You\'ve been rejected!</h1><p>After careful consideration, you\'ve been rejected. Better luck next time.</p></div></body></html>';

                $mail->send();

                // After email is sent successfully, delete related records from the 'experiences' table
                $deleteExperiencesSql = "DELETE FROM experiences WHERE `applicantID` = $id";
                $this->conn->query($deleteExperiencesSql);

                // Finally, delete the applicant
                $deleteApplicantSql = "DELETE FROM applicants WHERE `id` = $id";
                $this->conn->query($deleteApplicantSql);

                $this->conn->commit(); // Commit the transaction

                echo json_encode(['status' => 'success', 'message' => 'Rejection email sent successfully']);
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
$emailSender->sendRejectionEmail($id);
?>
