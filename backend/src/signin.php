<?php
session_start();

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';
require_once 'award_badges.php';

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["message" => "Email and password are required"]);
    http_response_code(400);
    exit();
}

$stmt = $conn->prepare("SELECT id, username, email, password, points, streak FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {

        $updateStreak = $conn->prepare("UPDATE users SET streak = streak + 1 WHERE id = ?");
        $updateStreak->bind_param("i", $user['id']);
        $updateStreak->execute();
        $updateStreak->close();

        $refreshUser = $conn->prepare("SELECT points, streak FROM users WHERE id = ?");
        $refreshUser->bind_param("i", $user['id']);
        $refreshUser->execute();
        $updatedResult = $refreshUser->get_result();
        $updatedData = $updatedResult->fetch_assoc();
        $refreshUser->close();

        awardBadges($conn, $user['id']);

        $_SESSION['username'] = $user['username'];
        $_SESSION['user_id'] = $user['id'];

        echo json_encode([
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "points" => $updatedData['points'],
                "streak" => $updatedData['streak']
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

$stmt->close();
$conn->close();















