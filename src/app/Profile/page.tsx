"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Heart,
  Award,
  Calendar,
  Settings,
  Save,
  X,
  PawPrint,
  Cat,
  Building,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Home,
  Eye,
} from "lucide-react";
import PetDetailsModal from "../components/PetDetailsModal";
import { useAuth } from "../Context/AuthContext";
import { useFavorites } from "../Context/FavoritesContext";
import { useRouter } from "next/navigation";
import PetCard from "../components/PetCard";
import { Pet } from "../utils/pet";

// interface Pet {
//   id: number;
//   name: string; 
//   type: "dog" | "cat" | "bird" | "rabbit" | "other";
//   otherAnimal?:string;
//   breed: string;
//  age: string;
//   gender: "male" | "female";
//   description: string;
//   adoptionFee: number;
//   image: string;
//   status: "Not Adopted" | "In Process" | "adopted";
//   location: string;
//   contactEmail: string;
//   contactPhone: string;
// }

const ProfilePage = () => {

  const [isEditing, setIsEditing] = useState(false);

  
  const { user: authUser, updateUser } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const user = authUser;
  const [editedUser, setEditedUser] = useState(user);



  const [pets, setPets] = useState<Pet[]>([
    {
      id: 1,
      name: "Buddy",
      type: "other",
      otherAnimal:"Hello-other-anikmal",
      breed: "Golden Retriever",
      age: "3",
      gender: "male",
      description: "Friendly and energetic dog, great with kids!",
      adoptionFee: 250,
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      status: "Not Adopted",
      location: "New York, NY",
      contactEmail: "admin@petadoption.com",
      contactPhone: "+1-555-0123",
    },
  ]);

  const [currentView, setCurrentView] = useState<
    "profile" | "add-pet" | "edit-pet"
  >("profile");
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    name: "",
    type: "dog",
    breed: "",
    otherAnimal:"",
    age: "1",
    gender: "male",
    description: "",
    adoptionFee: 0,
    image: "",
    status: "Not Adopted",
    location: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Pet management functions
  const resetForm = () => {
    setFormData({
      name: "",
      type: "other",
      otherAnimal:"",
      breed: "",
      age: "1",
      gender: "male",
      description: "",
      adoptionFee: 0,
      image: "",
      status: "Not Adopted",
      location: "",
      contactEmail: "",
      contactPhone: "",
    });
  };

  const handleAddPet = () => {
    const newPet: Pet = {
      ...formData,
      id: Date.now().toString(),
    };
    setPets([...pets, newPet]);
    resetForm();
    setCurrentView("profile");
  };

  const handleUpdatePet = () => {
    if (editingPet) {
      setPets(
        pets.map((pet) =>
          pet.id === editingPet.id
            ? {
                ...formData,
                id: editingPet.id,
              }
            : pet
        )
      );
      setEditingPet(null);
      resetForm();
      setCurrentView("profile");
    }
  };

  const router = useRouter();

  const handleViewDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Adopted":
        return "bg-green-100 text-green-800";
      case "In Process":
        return "bg-yellow-100 text-yellow-800";
      case "adopted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Profile functions
  const handleSave = () => {
    if (editedUser) {
       updateUser(editedUser);
       setIsEditing(false)
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Your Pets",
      value: pets.length,
      icon: PawPrint,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Favorites",
      value: favorites.length,
      icon: Heart,
      color: "from-red-500 to-pink-500",
    },
    {
      label: "Pet Lover",
      value: "100%",
      icon: Cat,
      color: "from-green-500 to-emerald-500",
    },
  ];

  // Pet form render function
  const renderPetForm = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <PawPrint className="h-6 w-6 mr-3 text-blue-600" />
        {currentView === "add-pet" ? "Add New Pet" : "Update Pet"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pet Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter pet name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as Pet["type"] })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* 👇 Show this only if "Other" is selected */}
        {formData.type === "other" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Animal Name
            </label>
            <input
              type="text"
              value={formData.otherAnimal}
              onChange={(e) =>
                setFormData({ ...formData, otherAnimal: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter animal name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed
          </label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter breed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseInt(e.target.value) })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value as Pet["gender"],
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adoption Fee ($)
          </label>
          <input
            type="number"
            value={formData.adoptionFee}
            onChange={(e) =>
              setFormData({
                ...formData,
                adoptionFee: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as Pet["status"],
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Not Adopted">Not Adopted</option>
            <option value="In Process">In Process</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contact@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData({ ...formData, contactPhone: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1-555-0123"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/pet-image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Describe the pet's personality, behavior, and any special needs..."
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={currentView === "add-pet" ? handleAddPet : handleUpdatePet}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium flex items-center"
        >
          <Save className="h-5 w-5 mr-2" />
          {currentView === "add-pet" ? "Add Pet" : "Update Pet"}
        </button>
        <button
          onClick={() => {
            resetForm();
            setEditingPet(null);
            setCurrentView("profile");
          }}
          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Pet card render function
  const renderPetCard = (pet: Pet) => (
    <div
      key={pet.id}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/20 overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={
            pet.image ||
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=300&fit=crop"
          }
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <p className="text-gray-600">
              {pet.breed} • {pet.age} years old
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              pet.status
            )}`}
          >
            {pet.status}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {pet.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            ${pet.adoptionFee}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(pet)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="View details"
            >
              <Eye className="h-4 w-4" />
            </button>           
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
          
          onClick={()=>router.push("/Login")}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 relative">
      {/* Background Paw Print Icons */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <PawPrint className="w-64 h-64 text-orange-400/10 rotate-12" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 pointer-events-none z-0">
        <PawPrint className="w-80 h-80 text-blue-400/10 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative ">
        {currentView === "profile" && (
          <>
            {/* Profile Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8 border border-white/20">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-32 relative"></div>

              <div className="relative px-8 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h1 className="text-3xl font-bold text-white mb-4">
                        {user.fullName}
                      </h1>
                      <p className="text-lg text-gray-600 mb-1">
                        {user.city}, {user.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        Pet lover & adoption advocate
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 mt-4 sm:mt-0"
                  >
                    {isEditing ? (
                      <X className="h-5 w-5 mr-2" />
                    ) : (
                      <Edit className="h-5 w-5 mr-2" />
                    )}
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-white/20"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Profile Details */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Profile Details
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: user.email as string,
                      key: "email",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: user.phoneNumber as string,
                      key: "phoneNumber",
                    },
                    {
                      icon: User,
                      label: "Gender",
                      value: user.gender as string,
                      key: "gender",
                    },
                    {
                      icon: MapPin,
                      label: "City",
                      value: `${user.city}`,
                      key: "city",
                    },
                    {
                      icon: Building,
                      label: "Country",
                      value: `${user.country}`,
                      key: "country",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">
                          {item.label}
                        </div>
                        {isEditing ? (
                          <input
                            type={item.key === "email" ? "email" : "text"}
                            value={
                              (editedUser?.[
                                item.key as keyof typeof editedUser
                              ] as string) || ""
                            }
                            onChange={(e) =>
                              setEditedUser((prev) =>
                                prev
                                  ? { ...prev, [item.key]: e.target.value }
                                  : prev
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="font-medium text-gray-900">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {/* Your Pets Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <PawPrint className="h-6 w-6 mr-3 text-blue-600" />
                    Your Pets ({pets.length})
                  </h3>
                  <button
                    onClick={() => setCurrentView("add-pet")}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Pet
                  </button>
                </div>

                {pets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map(renderPetCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PawPrint className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-600 mb-2">
                      No pets added yet
                    </h4>
                    <p className="text-gray-500 mb-6">
                      Start by adding your first pet for adoption!
                    </p>
                    <button
                      onClick={() => setCurrentView("add-pet")}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Add Your First Pet
                    </button>
                  </div>
                )}
              </div>
              {/* Favorite Pets */}
           
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Heart className="h-6 w-6 mr-3 text-red-500" />
                    Favorite Pets ({favorites.length})
                  </h3>
                </div>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((pet) => (
                      <PetCard
                        key={pet.id}
                        pet={pet}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-600 mb-2">
                      No favorites yet
                    </h4>
                    <p className="text-gray-500">
                      Start exploring and add some pets to your favorites!
                    </p>
                    <button
                      className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200"
                      onClick={() => router.push("/")}
                    >
                      Browse Pets
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {(currentView === "add-pet" || currentView === "edit-pet") &&
          renderPetForm()}

        {/* Pet Details Modal */}
        <PetDetailsModal
          pet={selectedPet}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onToggleFavorite={(petId) => {
            // Add your favorite toggle logic here
            console.log("Toggle favorite for pet:", petId);
          }}
          isFavorite={false}
          fromProfile={true}
        />
      </div>
    </div>
  );
};

export default ProfilePage;