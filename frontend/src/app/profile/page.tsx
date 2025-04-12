"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import './profile.css';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  points: number;
  level: number;
  role: string;
  streak: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setError("User not authenticated");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/get-profile.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const levelProgress = (user?.points || 0) % 100;
  const streakProgress = (user?.streak || 0) * 2;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 {user?.username}</h1>
      </div>

      <div className="profile-card">
        <div className="profile-image">
          {/* Placeholder for profile picture */}
          <img src="/profile.avif" alt="Profile" className="profile-img" />
        </div>

        <div className="profile-details">
          <ul>
            <li><strong>Email:</strong> {user?.email}</li>
            <li><strong>Role:</strong> {user?.role}</li>
            <li><strong>Level:</strong> {user?.level}</li>
            <li><strong>🔥 Streak:</strong> {user?.streak} days</li>
            <li><strong>⭐XP:</strong> {user?.points}</li>
          </ul>

          <div className="progress-bars">
            {/* XP Progress Bar */}
            <div className="progress-container">
              <span>XP Progress</span>
              <div className="progress-bar">
                <div
                  className="progresss"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Streak Progress Bar */}
            <div className="progress-container">
              <span>Streak Progress</span>
              <div className="progress-bar">
                <div
                  className="progresss"
                  style={{ width: `${Math.min(streakProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back button at the bottom */}
      <button onClick={() => router.back()} className="back-btn bottom-btn">
        Back
      </button>
    </div>
  );
}














