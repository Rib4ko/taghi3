import React from "react";
import { getUser } from "../api/user";

const UserProfile = () => {
  const user = getUser();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md text-center border-2 border-blue-500">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">User Profile</h1>
        <div className="space-y-6 ">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Name</h2>
            <p className="text-gray-600 px-4 py-2 rounded border border-gray-300">
              {user.name}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600 px-4 py-2 rounded border border-gray-300">
              {user.email}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Role</h2>
            <p className="text-gray-600 px-4 py-2 rounded border border-gray-300">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;