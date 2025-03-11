CREATE DATABASE programming_lessons;
USE programming_lessons; 
 
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);    

CREATE TABLE user_progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    lesson_id INT,
    completed BOOLEAN DEFAULT FALSE,
    quiz_score INT CHECK (quiz_score BETWEEN 0 AND 100),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);




CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lessons (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,  -- Ensure it matches the data type in courses
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);


CREATE TABLE quizzes (
    quiz_id INT PRIMARY KEY,
    lesson_id INT REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE leaderboard(
    lb_id INT PRIMARY KEY,
    user_id INT,
    points INT,
    position INT,
    last_updated TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

);

CREATE TABLE badges(
    badge_id INT PRIMARY KEY,
    badge_name VARCHAR(255),
    badge_description TEXT,
    image_url VARCHAR(255),
    requirement TEXT


);


CREATE TABLE user_badges(
    user_id INT PRIMARY KEY REFERENCES users(user_id),
    badge_id INT REFERENCES badges(badge_id),
    earned_at TIMESTAMP
);
