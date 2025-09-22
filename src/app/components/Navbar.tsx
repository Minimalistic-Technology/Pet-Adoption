"use client";
import React, { useState, useRef, useEffect } from "react";
import { Heart, Plus, User, LogOut, ChevronDown, Dumbbell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const [isPetsDropdownOpen, setIsPetsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const petsDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        petsDropdownRef.current &&
        !petsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPetsDropdownOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePetsDropdownToggle = () => {
    setIsPetsDropdownOpen(!isPetsDropdownOpen);
  };

  const handleServicesDropdownToggle = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const handleAdoptMeClick = () => {
    setIsPetsDropdownOpen(false);
    router.push("/AdoptMe");
  };

  const handleTrainingClick = () => {
    setIsServicesDropdownOpen(false);
    router.push("/Training");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-9xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="">
              <img src="/mt-log.jpeg" alt="logo" className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Pet Adoption
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            {/* Pets Dropdown */}
            <div className="relative" ref={petsDropdownRef}>
              <button
                onClick={handlePetsDropdownToggle}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Heart className="h-5 w-5 mr-2" />
                Pets
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform duration-200 ${
                    isPetsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPetsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="py-2">
                    <button
                      onClick={handleAdoptMeClick}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                    >
                      <Heart className="h-4 w-4 mr-3 text-blue-500" />
                      Adopt Me
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pet Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={handleServicesDropdownToggle}
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5 mr-2" />
                Pet Services
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform duration-200 ${
                    isServicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="py-2">
                    <button
                      onClick={handleTrainingClick}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 hover:text-purple-600 transition-all duration-200 flex items-center"
                    >
                      <Dumbbell className="h-4 w-4 mr-3 text-purple-500" />
                      Pet Training
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push("/Profile")}
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
