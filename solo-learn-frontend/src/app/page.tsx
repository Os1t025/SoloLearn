"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="main-container">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="title">Welcome To SoloLearn!</h1>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="btn"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="btn"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </button>
        </div>
      </main>
      <footer className="footer row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

