// done added the otherAnimal field

"use client";
import React, { useState } from "react";
import { Heart, Calendar, MapPin, Search, Eye, PawPrint } from "lucide-react";
import PetDetailsModal from "../components/PetDetailsModal"; // Import the modal
import { Pet } from "../utils/pet";

// interface Pet {
//   id: number;
//   name: string;
//   breed: string;
//   age: string;
//   gender: string;
//   location: string;
//   status: string;
//   image: string;
//   type: string;
//   price: number;
//   contactEmail: string;
//   contactPhone: string;
//   description: string;
// }

const AdoptMe = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // State for selected pet
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const availablePets: Pet[] = [
    {
      id: 1,
      name: "Max",
      breed: "German Shepherd",
      age: "2 years",
      gender: "male",
      location: "Bhopal",
      status: "adpoted",
      image:
        "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "other",
      otherAnimal: "other Animal",
      adoptionFee: 250,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
    {
      id: 2,
      name: "Bella",
      breed: "Siamese Cat",
      age: "1.5 years",
      gender: "female",
      location: "Bhopal",
      status: "In Process",
      image:
        "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
      adoptionFee: 180,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle",
      age: "3 years",
      gender: "male",
      location: "Delhi",
      status: "adpopted",
      image:
        "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "dog",
      adoptionFee: 300,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
    {
      id: 4,
      name: "Daisy",
      breed: "Maine Coon",
      age: "4 years",
      gender: "female",
      location: "Mumbai",
      status: "Not Adpopted",
      image:
        "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
      adoptionFee: 220,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
    {
      id: 5,
      name: "Rocky",
      breed: "Bulldog",
      age: "3 years",
      gender: "male",
      location: "Delhi",
      status: "In Process",
      image:
        "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "dog",
      adoptionFee: 400,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
    {
      id: 6,
      name: "Mia",
      breed: "Russian Blue",
      age: "2 years",
      gender: "female",
      location: "Mumbai",
      status: "Not Adpopted",
      image:
        "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
      adoptionFee: 160,
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
  ];

  // Handle favorite toggle
  const handleToggleFavorite = (petId: number) => {
    setFavorites((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  };

  // Handle adopt me button click
  const handleAdoptMeClick = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  // Filter pets based on search and active filter
  const filteredPets = availablePets.filter((pet) => {
    const matchesFilter = activeFilter === "all" || pet.type === activeFilter;
    const matchesSearch =
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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

  const renderFilterButton = (filter: string) => {
    const isActive = activeFilter === filter;
    const label =
      filter === "all"
        ? "All Pets"
        : filter.charAt(0).toUpperCase() + filter.slice(1) + "s";

    return (
      <button
        key={filter}
        onClick={() => setActiveFilter(filter)}
        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25"
            : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Paw Print Icons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <PawPrint className="w-96 h-96 text-orange-400/10 rotate-12" />
      </div>

      <div className="max-w-9xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our available pets and find the one that will bring
            joy to your home
          </p>
        </div>

        {/* Available Pets Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Pets
              </h2>
              <div className="flex items-center space-x-3 text-base text-gray-600">
                <span>{filteredPets.length} pets found</span>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search pets by name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-base"
                />
              </div>
              <div className="flex space-x-3">
                {["all", "dog", "cat"].map((filter) =>
                  renderFilterButton(filter)
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet) => (
                <div
                  key={pet.id}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
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
                        onClick={() => handleToggleFavorite(pet.id)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            favorites.includes(pet.id)
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
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {pet.name}
                        </h3>
                        <p className="text-gray-600 text-base font-medium">
                          {pet.breed}
                        </p>
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

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{pet.adoptionFee}
                      </span>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl text-base font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                      onClick={() => handleAdoptMeClick(pet)}
                    >
                      Adopt Me
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPets.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  No pets found matching your criteria
                </p>
                <p className="text-gray-400 text-base mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Background Elements */}
      <div className="absolute top-1/7 right-10 pointer-events-none">
        <PawPrint className="w-32 h-32 text-blue-400/20 rotate-45" />
      </div>
      <div className="absolute top-1/7 left-10 pointer-events-none">
        <PawPrint className="w-24 h-24 text-indigo-400/20 -rotate-12" />
      </div>

      {/* Pet Details Modal */}
      <PetDetailsModal
        pet={
          selectedPet
            ? {
                id: selectedPet.id.toString(),
                name: selectedPet.name,
  otherAnimal:selectedPet.otherAnimal,
                type: selectedPet.type as
                  | "dog"
                  | "cat"
                  | "bird"
                  | "rabbit"
                  | "other",
                breed: selectedPet.breed,
                age: parseInt(selectedPet.age),
                gender: selectedPet.gender as "male" | "female",
                description: "A lovely pet looking for a home", // You might want to add description to your Pet interface
                adoptionFee: selectedPet.adoptionFee,
                image: selectedPet.image,
                status: selectedPet.status as
                  | "Not Adopted"
                  | "In Process"
                  | "adopted",
                location: selectedPet.location,
                contactEmail: "shelter@example.com", // Default contact email
                contactPhone: "+1-555-0123", // Default contact phone
              }
            : null
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={(petId) => {
          handleToggleFavorite(parseInt(petId));
        }}
        isFavorite={selectedPet ? favorites.includes(selectedPet.id) : false}
      />
    </div>
  );
};

export default AdoptMe;
