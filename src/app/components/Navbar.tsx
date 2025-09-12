
"use client";
import React from "react";
import { Heart, Plus, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-9xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-xl */}
            <div className="">
              

              <img src="/mt-log.jpeg" alt="logo" className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Pet Adoption
            </h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              <Heart className="h-5 w-5 mr-2" />
              Pets
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              <Plus className="h-5 w-5 mr-2" />
              Pet Services
            </button>
            {isAuthenticated ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push("/Profile")} // Adjust the route as needed
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  title={
                    user?.fullName ? `Welcome, ${user.fullName}` : "Profile"
                  }
                >
                  <User className="h-5 w-5 mr-2" />
                  {user?.fullName || "Profile"}
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => router.push("/Signup")}
                  className="bg-gradient-to-r from-amber-500 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Sign Up
                </button>

                <button
                  onClick={() => router.push("/Login")}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;