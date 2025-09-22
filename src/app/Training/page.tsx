"use client"
import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Users,
  Video,
  Star,
  MessageCircle,
  TrendingUp,
  PawPrint,
  Brain,
  Gift,
  Camera,
} from "lucide-react";

interface TrainingProgram {
  id: number;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

const PetTrainingDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const trainingPrograms: TrainingProgram[] = [
    {
      id: 1,
      title: "Basic Obedience Training",
      category: "obedience",
      level: "Beginner",
      duration: "6 weeks",
      price: 150,
      rating: 4.8,
      studentsCount: 1250,
      image:
        "https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Perfect foundation training for puppies and new dogs. Learn essential commands like sit, stay, come, and heel.",
      features: [
        "Live Sessions",
        "Video Library",
        "Progress Tracking",
      ],
    },
    {
      id: 2,
      title: "Advanced Agility Training",
      category: "agility",
      level: "Advanced",
      duration: "8 weeks",
      price: 280,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "High-level agility training for competitive dogs. Master jumps, tunnels, weave poles, and complex courses.",
      features: [
        "Equipment Guide",
        "Competition Prep",
        "Expert Coaching",
        "Video Analysis",
      ],
    },
    {
      id: 3,
      title: "Behavioral Correction",
      category: "behavior",
      level: "Intermediate",
      duration: "4 weeks",
      price: 200,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/4498292/pexels-photo-4498292.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Address common behavioral issues like excessive barking, jumping, and separation anxiety.",
      features: [
        "Problem Analysis",
        "Custom Solutions",
        "Family Training",
        "Follow-up Support",
      ],
    },
    {
      id: 4,
      title: "Puppy Socialization",
      category: "socialization",
      level: "Beginner",
      duration: "5 weeks",
      price: 120,
      rating: 4.6,
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
  ];


  const filteredPrograms = trainingPrograms.filter((program) => {
    const matchesFilter =
      activeFilter === "all" || program.category === activeFilter;
    const matchesSearch = program.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderFilterButton = (filter: string) => {
    const isActive = activeFilter === filter;
    const labels: Record<string, string> = {
      all: "All Programs",
      obedience: "Obedience",
      agility: "Agility",
      behavior: "Behavior",
      socialization: "Socialization",
    };

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
        {labels[filter]}
      </button>
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Paw Print Icons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <PawPrint className="w-96 h-96 text-orange-400/10 rotate-12" />
      </div>
      <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <PawPrint className="w-64 h-64 text-blue-400/10 rotate-45" />
      </div>

      <div className="max-w-9xl mx-auto px-6 py-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Pet Training Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your pet's behavior with expert-led training programs
            designed for every skill level and need.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-600">15K+</span>
            </div>
            <h3 className="font-semibold text-gray-900">Trained Pets</h3>
            <p className="text-sm text-gray-600">
              Successfully completed programs
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">500+</span>
            </div>
            <h3 className="font-semibold text-gray-900">Expert Trainers</h3>
            <p className="text-sm text-gray-600">Certified professionals</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">50+</span>
            </div>
            <h3 className="font-semibold text-gray-900">Training Programs</h3>
            <p className="text-sm text-gray-600">Comprehensive courses</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Star className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">4.9</span>
            </div>
            <h3 className="font-semibold text-gray-900">Average Rating</h3>
            <p className="text-sm text-gray-600">Customer satisfaction</p>
          </div>
        </div>

     
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search training programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {["all", "obedience", "agility", "behavior", "socialization"].map(
                renderFilterButton
              )}
            </div>
          </div>
        </div>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {program.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                          program.level
                        )}`}
                      >
                        {program.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {program.rating}
                        </span>
                     
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {program.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex mt-auto flex-shrink-0 items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-green-600">
                    ${program.price}
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center mb-10">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No training programs found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Start Training Your Pet?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of pet parents who have successfully trained their
              companions with our expert-led programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                Browse All Programs
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetTrainingDashboard;
