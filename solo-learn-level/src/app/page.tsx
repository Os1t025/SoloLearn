"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
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
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/java")}>
          Java
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/python")}>
          Python
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/cSharp")}>
          C#
        </motion.button>
        <motion.button className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push("/sql")}>
          SQL
        </motion.button>
      </div>
    </div>
  );
}


