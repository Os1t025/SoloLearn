-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 13, 2025 at 11:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sololearn`
--

-- --------------------------------------------------------

--
-- Table structure for table `community_posts`
--

CREATE TABLE `community_posts` (
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `Language` varchar(20) NOT NULL,
  `hint` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flashcards`
--

INSERT INTO `flashcards` (`id`, `question`, `answer`, `Language`, `hint`) VALUES
(1, 'What is the keyword to define a function in Python?\r\n', 'def\r\n', 'python', 'It\'s only 3 letters. Starts with \"d\".'),
(2, 'What is the difference between is and == in Python?', '== checks if two values are equal, while is checks if they are the same object in memory.', 'python', 'One checks equality, one checks identity.'),
(3, 'What is the difference between == and .equals() in Java?', '== checks if two object references point to the same memory location, while .equals() checks if the values inside the objects are the same.\r\n\r\n', 'java', 'One is for comparing values, one is a method'),
(4, 'What is a nullable type in C#?', 'A nullable type can represent all the values of its underlying type plus null. You define it with a ?, like int?.\r\n\r\n', 'c#', 'It lets variables hold \"null\" or a value.\r\n'),
(5, 'Python: What is the output of this code?\n\nx = [i*i for i in range(3)]\nprint(x)', '[0, 1, 4]', 'python', ''),
(6, 'Java: Which keyword prevents method overriding?\nA) static\nB) final\nC) abstract\nD) private', 'B) final', 'java', ''),
(7, 'C#: What is the result of the following?\n\nstring s = null;\nConsole.WriteLine(s ?? \"default\");', 'default', 'c#', ''),
(8, 'Python: What error will this code raise?\n\nx = (1, 2, 3)\nx[0] = 99', 'TypeError: \'tuple\' object does not support item assignment', 'python', ''),
(9, 'Java: Which of these allows dynamic method dispatch?\nA) Interface\nB) Abstract Class\nC) Inheritance\nD) All of the above', 'D) All of the above', 'java', ''),
(10, 'C#: Which LINQ method returns the first element that matches a condition?\nA) FirstOrDefault()\nB) Where()\nC) Select()\nD) Take()', 'A) FirstOrDefault()', 'c#', ''),
(11, 'Python: What\'s the output?\n\nprint(\'Python\'[::-1])', 'nohtyP', 'python', ''),
(12, 'Java: What will this print?\n\nint[] arr = {1,2,3};\nSystem.out.println(arr.length);', '3', 'java', ''),
(13, 'C#: In a try-catch-finally block, which block always executes?\nA) try\nB) catch\nC) finally\nD) none', 'C) finally', 'c#', ''),
(14, 'Python: What symbol is used for list comprehension?', '[] (square brackets)', 'python', ''),
(15, 'Java: Which of these is not a primitive data type?\nA) int\nB) float\nC) String\nD) boolean', 'C) String', 'java', ''),
(16, 'C#: What does \'??\' operator do?', 'Returns left operand if not null, else right operand', 'c#', ''),
(17, 'Python Debugging: What tool lets you step through code line-by-line?', 'pdb (Python Debugger)', 'python', ''),
(18, 'Java: What will this print?\n\nSystem.out.println(10 % 3);', '1', 'java', ''),
(19, 'C#: What\'s the result of this?\n\nint? x = null;\nConsole.WriteLine(x ?? 5);', '5', 'c#', ''),
(20, 'Python: What is the output?\n\nprint(\'Hello\' * 2)', 'HelloHello', 'python', ''),
(21, 'Java: Which keyword is used to inherit a class?', 'extends', 'java', ''),
(22, 'C#: Which method converts string to int?\nA) int.Parse()\nB) Convert.ToInt32()\nC) Both A and B\nD) None', 'C) Both A and B', 'c#', ''),
(23, 'Python: What\'s the output?\n\nx = {\'a\':1, \'b\':2}\nprint(x.get(\'c\', 99))', '99', 'python', ''),
(24, 'Python: What is the output?\n\nx = 0\nfor i in range(1, 5):\n    x += i*i\nprint(x)', '30', 'python', ''),
(25, 'Java: What is the output?\n\nint x = 1;\nfor(int i=1; i<=3; i++){\n    x *= i;\n}\nSystem.out.println(x);', '6', 'java', ''),
(26, 'C#: What will this print?\n\nint a = 1, b = 1;\nfor(int i=0; i<4; i++){\n    int temp = b;\n    b = a + b;\n    a = temp;\n}\nConsole.WriteLine(a);', '3', 'c#', ''),
(27, 'Python: What is the output?\n\ndef recur(n):\n    if n == 0:\n        return 1\n    return n * recur(n-1)\nprint(recur(3))', '6', 'python', ''),
(28, 'Java: What is the output?\n\nint sum = 0;\nfor(int i=1; i<=10; i+=2){\n    sum += i;\n}\nSystem.out.println(sum);', '25', 'java', ''),
(29, 'C#: What is the output?\n\nstring s = \"abc\";\nstring result = \"\";\nforeach(var c in s.Reverse()){\n    result += c;\n}\nConsole.WriteLine(result);', 'cba', 'c#', '');

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `rank_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `lesson_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `min_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`level_id`, `level_name`, `description`, `created_at`, `min_points`) VALUES
(1, 'Beginner', 'New learner', '2025-04-05 23:52:00', 0),
(2, 'Intermediate', 'Getting the hang of it', '2025-04-05 23:52:00', 100),
(3, 'Advanced', 'Mastering the concepts', '2025-04-05 23:52:00', 500),
(4, 'Expert', 'Highly skilled in coding', '2025-04-05 23:52:00', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `points_log`
--

CREATE TABLE `points_log` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `points_earned` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT 0,
  `level` int(11) DEFAULT 1,
  `role` enum('User','Mentor','Leader') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `update_user_level` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
    DECLARE new_level INT;
    
    SELECT level_id INTO new_level 
    FROM levels 
    WHERE NEW.points >= min_points 
    ORDER BY min_points DESC 
    LIMIT 1;
    
    UPDATE users SET level = new_level WHERE id = NEW.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `progress_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `quiz_score` int(11) DEFAULT NULL CHECK (`quiz_score` between 0 and 100),
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `points_awarded` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `community_posts`
--
ALTER TABLE `community_posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_name` (`course_name`);

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`rank_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lesson_id`),
  ADD KEY `fk_course` (`course_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`level_id`);

--
-- Indexes for table `points_log`
--
ALTER TABLE `points_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `community_posts`
--
ALTER TABLE `community_posts`
  MODIFY `post_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flashcards`
--
ALTER TABLE `flashcards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `rank_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lesson_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `points_log`
--
ALTER TABLE `points_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `leaderboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `fk_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;

--
-- Constraints for table `points_log`
--
ALTER TABLE `points_log`
  ADD CONSTRAINT `points_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
