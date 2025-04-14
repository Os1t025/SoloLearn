"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./community.css";

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  url: string;
  author: { name: string };
  created_utc: number;
}

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 15;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Step 1: Handle OAuth callback and get token
  useEffect(() => {
    const code = searchParams.get("code");

    if (code && !accessToken) {
      const fetchToken = async () => {
        const clientId = "rG8CSb-FyKSlSMTU4kiQGA";
        const secret = "A_invWWzJ1SGnJly8vSA8Ue9wU64ng";
        const credentials = btoa(`${clientId}:${secret}`);

        try {
          const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code,
              redirect_uri: "http://localhost:3000/community",
            }),
          });

          const tokenData = await tokenRes.json();

          if (tokenData.access_token) {
            setAccessToken(tokenData.access_token);
            router.replace("/community"); // Clean up URL
          } else {
            alert("Failed to authenticate.");
          }
        } catch (err) {
          console.error("OAuth Error:", err);
        }
      };

      fetchToken();
    }
  }, [searchParams, accessToken, router]);

  // Step 2: Fetch subreddit posts
  useEffect(() => {
    const fetchRedditPosts = async () => {
      if (!accessToken) return;

      try {
        const subreddit = "SololearnProject";
        const res = await fetch(`https://oauth.reddit.com/r/${subreddit}/new?limit=100`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "web:reddit-oauth-client:v1.0 (by /u/YOUR_USERNAME)",
          },
        });

        const json = await res.json();

        const formattedPosts: RedditPost[] = json.data.children.map((p: any) => ({
          id: p.data.id,
          title: p.data.title,
          selftext: p.data.selftext,
          url: `https://reddit.com${p.data.permalink}`,
          author: { name: p.data.author },
          created_utc: p.data.created_utc,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchRedditPosts();
  }, [accessToken]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleAddPost = () => {
    router.push("/create-post");
  };

  const loginWithReddit = () => {
    const clientId = "rG8CSb-FyKSlSMTU4kiQGA";
    const redirectUri = "http://localhost:3000/community";
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=xyz123&redirect_uri=${redirectUri}&duration=temporary&scope=read`;

    window.location.href = authUrl;
  };

  const displayedPosts = posts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  return (
    <div className="community-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={() => router.push("/levels")}>
          ← Back to Levels
        </button>
      </div>

      <div className="community-header">
        <h2>Community Posts</h2>
        {accessToken ? (
          <button className="community-button" onClick={handleAddPost}>
            <FaPlusCircle /> Add Post
          </button>
        ) : (
          <button className="community-button login-button" onClick={loginWithReddit}>
            Log in with Reddit
          </button>
        )}
      </div>

      {displayedPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>Author: {post.author.name}</p>
          <p>{post.selftext}</p>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            View Post
          </a>
        </div>
      ))}

      {posts.length > (currentPage + 1) * postsPerPage && (
        <button className="pagination-button" onClick={handleNextPage}>
          Next Page
        </button>
      )}
    </div>
  );
};

export default CommunityPage;


