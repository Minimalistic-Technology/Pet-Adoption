"use client";
import React, { useState } from "react";
import {
  Heart,
  Dog,
  Cat,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  PawPrint,
} from "lucide-react";
import StatsGrid from "./components/DashboardStats";
import RecentAdoptions from "./components/RecentAdoption";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from "./components/Navbar";
import AdopterStories from "./components/AdopterStories";

const PetAdoptionDashboard = () => {
  /* 
       This state tracks the currently selected filter for pet types (e.g., all, dog, cat). When updated, it triggers a re-render of the component
  */
  const [activeFilter, setActiveFilter] = useState("all");
  /*  
       This state tracks the currently selected filter for pet types (e.g., all, dog, cat). When updated, it triggers a re-render of the component
  */
  const [searchTerm, setSearchTerm] = useState("");


  const availablePets = [
    {
      id: 1,
      name: "Max",
      breed: "German Shepherd",
      age: "2 years",
      gender: "Male",
      location: "Bhopal",
      status: "not adpopted yet",
      image:
        "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "dog",
    },
    {
      id: 2,
      name: "Bella",
      breed: "Siamese Cat",
      age: "1.5 years",
      gender: "Female",
      location: "Bhopal",
      status: "in process",
      image:
        "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle",
      age: "3 years",
      gender: "Male",
      location: "Delhi",
      status: "not adpopted yet",
      image:
        "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "dog",
    },
    {
      id: 4,
      name: "Daisy",
      breed: "Maine Coon",
      age: "4 years",
      gender: "Female",
      location: "Mumbai",
      status: "not adpopted yet",
      image:
        "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
    },
    {
      id: 5,
      name: "Rocky",
      breed: "Bulldog",
      age: "3 years",
      gender: "Male",
      location: "Delhi",
      status: "in process",
      image:
        "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "dog",
    },
    {
      id: 6,
      name: "Mia",
      breed: "Russian Blue",
      age: "2 years",
      gender: "Female",
      location: "Mumbai",
      status: "not adpopted yet",
      image:
        "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: "cat",
    },
  ];

  /* 
The filter method iterates over each pet in availablePets.
matchesFilter: Evaluates to true if either:
      activeFilter is "all" (no type restriction), or
      The pet’s type matches activeFilter (e.g., pet.type === "dog" when activeFilter === "dog").
matchesSearch: Evaluates to true if either:
      The pet’s breed (lowercased) includes the searchTerm (lowercased). This makes the search case-insensitive.
The return matchesFilter && matchesSearch ensures a pet is included only if it satisfies both conditions.
Example: If filter is "dog" and search is "Beagle", only dogs with "Beagle" in their breed show up.
Case  – User clicks "Dogs"
        setActiveFilter("dog") updates state.
        React re-renders.
        Now matchesFilter is true only for pets with type: "dog".
        matchesSearch is still true for all breeds (empty search).
        ✅ Result: Only dogs are shown.
   */
  const filteredPets = availablePets.filter((pet) => {
    const matchesFilter = activeFilter === "all" || pet.type === activeFilter;
    const matchesSearch = pet.breed
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderStatusBadge = (status) => {
    const statusConfig = {
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      "in process": "bg-amber-100 text-amber-800 border-amber-200",
      "not adpopted yet": "bg-green-100 text-green-800 border-green-200",
    };

    const config =
      statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
    /*
      Splits the status string into an array of words using a regular expression (/[-_\s]+/) that matches one or more hyphens (-), underscores (_), or whitespace (\s). eg : "not-adpopted-yet" → ["not", "adpopted", "yet"]
      
      .slice(1) Extracts from index 1 to the end string.eg-["not", "adpopted", "yet"] → ["Not", "Adpopted", "Yet"]

      join( " ") :  Combines the array of  words into a single string, with a space (" ") between each word.example : ["In", "Process"] → "In Process"
      */
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

  /* 
        User clicks "Dogs" button.
        setActiveFilter("dog") is called.
        React updates activeFilter to "dog".
        The component re-renders, recomputing filteredPets to include only pets with type: "dog" (and matching searchTerm, if any).
        The UI updates to show only dog cards.
        code : filter = "dog";
                filter.charAt(0).toUpperCase(); // "D"
                filter.slice(1); // "og"
                label = "D" + "og" + "s"; // "Dogs"
  */
  const renderFilterButton = (filter) => {
    /*  It compares the current state (activeFilter) with the button’s filter value.
       If they’re the same → true  
 */
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Background Paw Print Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <PawPrint className="w-96 h-96 text-orange-400/10 rotate-12" />
        </div>

        <div className="max-w-9xl mx-auto px-6 py-8">
          {/* Stats Grid */}
          <StatsGrid />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Available Pets Section */}
            <div className="xl:col-span-3">
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
                  {/* Flow :  
                   User types "Max" in the input.
                    onChange fires, calling setSearchTerm("Max").
                    React updates searchTerm to "Max".
                    The component re-renders, recomputing filteredPets to include only pets whose name or breed contains "Max" (case-insensitive) and matches the current activeFilter.
                    The UI updates to show matching pet cards. */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                              <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
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

                          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl text-base font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                            View Details
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

            {/* Background Paw Print Icon */}
            <div className="absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <PawPrint className="w-96 h-96 text-orange-400/10 rotate-12" />
            </div>

            <div className="absolute top-1/2 left-100 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <PawPrint className="w-96 h-96 text-orange-400/10 rotate-12" />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
                <AdopterStories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetAdoptionDashboard;

