// done added the otherAnimal field 
import React from "react";
import {
  X,
  Heart,
  Calendar,
  MapPin,
  User,
  DollarSign,
  PawPrint,
  Mail,
  Phone,
} from "lucide-react";

import { Pet } from "../utils/pet";



interface PetDetailsModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (petId: string) => void;
  isFavorite?: boolean;
  fromProfile?: boolean;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({
  pet,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite = false,
  fromProfile = false,
}) => {
  if (!isOpen || !pet) return null;

  const renderStatusBadge = (status: string) => {
    const statusConfig = {
      "Not Adopted": "bg-green-100 text-green-800 border-green-200",
      "In Process": "bg-yellow-100 text-yellow-800 border-yellow-200",
      adopted: "bg-blue-100 text-blue-800 border-blue-200",
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      "bg-gray-100 text-gray-800 border-gray-200";

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${config}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-64 overflow-hidden">
            <img
              src={
                pet.image ||
                "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=300&fit=crop"
              }
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Pet name and price overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {pet.name}
                </h1>
                <p className="text-white/90 text-lg">{pet.breed}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                <div className="flex items-center text-gray-900">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span className="text-2xl font-bold">${pet.adoptionFee}</span>
                </div>
                <p className="text-sm text-gray-600">Adoption Fee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pet Details */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Pet Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium text-gray-900">
                        {pet.age} years old
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {pet.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        {pet.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <PawPrint className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {pet.type}
                      </p>
                    </div>
                  </div>

                  {/* ✅ Show "Other Animal" field only when type is 'other' */}
                  {pet.type === "other" && pet.otherAnimal && (
                    <div className="flex items-center space-x-3">
                      <PawPrint className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Other Animal</p>
                        <p className="font-medium text-gray-900 capitalize">
                          {pet.otherAnimal}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <PawPrint className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Status</p>
                      {renderStatusBadge(pet.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About {pet.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        {pet.contactEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {pet.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6">
              {/* Price Display */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  Adoption Fee
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-1">
                    <DollarSign className="h-7 w-7 text-blue-600" />
                    {pet.adoptionFee}
                  </div>
                  <p className="text-gray-600">One-time adoption fee</p>
                </div>
              </div>

              {/* Action Buttons - Conditionally rendered */}
              {!fromProfile && (
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                    Adopt {pet.name}
                  </button>
                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex justify-center items-center gap-3 text-lg"
                    onClick={() => onToggleFavorite?.(pet.id)}
                  >
                    <Heart
                      className={`h-7 w-7 transition-colors ${
                        isFavorite ? "text-red-500 fill-current" : "text-white"
                      }`}
                    />
                    Add to Favorites
                  </button>
                </div>
              )}
              <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
                Share Pet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;