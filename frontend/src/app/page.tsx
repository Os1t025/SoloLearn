"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-data.php");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.length > 0) {
          setData(result);
        } else {
          setError("No data found.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Error fetching data: ${error.message}`);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="title">Welcome To SoloLearn!</h1>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="btn" onClick={() => router.push("/sign-in")}>
            Sign In
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="btn" onClick={() => router.push("/sign-up")}>
            Sign Up
          </button>
        </div>
      </main>
      <footer className="footer row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}




