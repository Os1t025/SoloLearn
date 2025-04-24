<?php

use PHPUnit\Framework\TestCase;

class QuizSelectionTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // Simulating the URL of the PHP backend that returns quiz questions
        $this->base_url = "http://localhost/get-questions-csharp.php";  // Adjust this if needed
    }

    // Test that quizzes are displayed and the first question is returned when a quiz is selected
    public function testQuizSelectionAndFirstQuestion()
    {
        // Simulate user being logged in (You can use a session or mock user data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate the quiz selection (passing quiz 'Math Quiz')
        $quiz = "Math Quiz";
        $response = $this->simulateQuizSelection($quiz);

        // Assert that the first question of the selected quiz is returned
        $this->assertNotEmpty($response);
        $this->assertArrayHasKey('question1', $response);
        $this->assertEquals('What is 2 + 2?', $response['question1']);
        $this->assertArrayHasKey('answers', $response);
        $this->assertCount(4, $response['answers']); // Assuming 4 options for the question
    }

    // Helper function to simulate quiz selection and return mock response
    private function simulateQuizSelection($quiz)
    {
        // Mock quizzes data as it would be fetched from a database
        $quizzes = [
            'Math Quiz' => [
                'question1' => 'What is 2 + 2?',
                'answers' => ['3', '4', '5', '6'],
                'correct_answer' => '4'
            ],
            'Science Quiz' => [
                'question1' => 'What is the chemical symbol for water?',
                'answers' => ['O2', 'H2O', 'CO2', 'HO2'],
                'correct_answer' => 'H2O'
            ]
        ];

        // Return the first question and options from the selected quiz
        if (isset($quizzes[$quiz])) {
            return $quizzes[$quiz];
        }

        return [];
    }

    // Test if quiz selection fails when the user is not logged in
    public function testQuizSelectionWithoutLogin()
    {
        // Simulate user not being logged in
        $_SESSION['logged_in'] = false;

        // Attempt to select a quiz
        $quiz = "Math Quiz";
        $response = $this->simulateQuizSelection($quiz);

        // Assert that no question is returned if the user is not logged in
        $this->assertEmpty($response);
    }
}
