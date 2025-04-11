<?php
require 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $userId = intval($_GET['id']);

    // Fetch user basic info
    $userQuery = $conn->prepare("SELECT id, username, email FROM users WHERE id = ?");
    $userQuery->bind_param("i", $userId);
    $userQuery->execute();
    $userResult = $userQuery->get_result();

    if ($userResult->num_rows === 0) {
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    $user = $userResult->fetch_assoc();

    // Fetch progress
    $progressQuery = $conn->prepare("
        SELECT lesson_id, completed, quiz_score, completed_at 
        FROM user_progress WHERE id = ?
    ");
    $progressQuery->bind_param("i", $userId);
    $progressQuery->execute();
    $progressResult = $progressQuery->get_result();
    $progress = $progressResult->fetch_all(MYSQLI_ASSOC);

    // Fetch community posts
    $postsQuery = $conn->prepare("
        SELECT content, created_at FROM community_posts WHERE id = ?
        ORDER BY created_at DESC
    ");
    $postsQuery->bind_param("i", $userId);
    $postsQuery->execute();
    $postsResult = $postsQuery->get_result();
    $posts = $postsResult->fetch_all(MYSQLI_ASSOC);

    // Output user profile
    echo json_encode([
        "user" => $user,
        "progress" => $progress,
        "posts" => $posts
    ]);

} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
