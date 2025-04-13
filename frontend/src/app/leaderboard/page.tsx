"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LeaderboardPlayer {
  rank: number;
  username: string;
  points: number;
  level: string;
}

export default function Leaderboard() {
  const router = useRouter();
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/leaderboard.php");
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data)) {
          setPlayers(data);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="leaderboard-container">
      <div className="pin">
        <Image src="/pin.png" alt="Pin" width={100} height={100} />
      </div>

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
              <span className="name">{player.username}</span>
              <span className="xp">{player.points} XP</span>
            </motion.li>
          ))}
        </ul>

        <button className="leader-back-button" onClick={() => router.back()}>
          &larr; Back
        </button>
      </motion.div>
    </div>
  );
}





