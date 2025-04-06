<?php
require 'database.php';
<?php
/**
 * UPDATE POINTS & USER LEVEL SCRIPT
 *
 * This script updates a user's point total and level based on their activity.
 *
 *  Inputs (via GET):
 *    - user_id: The ID of the user performing an activity.
 *    - activity: The type of activity (e.g., 'lesson', 'quiz').
 *    - score (optional): The score obtained, relevant for quizzes.
 *
 *Functionality:
 *    1. Validates input.
 *    2. Assigns points based on the activity:
 *        - lesson → +10 points
 *        - quiz   → score is directly converted into points (up to 100)
 *    3. Updates the user’s total points in the database.
 *    4. Determines the user's level based on their total points:
 *        - Level 1: < 100 points
 *        - Level 2: ≥ 100 points
 *        - Level 3: ≥ 250 points
 *        - Level 4: ≥ 500 points
 *        - Level 5: ≥ 1000 points
 *    5. Updates the user's level in the database.
 *
 * Output:
 *    - JSON response with message, updated total points, and level ID.
 *
 * ✅ Example Usage:
 *    update-points.php?user_id=3&activity=quiz&score=85
 */

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
