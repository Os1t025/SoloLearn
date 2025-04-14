# 💻 SoloLearn Project

Welcome to **SoloLearn** — a web application inspired by Duolingo, but designed for learning **programming languages** instead of spoken languages. This project includes gamified elements like leaderboards, interactive quizzes, profiles, badges, and even a community feature powered by the Reddit API.

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
git clone <your-repo-url>
2. Install Next.js
You’ll need to have Next.js installed. If it’s not installed yet, run:

bash
Copy
Edit
npm install next
Or, to install all project dependencies:

bash
Copy
Edit
npm install
3. Configure Your Backend
Update your database credentials in the following files:

backend/database.php

backend/get-flashcards.php

Make sure the username, password, and database name match your local or remote setup.

4. Start the Fullstack App
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Then start the fullstack development server:

bash
Copy
Edit
npm run dev:fullstack
The app should now be running at http://localhost:3000

📁 Project Structure
csharp
Copy
Edit
SoloLearn/
│
├── frontend/         # Next.js frontend application
├── backend/          # PHP backend APIs
│   ├── database.php
│   └── get-flashcards.php
├── README.md
🙌 Contributing
Pull requests are welcome! Feel free to fork the project and suggest improvements, fix bugs, or add new features.

