<?php
require 'database.php';

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
