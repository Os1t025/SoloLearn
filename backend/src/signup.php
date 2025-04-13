<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'database.php';
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = $data->password;

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["message" => "All fields are required"]);
    exit();
}

$sql_check = "SELECT * FROM users WHERE username = '$username' OR email = '$email'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo json_encode(["message" => "Username or email already exists"]);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>
