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
            $selectApplicantSql = "SELECT * FROM `applicants` WHERE `id` = $id";
            $result = $this->conn->query($selectApplicantSql);
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $recipientEmail = $row['email'];

                $randomPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 16);
                $this->createNewUser($row['name'], $row['surname'], $row['job'], $randomPassword, $recipientEmail);

                $username = strtolower($row['name'] . '.' . $row['surname']);

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
                $mail->Subject = 'You\'ve been accepted!';
                $mail->Body = '<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;color:#333;}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#1a1a1a;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#d33838;}p{color:#fff}</style></head><body><div class="container"><h1>You\'ve been accepted!</h1><p>Your username: ' . $username . '</p><p>Your password: ' . $randomPassword . '</p></div></body></html>';

                $mail->send();

                // After email is sent successfully, delete related records from the 'experiences' table
                $deleteExperiencesSql = "DELETE FROM experiences WHERE `applicantID` = $id";
                $this->conn->query($deleteExperiencesSql);

                // Finally, delete the applicant
                $deleteApplicantSql = "DELETE FROM applicants WHERE `id` = $id";
                $this->conn->query($deleteApplicantSql);

                $this->conn->commit(); // Commit the transaction

                echo json_encode(['status' => 'success', 'message' => 'Email sent successfully','pass' => "$randomPassword",]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Applicant not found']);
            }
        } catch (Exception $e) {
            $this->conn->rollback(); // Rollback the transaction in case of an exception
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    }

    private function createNewUser($name, $surname, $job, $password, $email){
        $baseUsername = strtolower($name . '.' . $surname);
        $username = $baseUsername;

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        // Check if the username already exists
        $counter = 1;
        while ($this->isUsernameExists($username)) {
            $username = $baseUsername . $counter;
            $counter++;
        }

        // Insert the new user into the database
        $insertSql = "INSERT INTO users (`username`, `password`, `email`, `role`, `token`) VALUES ('$username', '$hashedPassword', '$email', '$job', ' ')";
        $this->conn->query($insertSql);
    }

    private function isUsernameExists($username)
    {
        $checkSql = "SELECT COUNT(*) as count FROM users WHERE `username` = '$username'";
        $result = $this->conn->query($checkSql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['count'] > 0;
        }

        return false;
    }
}

// Example of usage
$db = new DB(); // Assuming you have a DB class for database connection
$emailSender = new EmailSender($db->conn);

// Assuming $id is obtained from the link or some other source
$id = $_GET['id'];
$emailSender->sendPasswordResetEmail($id);
?>
