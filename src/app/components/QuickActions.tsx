"use client"
import React from "react";
import { Plus, Users, Calendar, TrendingUp } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="bg-blue-100 p-2.5 rounded-xl mr-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          Quick Actions
        </h2>
      </div>
      <div className="p-5">
        <div className="space-y-3">
          <button className="w-full flex items-center px-4 py-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 group border border-blue-100">
            <div className="bg-blue-500 p-2.5 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-blue-700 font-semibold text-base block">
                Add New Pet
              </span>
              <span className="text-blue-600 text-sm">
                Register a new pet for adoption
              </span>
            </div>
          </button>

          <button className="w-full flex items-center px-4 py-4 text-left bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 group border border-green-100">
            <div className="bg-green-500 p-2.5 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-green-700 font-semibold text-base block">
                View Adopters
              </span>
              <span className="text-green-600 text-sm">
                Manage adoption applications
              </span>
            </div>
          </button>

          <button className="w-full flex items-center px-4 py-4 text-left bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-xl transition-all duration-200 group border border-purple-100">
            <div className="bg-purple-500 p-2.5 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-purple-700 font-semibold text-base block">
                Schedule Visit
              </span>
              <span className="text-purple-600 text-sm">
                Book meet & greet sessions
              </span>
            </div>
          </button>

          <button className="w-full flex items-center px-4 py-4 text-left bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition-all duration-200 group border border-orange-100">
            <div className="bg-orange-500 p-2.5 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-orange-700 font-semibold text-base block">
                View Reports
              </span>
              <span className="text-orange-600 text-sm">
                Analytics and insights
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
