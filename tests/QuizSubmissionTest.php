<?php

use PHPUnit\Framework\TestCase;

class QuizSubmissionTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes quiz submissions
        $this->base_url = "http://localhost/update-points.php";  // Adjust URL if needed
    }

    // Test if quiz submission works and the score is calculated correctly
    public function testQuizSubmission()
    {
        // Simulate the logged-in user (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate selecting answers for the quiz
        $answers = [
            'question1' => '4',  // Correct answer for "What is 2 + 2?"
        ];

        // Simulate submitting the quiz (send answers to backend and receive score)
        $response = $this->submitQuiz($answers);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the score is calculated correctly (10 points for a correct answer)
        $this->assertEquals(10, $result['score']);
        $this->assertEquals('You scored 10 out of 10', $result['message']);
    }

    // Helper method for sending POST requests to simulate quiz submission
    private function submitQuiz($answers)
    {
        $data = [
            'user_id' => $_SESSION['user_id'],
            'answers' => $answers,
        ];

        $options = [
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n",
                'content' => json_encode($data),
            ],
        ];

        $context  = stream_context_create($options);
        return file_get_contents($this->base_url, false, $context);
    }

    // Test if quiz submission fails when the user is not logged in
    public function testQuizSubmissionWithoutLogin()
    {
        // Simulate user not being logged in
        $_SESSION['logged_in'] = false;

        // Simulate selecting answers for the quiz
        $answers = [
            'question1' => '4',
        ];

        // Attempt to submit the quiz without being logged in
        $response = $this->submitQuiz($answers);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error due to lack of login
        $this->assertEquals('User is not logged in', $result['error']);
    }
}
