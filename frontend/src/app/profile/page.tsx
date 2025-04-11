"use client";

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [avatarOptions, setAvatarOptions] = useState<string[]>([
    '/avatars/Builder.png',
    '/avatars/Chef.png',
    '/avatars/Businessman.png',
  ]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile: UserProfile = {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        avatarUrl: '/avatars/Generic.avif',
      };
      setUserProfile(profile);
      setNewUsername(profile.username);
    };

    fetchUserProfile();
  }, []);

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleUsernameSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userProfile) {
      setUserProfile({ ...userProfile, username: newUsername });
    }
    setIsEditingUsername(false);
  };

  const handleAvatarChange = (avatarUrl: string) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, avatarUrl });
    }
  };

  if (!userProfile) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile - {userProfile.username}</title>
        <meta name="description" content={`Profile of ${userProfile.username}`} />
      </Head>

      <main className="flex justify-center items-center pt-12">

        <div className="text-center max-w-lg">
          <img
              src={userProfile.avatarUrl}
              alt={`${userProfile.username}'s avatar`}
              className="rounded-full mx-auto"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          {isEditingUsername ? (
            <form onSubmit={handleUsernameSubmit} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  className="border rounded p-2 flex-grow"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-4">
              <h1 className="text-2xl font-bold">
                {userProfile.username} <button onClick={handleEditUsername} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded text-sm">Edit</button>
              </h1>
            </div>
          )}

          <p className="text-gray-700">Email: {userProfile.email}</p>

          <div className="flex justify-center mt-6">
            {avatarOptions.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar option ${index + 1}`}
                className="rounded-full mr-2 cursor-pointer"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                onClick={() => handleAvatarChange(avatar)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;