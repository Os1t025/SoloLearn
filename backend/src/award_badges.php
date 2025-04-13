<?php
function awardBadges($conn, $userId) {
    $stmt = $conn->prepare("SELECT points FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $points = $user['points'];
    $stmt->close();

    $sql = "
        INSERT INTO user_badges (user_id, badge_id)
        SELECT ?, b.id
        FROM badges b
        LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
        WHERE b.min_points <= ? AND ub.badge_id IS NULL
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $userId, $userId, $points);
    $stmt->execute();
    $stmt->close();
}

