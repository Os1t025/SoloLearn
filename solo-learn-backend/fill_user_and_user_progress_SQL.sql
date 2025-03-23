USE programming_lessons;



INSERT INTO users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'hashedpass1'),
('bob', 'bob@example.com', 'hashedpass2'),
('carol', 'carol@example.com', 'hashedpass3'),
('dave', 'dave@example.com', 'hashedpass4'),
('eve', 'eve@example.com', 'hashedpass5');


INSERT INTO user_progress (user_id, lesson_id, completed, quiz_score) VALUES
(1, 1, TRUE, 80),
(1, 2, TRUE, 90),
(2, 1, TRUE, 95),
(2, 2, TRUE, 88),
(3, 1, TRUE, 75),
(3, 3, FALSE, NULL),
(4, 2, TRUE, 60),
(4, 3, TRUE, 70),
(5, 1, TRUE, 85),
(5, 2, TRUE, 80),
(5, 3, TRUE, 90);