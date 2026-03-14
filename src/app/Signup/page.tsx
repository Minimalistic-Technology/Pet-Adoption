"use client"

import React, { useState } from "react";
import { Heart, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    city: "",
    country: "",
    // isPetParent: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

const {user,login}  = useAuth()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      isPetParent: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     const mockUser = {
       fullName: formData.fullName,
       phoneNumber: formData.phoneNumber,
       email: formData.email,
       password: formData.password,
       gender: formData.gender,
       city: formData.city,
       country: formData.country,
       profilePicture: undefined,
       isAdmin : false,
     };

     login(mockUser);

    console.log("Form submitted:", formData);
    alert("SIgnup successfulL");
      setFormData({
       fullName: "",
       phoneNumber: "",
       email: "",
       password: "",
       gender: "",
       city: "",
       country: "",
       // isPetParent: "",
     });


      router.push("/");


  };

  const onBack = () => {
        // setShowSignup(false);
        router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 p-2 hover:bg-white/80 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-2">
            Sign Up
          </h1>
          <p className="text-gray-600">Join our pet adoption community</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="flex">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Gender */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer focus:outline-none"
                required
              >
                <option value="" disabled className="text-gray-500">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer focus:outline-none"
                required
              >
                <option value="" disabled className="text-gray-500">
                  Select Country
                </option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Create an account
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Already a member?{" "}
              <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors" onClick={()=> {
                   router.push("/Login")
              }}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
