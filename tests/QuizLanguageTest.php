<?php

use PHPUnit\Framework\TestCase;

class QuizLanguageTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes quiz selection
        $this->base_url = "http://localhost/get-questions-python.php";  // Adjust URL if needed
    }

    // Test if the system selects the correct quiz based on language and difficulty
    public function testQuizSelectionByLanguageAndDifficulty()
    {
        // Simulate user being logged in (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate selecting the "Python" quiz with "Medium" difficulty
        $language = 'Python';
        $difficulty = 'medium';

        // Send the quiz selection request
        $response = $this->selectQuiz($language, $difficulty);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the quiz is correctly fetched based on the selected language and difficulty
        $this->assertNotEmpty($result);
        $this->assertEquals('Python', $result['language']);
        $this->assertEquals('medium', $result['difficulty']);
        $this->assertArrayHasKey('questions', $result); // Ensure questions exist
        $this->assertGreaterThan(0, count($result['questions'])); // Ensure there are questions for the quiz
    }

    // Helper method for simulating quiz selection
    private function selectQuiz($language, $difficulty)
    {
        // Simulate sending the language and difficulty to the server to fetch the quiz
        $url = $this->base_url . "?language=" . urlencode($language) . "&difficulty=" . urlencode($difficulty);

        // Simulate sending a GET request to the backend
        return file_get_contents($url);
    }

    // Test if the system handles invalid language or difficulty selections
    public function testInvalidQuizSelection()
    {
        // Simulate user being logged in
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate selecting an invalid quiz language
        $language = 'InvalidLanguage';
        $difficulty = 'medium';

        // Simulate the request to fetch the quiz
        $response = $this->selectQuiz($language, $difficulty);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error for the invalid selection
        $this->assertArrayHasKey('error', $result);
        $this->assertEquals('Invalid language or difficulty selected', $result['error']);
    }
}
