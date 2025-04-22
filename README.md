# 💻 SoloLearn Project

Welcome to **SoloLearn** — a web application inspired by Duolingo, but designed for learning **programming languages**. This project includes gamified elements like leaderboards, interactive quizzes, profiles, badges, and even a community feature powered by the Reddit API.

---

## 🚀 Features

- 🎯 Interactive coding quizzes that award points  
- 🏆 Leaderboards to track top learners  
- 👤 User profiles with earned badges  
- 🌐 Community discussion powered by Reddit API  
- 🧠 Learn multiple coding languages in a fun, engaging way  

---

## 🔧 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Os1t025/SoloLearn.git
```
### 2. Install PHP
Make sure PHP is installed on your system. You can check with:
```bash
php -v
```
If it’s not installed, use one of the following based on your OS:

```bash
macOS (Homebrew):
brew install php

Windows:
Download PHP from php.net/downloads
```
✅ Don't forget to configure your php.ini file:
Note: PHP may include multiple php.ini templates (e.g., php.ini-development and php.ini-production). Make sure to rename one of them .ini and start to edit.

- Open your php.ini file.
- Enable the mysqli extension:
Find this line:
;extension=mysqli
Remove the semicolon so it becomes:
extension=mysqli

- Set the correct path for your PHP extensions:
Find this line:
;extension_dir = "ext"
Uncomment and update it if necessary.

### 3. Install Next.js
You’ll need to have Next.js installed. If it’s not installed yet, run:
```bash
npm install next
```
Then install all frontend dependencies:
```bash
cd frontend
npm install
```
### 4. Set Up the Database
Run the SQL script, script.txt, in the script folder to create your database and tables:

### 5. Configure Your Backend
Make sure your backend files are properly connected to the database:
-  backend/database.php 
-  backend/get-flashcards.php
Update credentials for database user and password

### 6. Start the Fullstack App
```bash
cd frontend
npm run dev:fullstack
```
