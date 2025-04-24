<?php

use PHPUnit\Framework\TestCase;

class BadgeAwardingTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes badge awarding
        $this->base_url = "http://localhost/award-badges.php";  // Adjust URL if needed
    }

    // Test if the user earns a badge after completing a milestone
    public function testBadgeAwarding()
    {
        // Simulate user being logged in (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate completing a predefined milestone (e.g., completing a lesson)
        $milestone = 'lesson_completed';
        $lesson_id = 101;  // Mock lesson ID

        // Simulate awarding a badge after completing the milestone
        $response = $this->awardBadge($milestone, $lesson_id);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the badge is awarded
        $this->assertEquals('Badge awarded for completing lesson 101', $result['message']);

        // Assert that the badge is displayed on the user's profile (simulated here)
        $this->assertEquals('Python Expert Badge', $result['badge']);

        // Verify that a notification is sent to the user
        $this->assertEquals('You earned the Python Expert Badge!', $result['notification']);
    }

    // Helper method for simulating badge awarding
    private function awardBadge($milestone, $lesson_id)
    {
        // Simulate sending the milestone and lesson ID to the backend to award the badge
        $data = [
            'user_id' => $_SESSION['user_id'],
            'milestone' => $milestone,
            'lesson_id' => $lesson_id
        ];

        // Simulate sending a POST request to award the badge
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

    // Test if the system handles badge awarding when the user is not logged in
    public function testBadgeAwardingWithoutLogin()
    {
        // Simulate user not being logged in
        $_SESSION['logged_in'] = false;

        // Simulate completing a milestone
        $milestone = 'lesson_completed';
        $lesson_id = 101;

        // Attempt to award the badge without being logged in
        $response = $this->awardBadge($milestone, $lesson_id);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error due to lack of login
        $this->assertEquals('User is not logged in', $result['error']);
    }
}
