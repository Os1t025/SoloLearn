"use client";

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setApiError('');
    setSuccessMessage('');

    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Login successful');

        // Save username to localStorage
        if (data.user && data.user.username) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("xp", data.user.points);
          localStorage.setItem("streak", data.user.streak);
          localStorage.setItem("user_id", data.user.id);
        }
        
        router.push('../levels');
      } else {
        setApiError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl text-black font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
          {apiError && <p className="text-red-500 text-xs italic">{apiError}</p>}
          {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
          <div className="mt-4 text-center">
            <button className="btn" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button className="btn" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;






