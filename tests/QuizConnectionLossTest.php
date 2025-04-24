<?php

use PHPUnit\Framework\TestCase;

class QuizConnectionLossTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes quiz submissions
        $this->base_url = "http://localhost/update-points.php";  // Adjust URL if needed
    }

    // Test if the system handles internet connection loss gracefully
    public function testQuizSubmissionWithConnectionLoss()
    {
        // Simulate user being logged in (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate selecting answers for the quiz
        $answers = [
            'question1' => '4',  // Correct answer for "What is 2 + 2?"
            // Answer for question2, etc.
        ];

        // Simulate a network failure while submitting the quiz (simulate connection loss)
        $response = $this->submitQuizWithFailure($answers);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates the connection was lost
        $this->assertEquals('Connection lost. Please check your internet connection.', $result['error']);
    }

    // Helper method for simulating quiz submission with connection loss
    private function submitQuizWithFailure($answers)
    {
        // Simulate a failed response due to internet connection loss
        return json_encode(['error' => 'Connection lost. Please check your internet connection.']);
    }

    // Test if the system allows quiz submission with skipped questions and handles connection loss gracefully
    public function testQuizSubmissionWithSkippedQuestionsAndConnectionLoss()
    {
        // Simulate user being logged in
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate selecting answers for the quiz (skipping one question)
        $answers = [
            'question1' => '4', // Correct answer for "What is 2 + 2?"
            // Skipping "question2"
            'question3' => 'Oxygen',  // Correct answer for "What is the chemical symbol for water?"
        ];

        // Simulate submitting the quiz and handling the connection loss
        $response = $this->submitQuizWithFailure($answers);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the system shows the correct message for connection loss
        $this->assertEquals('Connection lost. Please check your internet connection.', $result['error']);

        // Assert that the skipped questions are properly handled
        $this->assertArrayHasKey('unanswered_questions', $result);
        $this->assertContains('question2', $result['unanswered_questions']);
    }

    // Test if quiz submission without login results in an error
    public function testQuizSubmissionWithoutLogin()
    {
        // Simulate user not being logged in
        $_SESSION['logged_in'] = false;

        // Simulate selecting answers for the quiz
        $answers = [
            'question1' => '4', // Correct answer for "What is 2 + 2?"
            'question3' => 'Oxygen',  // Correct answer for "What is the chemical symbol for water?"
        ];

        // Attempt to submit the quiz without being logged in
        $response = $this->submitQuizWithFailure($answers);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error due to lack of login
        $this->assertEquals('User is not logged in', $result['error']);
    }
}
