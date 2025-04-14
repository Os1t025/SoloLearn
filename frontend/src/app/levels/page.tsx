"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Levels() {
  const router = useRouter();
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedXP = localStorage.getItem("xp");
    const savedStreak = localStorage.getItem("streak");
    const savedUsername = localStorage.getItem("username");

    if (savedXP) setXP(parseInt(savedXP));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const handleSignOut = () => {
    // Clear username and other session data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("xp");
    localStorage.removeItem("streak");
    router.push("/"); // Redirect to the sign-in page
  };

  const handleProfile = () => {
    router.push("/profile"); // Navigate to the profile page
  };

  return (
    <div className="container">
      <h1 className="title">Welcome {username} to SoloLearn</h1>
      <motion.h1 className="title" animate={{ opacity: [0, 1], y: [-20, 0] }}>
        Select a Coding Language
      </motion.h1>
      <p className="subtitle">Start your journey and master a new programming language today!</p>

      <div className="progress">
        <p>🔥 Streak: {streak} days</p>
        <p>⭐ XP: {xp} points</p>
      </div>

      <div className="button-container">
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/levels/java")}>
          Java
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/levels/python")}>
          Python
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/levels/cSharp")}>
          C#
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/levels/sql")}>
          SQL
        </motion.button>
      </div>

      <div className="action-buttons">
        <motion.button className="btn leaderboard-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/leaderboard")}>
          Leaderboard
        </motion.button>

        <motion.button className="btn community-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/community")}>
          Community
        </motion.button>

        <motion.button className="btn profile-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleProfile}>
        Profile
      </motion.button>

      <motion.button className="btn profile-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/flashcards")}>
        Flashcards
      </motion.button>
      </div>

      {/* Floating Sign-Out Button */}
      <motion.button
        className="btn signout-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSignOut}
      >
        Sign Out
      </motion.button>
    </div>
  );
}


















