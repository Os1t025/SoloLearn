"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Leaderboard() {
  const router = useRouter(); // Initialize the router

  // This is fake data WE NEED TO CHANGE THIS
  const [players, setPlayers] = useState([
    { rank: 1, name: "Alice", xp: 1200 },
    { rank: 2, name: "Bob", xp: 1100 },
    { rank: 3, name: "Charlie", xp: 1000 },
    { rank: 4, name: "David", xp: 900 },
    { rank: 5, name: "Eve", xp: 850 },
  ]);

  return (
    <div className="leaderboard-container">
      <div className="pin">
        <Image src="/pin.png" alt="Pin" width={100} height={100} />
      </div>

      {/* Leaderboard Poster */}
      <motion.div
        className="leaderboard-poster"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="title">🏆 Leaderboard</h1>
        <ul className="leaderboard-list">
          {players.map((player) => (
            <motion.li
              key={player.rank}
              className="leaderboard-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: player.rank * 0.1 }}
            >
              <span className="rank">#{player.rank}</span>
              <span className="name">{player.name}</span>
              <span className="xp">{player.xp} XP</span>
            </motion.li>
          ))}
        </ul>

        {/* Back Button */}
        <button
          className="leader-back-button" // Use the new class name
          onClick={() => router.back()} // Navigate back when clicked
        >
          &larr; Back
        </button>
      </motion.div>
    </div>
  );
}


