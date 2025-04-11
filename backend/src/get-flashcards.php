<?php
$servername = "localhost";
$username = "root";
$password = "yourpassword"; // Change as needed
$dbname = "SoloLearn";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

header('Content-Type: application/json');

$sql = "SELECT id, question, answer, Language FROM flashcards";
$result = $conn->query($sql);

$flashcards = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $flashcards[] = $row;
    }
}

echo json_encode($flashcards);
$conn->close();
?>
