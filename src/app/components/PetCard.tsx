// done added the otherAnimal field

import React from "react";
import { Heart, MapPin, Calendar, Eye } from "lucide-react";
import { Pet } from "../utils/pet";

interface PetCardProps {
  pet: Pet;
  onToggleFavorite?: (pet: Pet) => void; // Updated: Now takes full Pet (for context compatibility)
  isFavorite?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({
  pet,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const renderStatusBadge = (status: string) => {
    const statusConfig = {
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      "in process": "bg-amber-100 text-amber-800 border-amber-200",
      "not adpopted yet": "bg-green-100 text-green-800 border-green-200",
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      "bg-gray-100 text-gray-800 border-gray-200";

    const label = status
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${config}`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {renderStatusBadge(pet.status)}
        </div>
        <div className="absolute top-3 left-3">
          <button
            onClick={() => onToggleFavorite?.(pet)} // Updated: Pass full pet
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite
                  ? "text-red-500 fill-current"
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{pet.name}</h3>
            <p className="text-gray-600 text-base font-medium">{pet.breed}</p>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {pet.age} • {pet.gender}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pet.location}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl text-base font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PetCard;
