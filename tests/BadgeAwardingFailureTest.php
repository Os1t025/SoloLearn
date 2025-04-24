<?php

use PHPUnit\Framework\TestCase;

class BadgeAwardingFailureTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes badge awarding
        $this->base_url = "http://localhost/award-badges.php";  // Adjust URL if needed
    }

    // Test if the system does not award a badge when the milestone is not completed successfully
    public function testNoBadgeAwardedForUnmetCriteria()
    {
        // Simulate user being logged in (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate attempting a milestone (e.g., completing a lesson but not meeting the criteria)
        $milestone = 'lesson_completed';
        $lesson_id = 101;  // Mock lesson ID
        $score = 60;  // Simulate a failing score below the threshold for earning the badge

        // Simulate attempting the milestone but not earning the badge
        $response = $this->attemptMilestone($milestone, $lesson_id, $score);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that no badge is awarded
        $this->assertEquals('No badge awarded. Criteria not met.', $result['message']);
        
        // Assert that suggestions or feedback are provided
        $this->assertEquals('Try retaking the lesson or review the material to improve your score.', $result['suggestions']);
    }

    // Helper method for simulating milestone attempt and response
    private function attemptMilestone($milestone, $lesson_id, $score)
    {
        // Simulate sending the milestone attempt data to the backend
        $data = [
            'user_id' => $_SESSION['user_id'],
            'milestone' => $milestone,
            'lesson_id' => $lesson_id,
            'score' => $score
        ];

        // Simulate sending a POST request to the backend for processing
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
    public function testNoBadgeAwardedWithoutLogin()
    {
        // Simulate user not being logged in
        $_SESSION['logged_in'] = false;

        // Simulate attempting a milestone
        $milestone = 'lesson_completed';
        $lesson_id = 101;

        // Attempt to award the badge without being logged in
        $response = $this->attemptMilestone($milestone, $lesson_id, 85);  // Simulate a passing score

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error due to lack of login
        $this->assertEquals('User is not logged in', $result['error']);
    }
}
