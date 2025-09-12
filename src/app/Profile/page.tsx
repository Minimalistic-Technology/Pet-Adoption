"use client"
import React, { useState } from "react";
import {
  User,
  Edit,
  X,
  PawPrint,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const router =  useRouter()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"  onClick={()=> router.push("/Login")}>
            Log In
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, you'd save to backend here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 relative">
      {/* Background Paw Print Icons */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <PawPrint className="w-64 h-64 text-orange-400/10 rotate-12" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 pointer-events-none">
        <PawPrint className="w-80 h-80 text-blue-400/10 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8 border border-white/20">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-32 relative">
            {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
          </div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="h-16 w-16 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user.fullName as string}
                  </h1>
                  <p className="text-lg text-gray-600 mb-1">
                    {user.city as string}, {user.country as string}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pet lover & adoption advocate
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 mt-4 sm:mt-0"
              >
                {isEditing ? (
                  <X className="h-5 w-5 mr-2" />
                ) : (
                  <Edit className="h-5 w-5 mr-2" />
                )}
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
