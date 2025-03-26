"use client";
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confPasswordError, setConfPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [apiError, setApiError] = useState('');
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfPasswordError('');
    setUsernameError('');
    setApiError('');

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

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

    if (password !== confirmationPassword) {
      setConfPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      //popup
      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setApiError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setApiError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-black font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && <p className="text-red-500 text-xs italic">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmationPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmationPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmationPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
            {confPasswordError && <p className="text-red-500 text-xs italic">{confPasswordError}</p>}
          </div>
          {apiError && <p className="text-red-500 text-xs italic">{apiError}</p>}
          <div className="flex items-center justify-center">
            <button
              className="btn"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            className="btn"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-[#C0FDFB] text-black p-6 rounded shadow-lg">
              <h3 className="text-lg font-semibold">Signup Successful!</h3>
              <p className="mt-2">You will be redirected shortly...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;




