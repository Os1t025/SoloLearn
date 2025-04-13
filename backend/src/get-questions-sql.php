<?php
// Set the response headers
header('Content-Type: application/json'); // The response will be in JSON format
header('Access-Control-Allow-Origin: *'); // Allow all origins (adjust for production)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Allow specified HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header for requests

// Include the database connection
require_once 'database.php';  // Include the connection to the database

// Fetch the difficulty level from the URL parameter
$level = isset($_GET['level']) ? $_GET['level'] : 'easy'; // Default to 'easy' if not set

// Prepare the SQL query to fetch questions based on difficulty
$sql = "SELECT q.question, q.option_1, q.option_2, q.option_3, q.option_4, q.answer 
        FROM questions q 
        JOIN languages l ON q.language_id = l.id
        WHERE q.difficulty = ? AND l.name = 'SQL'"; // You can change 'SQL' to any language based on the selected language

// Prepare the statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $level); // Bind the difficulty parameter to the query
$stmt->execute();
$result = $stmt->get_result();

// Fetch the results
$questions = [];
while ($row = $result->fetch_assoc()) {
    // Combine options into an array
    $row['options'] = [
        $row['option_1'],
        $row['option_2'],
        $row['option_3'],
        $row['option_4']
    ];

    // Remove the individual option columns
    unset($row['option_1'], $row['option_2'], $row['option_3'], $row['option_4']);
    
    $questions[] = $row; // Store the question with the options as an array
}

// Check if no questions were found and send an error response
if (empty($questions)) {
    echo json_encode(['error' => 'No questions found for the selected difficulty level.']);
} else {
    // Send the questions as a JSON response
    echo json_encode($questions);
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();
?>
