<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

$userId = $input['user_id'] ?? null;
$pointsEarned = $input['points'] ?? 0;
$reason = $input['reason'] ?? 'Quiz Completion';

if (!$userId || $pointsEarned <= 0) {
    echo json_encode(["error" => "Invalid input"]);
    http_response_code(400);
    exit();
}

// Update user points
$update = $conn->prepare("UPDATE users SET points = points + ? WHERE id = ?");
$update->bind_param("ii", $pointsEarned, $userId);
$update->execute();
$update->close();

// Insert into points_log
$log = $conn->prepare("INSERT INTO points_log (user_id, points_earned, reason) VALUES (?, ?, ?)");
$log->bind_param("iis", $userId, $pointsEarned, $reason);
$log->execute();
$log->close();

echo json_encode(["message" => "Points added successfully"]);
$conn->close();

