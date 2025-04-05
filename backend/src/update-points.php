<?php
require 'database.php';

// Example input: ?user_id=3&activity=quiz&score=85
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
$activity = $_GET['activity'] ?? '';
$score = isset($_GET['score']) ? intval($_GET['score']) : 0;

if ($user_id <= 0 || empty($activity)) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Points assignment based on activity
$points = 0;
switch ($activity) {
    case 'lesson':
        $points = 10;
        break;
    case 'quiz':
        $points = min($score, 100); // Direct quiz score as points
        break;
    default:
        echo json_encode(['error' => 'Unknown activity']);
        exit;
}

// Update points
$updateQuery = "UPDATE users SET points = points + ? WHERE id = ?";
$stmt = $conn->prepare($updateQuery);
$stmt->bind_param("ii", $points, $user_id);
$stmt->execute();

// Determine user level based on updated points
$getPointsQuery = "SELECT points FROM users WHERE id = ?";
$stmt = $conn->prepare($getPointsQuery);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$newLevelId = 1; // Default level
$pointsTotal = $user['points'];

if ($pointsTotal >= 1000) {
    $newLevelId = 5;
} elseif ($pointsTotal >= 500) {
    $newLevelId = 4;
} elseif ($pointsTotal >= 250) {
    $newLevelId = 3;
} elseif ($pointsTotal >= 100) {
    $newLevelId = 2;
}

// Update user level
$levelUpdateQuery = "UPDATE users SET level_id = ? WHERE id = ?";
$stmt = $conn->prepare($levelUpdateQuery);
$stmt->bind_param("ii", $newLevelId, $user_id);
$stmt->execute();

echo json_encode([
    'message' => 'Points and level updated successfully',
    'total_points' => $pointsTotal,
    'level_id' => $newLevelId
]);
?>
