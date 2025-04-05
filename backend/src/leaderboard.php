<?php
require 'database.php';
/**
 *  Leaderboard
 * - Displays top users ranked by their points.
 * - Can be filtered by time (daily, weekly, all-time) or category.
 * - Useful for fostering competition, recognition, and motivation among users.
 */
$sql = "
    SELECT u.username, u.points, l.level_name
    FROM users u
    LEFT JOIN levels l ON u.level_id = l.level_id
    ORDER BY u.points DESC
    LIMIT 10
";

$result = $conn->query($sql);

$leaderboard = [];

while ($row = $result->fetch_assoc()) {
    $leaderboard[] = [
        'username' => $row['username'],
        'points' => $row['points'],
        'level' => $row['level_name']
    ];
}

header('Content-Type: application/json');
echo json_encode($leaderboard);
?>
