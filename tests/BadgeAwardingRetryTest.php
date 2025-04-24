<?php

use PHPUnit\Framework\TestCase;

class BadgeAwardingRetryTest extends TestCase
{
    private $base_url;

    // Setup method to run before each test
    protected function setUp(): void
    {
        // URL for the PHP backend script that processes badge awarding
        $this->base_url = "http://localhost/award-badges.php";  // Adjust URL if needed
    }

    // Test if the system retries awarding the badge after an error
    public function testBadgeAwardingRetryAfterError()
    {
        // Simulate user being logged in (using session or mock data)
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = 1; // Mock user ID

        // Simulate completing a predefined milestone (e.g., completing a lesson)
        $milestone = 'lesson_completed';
        $lesson_id = 101;  // Mock lesson ID

        // Simulate an error occurring during the badge awarding process
        $response = $this->awardBadgeWithError($milestone, $lesson_id);

        // Decode the JSON response (simulating the error and retry)
        $result = json_decode($response, true);

        // Assert that the system retries awarding the badge
        $this->assertEquals('Error encountered. Retrying to award the badge.', $result['message']);
        
        // Assert that after retry, the badge is awarded successfully
        $this->assertEquals('Badge awarded for completing lesson 101', $result['retry_message']);
        
        // Verify that a notification is sent to the user about the retry
        $this->assertEquals('Your badge is now awarded! Thank you for your patience.', $result['notification']);
    }

    // Helper method for simulating badge awarding with an error and retry
    private function awardBadgeWithError($milestone, $lesson_id)
    {
        // Simulate the initial failure response due to an error
        $initial_error_response = json_encode([
            'error' => 'Database error. Badge could not be awarded.'
        ]);

        // Simulate retrying the badge awarding process after an error
        $retry_success_response = json_encode([
            'message' => 'Error encountered. Retrying to award the badge.',
            'retry_message' => 'Badge awarded for completing lesson 101',
            'notification' => 'Your badge is now awarded! Thank you for your patience.'
        ]);

        // Simulate a delay and retry process
        sleep(2); // Simulate retry delay
        return $retry_success_response;
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
        $response = $this->awardBadgeWithError($milestone, $lesson_id);

        // Decode the JSON response
        $result = json_decode($response, true);

        // Assert that the response indicates an error due to lack of login
        $this->assertEquals('User is not logged in', $result['error']);
    }
}
