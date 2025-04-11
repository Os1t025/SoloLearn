<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include('database.php');

try {
    $sql = "SELECT username, points, level FROM users ORDER BY points DESC";
    $result = $conn->query($sql);

    $leaderboard = [];
    $rank = 1;

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $leaderboard[] = [
                'rank' => $rank++,
                'username' => $row['username'],
                'points' => (int)$row['points'],
                'level' => $row['level']
            ];
        }
    }

    echo json_encode($leaderboard);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}






