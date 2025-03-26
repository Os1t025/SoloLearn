<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(["message" => "Invalid request method"]);
    http_response_code(405);
    exit();
}

$rawData = file_get_contents("php://input");

if (empty($rawData)) {
    echo json_encode(["message" => "No data received"]);
    http_response_code(400);
    exit();
}

$data = json_decode($rawData, true);

if (!$data) {
    echo json_encode(["message" => "Failed to decode JSON"]);
    http_response_code(400);
    exit();
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["message" => "Email and password are required"]);
    http_response_code(400);
    exit();
}

$sql = "SELECT id, username, email, password FROM users WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($conn->error) {
    echo json_encode(["message" => "An error occurred while querying the database."]);
    http_response_code(500);
    exit();
}

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email']
            ]
        ]);
        http_response_code(200);
    } else {
        echo json_encode(["message" => "Invalid password"]);
        http_response_code(401);
    }
} else {
    echo json_encode(["message" => "No user found with that email"]);
    http_response_code(404);
}

$conn->close();
?>










