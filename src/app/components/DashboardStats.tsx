"use client"
import React from "react";
import { Heart, Users, Dog, Cat, TrendingUp, PawPrint } from "lucide-react";

const StatsGrid = () => {
  // stats Mock data
  /* Array of stats objects */
  const stats = [
    {
      title: "Total Pets Not Adopted",
      value: "247",
      change: "12%",
      icon: Heart,
      bgColor: "from-pink-500 to-rose-500",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Successful Adoptions",
      value: "1,834",
      change: "8%",
      icon: Users,
      bgColor: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Dogs Available",
      value: "156",
      change: "5%",
      icon: Dog,
      bgColor: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Cats Available",
      value: "91",
      change: "15%",
      icon: Cat,
      bgColor: "from-purple-500 to-violet-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const renderStatCard = (stat, index) => {
    const IconComponent = stat.icon;
    const isAdoptions = stat.title === "Successful Adoptions";

    return (
      
      <div
        key={index}
        className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 overflow-hidden"
      >
      
        <div
          className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        ></div>
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-3">
              {stat.value}
            </p>
            <div className="flex items-center">
              <div
                className={`flex items-center ${
                  isAdoptions ? "bg-green-50" : "bg-red-50"
                } px-3 py-1 rounded-full`}
              >
                <TrendingUp
                  className={`h-4 w-4 ${
                    isAdoptions ? "text-green-600" : "text-red-600"
                  } mr-1`}
                />
                <span
                  className={`text-sm font-semibold ${
                    isAdoptions ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
          <div
            className={`${stat.iconBg} p-4 rounded-xl group-hover:scale-105 transition-transform duration-300`}
          >
            <IconComponent className={`h-7 w-7 ${stat.iconColor}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => renderStatCard(stat, index))}
    </div>
  );
};

export default StatsGrid;
