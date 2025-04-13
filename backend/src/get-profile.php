<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
$userId = $data['user_id'] ?? null;

if (!$userId) {
    echo json_encode(["message" => "User not authenticated"]);
    http_response_code(401);
    exit();
}

// Get user info
$stmt = $conn->prepare("SELECT id, username, email, points, level, role, streak FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if (!$result || $result->num_rows !== 1) {
    echo json_encode(["message" => "User not found"]);
    http_response_code(404);
    exit();
}

$user = $result->fetch_assoc();
$stmt->close();

$badgesStmt = $conn->prepare("
    SELECT b.name, b.description, CONCAT('http://localhost:3000', b.image_url) AS image_url 
    FROM badges b
    JOIN user_badges ub ON b.id = ub.badge_id
    WHERE ub.user_id = ?
");
$badgesStmt->bind_param("i", $userId);
$badgesStmt->execute();
$badgesResult = $badgesStmt->get_result();

$badges = [];
while ($badge = $badgesResult->fetch_assoc()) {
    $badges[] = $badge;
}

$badgesStmt->close();
$conn->close();

echo json_encode([
    "user" => $user,
    "badges" => $badges
]);
















