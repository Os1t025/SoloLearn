"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ xp: number; streak: number } | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUsername = localStorage.getItem("username");

    if (savedUserId) setUserId(parseInt(savedUserId));
    if (savedUsername) setUsername(savedUsername);

    if (userId) {
      fetch(`/api/getUserProgress.php?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user progress:", error));
    }
  }, [userId]);

  if (!username || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Profile</h1>
      <p className="subtitle">Welcome, {username}</p>
      <div className="progress">
        <p>🔥 Streak: {userData.streak} days</p>
        <p>⭐ XP: {userData.xp} points</p>
      </div>
      <button className="btn" onClick={() => router.push("/")}>
        Back to Levels
      </button>
    </div>
  );
}


