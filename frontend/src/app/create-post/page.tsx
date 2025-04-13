"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreatePostPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selftext, setSelftext] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Get access token from Reddit
  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !accessToken) {
      const fetchToken = async () => {
        const clientId = "pmXaP8K5dBAPyFwnRPsRiQ";
        const secret = "2hX2eRWy3s0zVfVTCYyHAdDPaTwQRg";
        const credentials = btoa(`${clientId}:${secret}`);

        try {
          const res = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code,
              redirect_uri: "http://localhost:3000/create-post",
            }),
          });

          const data = await res.json();

          if (data.access_token) {
            setAccessToken(data.access_token);
            router.replace("/create-post"); // Clean up URL
          } else {
            console.error("Token error:", data);
            alert("Failed to authenticate with Reddit.");
          }
        } catch (err) {
          console.error("OAuth Error:", err);
          alert("OAuth failed.");
        }
      };

      fetchToken();
    }
  }, [searchParams, accessToken, router]);

  // Step 2: Submit post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !accessToken) return;

    setLoading(true);
    try {
      const res = await fetch("https://oauth.reddit.com/api/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "web:reddit-poster:v1.0 (by /u/YOUR_USERNAME)",
        },
        body: new URLSearchParams({
          sr: "SololearnProject", // subreddit name
          kind: "self",
          title,
          text: selftext,
        }),
      });

      const result = await res.json();
      if (result.json?.errors?.length) {
        console.error(result.json.errors);
        alert("Post failed.");
      } else {
        router.push("/community"); // Redirect after success
      }
    } catch (err) {
      console.error("Post error:", err);
      alert("Something went wrong while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create a New Post</h2>

      {!accessToken ? (
        <div>
          <p>You must log in with Reddit to post.</p>
          <a
            href={`https://www.reddit.com/api/v1/authorize?client_id=pmXaP8K5dBAPyFwnRPsRiQ&response_type=code&state=random_string&redirect_uri=http://localhost:3000/create-post&duration=temporary&scope=submit identity`}
            style={{
              background: "orangered",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Log in with Reddit
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Title (required)</label><br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Body (optional)</label><br />
            <textarea
              value={selftext}
              onChange={(e) => setSelftext(e.target.value)}
              rows={6}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "lightblue",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Posting..." : "Submit Post"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePostPage;
