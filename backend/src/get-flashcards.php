<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "yourpassword"; // Change as needed 
$dbname = "SoloLearn"; // Ensure this matches your database name

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception('Connection failed: ' . $conn->connect_error);
    }
    
    $conn->set_charset('utf8mb4');
    
    // 1. First try to get hints from database
    $sql = "SELECT id, question, answer, Language, hint 
            FROM flashcards 
            WHERE hint IS NOT NULL AND hint != ''";
    
    $result = $conn->query($sql);
    
    if ($result === false) {
        throw new Exception('Query failed: ' . $conn->error);
    }
    
    $flashcards = [];
    while ($row = $result->fetch_assoc()) {
        $flashcards[] = [
            'id' => $row['id'],
            'question' => trim($row['question']),
            'answer' => trim($row['answer']),
            'Language' => trim($row['Language']),
            'hint' => trim($row['hint'])
        ];
    }
    
    // 2. If no hints exist, generate smart defaults
    if (empty($flashcards)) {
        $fallback = $conn->query("SELECT id, question, answer, Language FROM flashcards");
        while ($row = $fallback->fetch_assoc()) {
            $flashcards[] = [
                'id' => $row['id'],
                'question' => trim($row['question']),
                'answer' => trim($row['answer']),
                'Language' => trim($row['Language']),
                'hint' => generateSmartHint($row['question'], $row['Language'])
            ];
        }
    }
    
    echo json_encode([
        'success' => true,
        'data' => $flashcards,
        'generated_hints' => count($flashcards) - $result->num_rows
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) $conn->close();
}

function generateSmartHint(string $question, string $language): string {
    $language = strtolower($language);
    $keywords = [
        'python' => ['function' => 'def', 'loop' => 'for/while', 'list' => '[]'],
        'java' => ['function' => 'public void', 'loop' => 'for', 'null' => 'Optional'],
        'c#' => ['function' => 'void', 'null' => 'Nullable<T>']
    ];
    
    foreach ($keywords[$language] ?? [] as $term => $hint) {
        if (stripos($question, $term) !== false) {
            return "Consider using: $hint";
        }
    }
    
    return "Review $language syntax for: " . strtok($question, "?");
}
?>
