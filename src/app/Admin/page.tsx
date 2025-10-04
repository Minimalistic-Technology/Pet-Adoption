
"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Heart,
  Home,
  Phone,
  Mail,
  Calendar,
  MapPin,
  PawPrint,
  X,
  Star,
} from "lucide-react";

interface Pet {
  id: string;
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "other";
  breed: string;
  age: number;
  gender: "male" | "female";
  description: string;
  adoptionFee: number;
  image: string;
  status: "Not Adopted" | "In Process";
  location: string;
  contactEmail: string;
  contactPhone: string;
}

interface Program {
  id: number;
  name: string;
  price: number;
  level: "easy" | "medium" | "hard";
  description: string;
  duration: string;
  category: string;
  rating: string;
  features: string[];
  image: string;
}

const PetAdminDashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Buddy",
      type: "dog",
      breed: "Golden Retriever",
      age: 3,
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
    {
      id: "2",
      name: "Whiskers",
      type: "cat",
      breed: "Persian",
      age: 2,
      gender: "female",
      description: "Calm and affectionate cat, loves to cuddle.",
      adoptionFee: 150,
      image:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      status: "In Process",
      location: "Los Angeles, CA",
      contactEmail: "admin@petadoption.com",
      contactPhone: "+1-555-0124",
    },
  ]);

  const [currentView, setCurrentView] = useState<
    "list" | "add" | "edit" | "addProgram" | "editProgram"
  >("list");
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 1,
      name: "Puppy Socialization",
      category: "socialization",
      level: "easy",
      duration: "5 weeks",
      price: 120,
      rating: "4.6",
      image:
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Essential socialization skills for puppies aged 8-16 weeks. Build confidence and social skills.",
      features: [
        "Group Classes",
        "Play Sessions",
        "Safe Environment",
        "Expert Guidance",
      ],
    },
    {
      id: 2,
      name: "Advanced Obedience",
      category: "training",
      level: "medium",
      duration: "8 weeks",
      price: 200,
      rating: "4.8",
      image:
        "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Advanced training for dogs who have mastered basic commands. Improve focus and reliability.",
      features: [
        "Off-Leash Training",
        "Distraction Proofing",
        "Advanced Commands",
        "Personalized Feedback",
      ],
    },
    {
      id: 3,
      name: "Agility Fundamentals",
      category: "agility",
      level: "hard",
      duration: "6 weeks",
      price: 180,
      rating: "4.7",
      image:
        "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Introduction to agility equipment and handling. Build coordination and teamwork with your dog.",
      features: [
        "Equipment Introduction",
        "Handling Techniques",
        "Course Sequencing",
        "Confidence Building",
      ],
    },
  ]);

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programFormData, setProgramFormData] = useState<Omit<Program, "id">>({
    name: "",
    price: 0,
    level: "easy",
    description: "",
    duration: "",
    features: [],
    category: "",
    rating: "",
    image: "",
  });
  const [newFeature, setNewFeature] = useState("");

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || pet.type === filterType;
    const matchesStatus = filterStatus === "all" || pet.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

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

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProgramFormData({
        ...programFormData,
        features: [...programFormData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...programFormData.features];
    updatedFeatures.splice(index, 1);
    setProgramFormData({
      ...programFormData,
      features: updatedFeatures,
    });
  };

  const renderProgramForm = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {currentView === "addProgram" ? "Add New Program" : "Update Program"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentView === "editProgram" && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Program
            </label>
            <select
              value={editingProgram?.id || ""}
              onChange={(e) => {
                const selected = programs.find(
                  (p) => p.id === parseInt(e.target.value)
                );
                if (selected) {
                  setEditingProgram(selected);
                  setProgramFormData({
                    name: selected.name,
                    price: selected.price,
                    level: selected.level,
                    description: selected.description,
                    duration: selected.duration,
                    features: selected.features,
                    rating: selected.rating,
                    category: selected.category,
                    image: selected.image,
                  });
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select a Program --</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program Name
          </label>
          <input
            type="text"
            value={programFormData.name}
            onChange={(e) =>
              setProgramFormData({ ...programFormData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter program name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            value={programFormData.category}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                category: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="e.g. training, socialization"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($)
          </label>
          <input
            type="number"
            value={programFormData.price}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                price: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <input
            type="text"
            value={programFormData.rating}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                rating: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="e.g. 4.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={programFormData.level}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                level: e.target.value as Program["level"],
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <input
            type="text"
            value={programFormData.duration}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                duration: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="e.g. 6 weeks"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={programFormData.image}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                image: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Paste image URL here"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Add a feature"
              onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
            />
            <button
              onClick={handleAddFeature}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {programFormData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {feature}
                <button
                  onClick={() => handleRemoveFeature(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={programFormData.description}
            onChange={(e) =>
              setProgramFormData({
                ...programFormData,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Describe the program..."
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => {
            if (currentView === "addProgram") {
              const newProgram: Program = {
                ...programFormData,
                id: Date.now(),
              };
              setPrograms([...programs, newProgram]);
            } else if (editingProgram) {
              setPrograms(
                programs.map((p) =>
                  p.id === editingProgram.id
                    ? { ...programFormData, id: editingProgram.id }
                    : p
                )
              );
            }
            setEditingProgram(null);
            setProgramFormData({
              name: "",
              price: 0,
              level: "easy",
              description: "",
              duration: "",
              features: [],
              rating: "",
              category: "",
              image: "",
            });
            setCurrentView("list");
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {currentView === "addProgram" ? "Add Program" : "Update Program"}
        </button>
        <button
          onClick={() => {
            setEditingProgram(null);
            setCurrentView("list");
          }}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderProgramCard = (program: Program) => (
    <div
      key={program.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{program.name}</h3>
            <p className="text-gray-600 capitalize">
              {program.category} • {program.level}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {program.rating}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {program.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Features:
          </h4>
          <ul className="text-sm text-gray-600">
            {program.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="mb-1 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
            {program.features.length > 3 && (
              <li className="text-blue-600">
                +{program.features.length - 3} more
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-green-600">
            ${program.price}
          </span>
          <span className="text-sm text-gray-500">{program.duration}</span>
        </div>

        <div className="flex gap-2 mt-4 border-t border-gray-100">
          <button
            onClick={() => {
              setEditingProgram(program);
              setProgramFormData({
                name: program.name,
                price: program.price,
                level: program.level,
                description: program.description,
                duration: program.duration,
                features: program.features,
                rating: program.rating,
                category: program.category,
                image: program.image,
              });
              setCurrentView("editProgram");
            }}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => {
              setPrograms(programs.filter((p) => p.id !== program.id));
            }}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderPetCard = (pet: Pet) => (
    <div
      key={pet.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={pet.image || "/api/placeholder/400/300"}
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 max-w-9xl">
      <div className="container mx-auto px-4 py-8 max-w-9xl">
        {/* Header */}

        <div className="absolute bottom-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <PawPrint className="w-58 h-58 text-purple-400/10 -rotate-12" />
        </div>

        <div className="absolute bottom-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <PawPrint className="w-58 h-58 text-orange-400/10 -rotate-12" />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Pet Adoption Admin
              </h1>
              <p className="text-gray-600">
                Manage pets Not Adopted for adoption
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Total Pets: </span>
              <span className="font-bold text-blue-600">{pets.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Not Adopted: </span>
              <span className="font-bold text-green-600">
                {pets.filter((p) => p.status === "Not Adopted").length}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">In Process: </span>
              <span className="font-bold text-yellow-600">
                {pets.filter((p) => p.status === "In Process").length}
              </span>
            </div>
          </div>
        </div>

        {/* Program Management Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Program Management
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentView("addProgram")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="h-5 w-5" />
              Add Program
            </button>

            <button
              onClick={() => setCurrentView("editProgram")}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Edit2 className="h-5 w-5" />
              Edit Program
            </button>

            <button
              onClick={() => {
                const programToDelete = prompt(
                  "Enter the program ID to delete:"
                );
                if (programToDelete) {
                  setPrograms(
                    programs.filter((p) => p.id !== parseInt(programToDelete))
                  );
                }
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Trash2 className="h-5 w-5" />
              Delete Program
            </button>
          </div>
        </div>

        {/* Program Cards Display - Always visible when in list view */}
        {currentView === "list" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Training Programs
              </h2>
              {programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {programs.map(renderProgramCard)}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-gray-400 mb-4">
                    <PawPrint className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No programs available
                  </h3>
                  <p className="text-gray-500">
                    Click "Add Program" to create your first training program
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search pets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="dog">Dogs</option>
                    <option value="cat">Cats</option>
                    <option value="bird">Birds</option>
                    <option value="rabbit">Rabbits</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Not Adopted">Not Adopted</option>
                    <option value="In Process">In process</option>
                    <option value="adopted">Adopted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pet Grid */}
            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map(renderPetCard)}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-gray-400 mb-4">
                  <Heart className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No pets found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </>
        )}

        {(currentView === "addProgram" || currentView === "editProgram") &&
          renderProgramForm()}
      </div>
    </div>
  );
};

export default PetAdminDashboard;