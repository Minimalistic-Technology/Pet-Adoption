"use client"
import React, { useState } from "react";
import { Heart, Plus } from "lucide-react";
import SignupPage from "../Signup/page";
import { useRouter } from "next/navigation";

const Navbar = () => {
  //  const [showSignup, setShowSignup] = useState(false);

const router = useRouter()

  //  if (showSignup) {
  //    return <SignupPage onBack={() => setShowSignup(false)} />;
  //  }
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-9xl mx-auto px-6 py-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-xl">
              <Heart className="h-7 w-7 text-white" />
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
            <button
              onClick={() => router.push("/Signup")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
