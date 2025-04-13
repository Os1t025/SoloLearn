<?php
require 'database.php';

header('Content-Type: application/json');

$sql = "SELECT level_id, level_name, description FROM levels ORDER BY level_id ASC";
$result = $conn->query($sql);

$levels = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $levels[] = $row;
    }
    echo json_encode([
        "success" => true,
        "levels" => $levels
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No levels found."
    ]);
}

$conn->close();
?>