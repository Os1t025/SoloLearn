<?php
$servername = "localhost";
$username = "root";
$password = "Ositopop#23"; // Change as needed
$dbname = "SoloLearn"; // Ensure this matches your database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); 
}
?>

