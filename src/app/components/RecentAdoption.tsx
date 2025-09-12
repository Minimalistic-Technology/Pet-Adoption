"use client"

import React from "react";
import { Heart } from "lucide-react";

const RecentAdoptions = ({ recentAdoptions, renderStatusBadge }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="bg-green-100 p-2.5 rounded-xl mr-3">
            <Heart className="h-5 w-5 text-green-600" />
          </div>
          Recent Adoptions
        </h2>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {recentAdoptions.map((adoption) => (
            <div
              key={adoption.id}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <img
                src={adoption.image}
                alt={adoption.petName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-gray-300 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base text-gray-900 truncate">
                  {adoption.petName}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {adoption.petType}
                </p>
                <p className="text-xs text-gray-500">
                  Adopted by {adoption.adopterName}
                </p>
              </div>
              <div className="text-right">
                {renderStatusBadge(adoption.status)}
                <p className="text-xs text-gray-500 mt-2 mr-3">{adoption.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAdoptions;
