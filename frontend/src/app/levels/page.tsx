"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Levels() {
  const router = useRouter();
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedXP = localStorage.getItem("xp");
    const savedStreak = localStorage.getItem("streak");
    if (savedXP) setXP(parseInt(savedXP));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to SoloLearn</h1>
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

      {/* Leaderboards & Community Buttons */}
      <div className="action-buttons">
        <motion.button className="btn leaderboard-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/leaderboard")}>
          Leaderboard
        </motion.button>

        <motion.button className="btn community-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/community")}>
          Community
        </motion.button>
      </div>
    </div>
  );
}

















