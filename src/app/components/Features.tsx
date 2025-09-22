import React from "react";
import {
  Heart,
  Shield,
  Users,
  MapPin,
  Bell,
  Camera,
  Stethoscope,
  Award,
  Clock,
  MessageCircle,
  Star,
  Home,
} from "lucide-react";

const PetAdoptionFeatures = () => {
  const features = [
    {
      icon: Heart,
      title: "Smart Matching",
      description:
        "AI-powered compatibility matching based on lifestyle, preferences, and pet personality to find your perfect companion.",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: Shield,
      title: "Verified Health Records",
      description:
        "Complete medical history, vaccination records, and health certificates verified by licensed veterinarians.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Users,
      title: "Meet & Greet",
      description:
        "Schedule safe, supervised meetings with pets before adoption to ensure the perfect match for your family.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: MapPin,
      title: "Local Shelters Network",
      description:
        "Connect with trusted shelters and rescue organizations in your area with real-time availability updates.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description:
        "Get alerts when new pets matching your criteria become available or when your favorites get updates.",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: Camera,
      title: "Virtual Tours",
      description:
        "Take 360° virtual tours of shelters and see pets in their environment before visiting in person.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      icon: Stethoscope,
      title: "Vet Consultation",
      description:
        "Connect with veterinarians for pre-adoption consultations and post-adoption care guidance.",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      icon: Award,
      title: "Adoption Support",
      description:
        "Comprehensive adoption guides, training resources, and 24/7 support during your pet's transition.",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description:
        "Track your adoption journey from application to bringing your new family member home.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      icon: MessageCircle,
      title: "Community Chat",
      description:
        "Connect with other pet parents, share experiences, and get advice from the adoption community.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: Star,
      title: "Success Stories",
      description:
        "Read inspiring adoption stories and share your own journey to help other families find their perfect pet.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      icon: Home,
      title: "Home Assessment",
      description:
        "Optional virtual home assessments to ensure your space is ready and safe for your new pet.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Why Choose Our Pet Adoption Platform?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Discover the features that make finding your perfect companion
            easier, safer, and more rewarding than ever before.
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group ${feature.bgColor} ${feature.borderColor} border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg shadow-md`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-3 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Find Your Perfect Companion?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of families who have found their forever friends
              through our platform. Start your adoption journey today and
              experience the joy of giving a pet a loving home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                Start Your Search
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        {/* <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                25,000+
              </div>
              <div className="text-gray-600">Successful Adoptions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">500+</div>
              <div className="text-gray-600">Partner Shelters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                15,000+
              </div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PetAdoptionFeatures;
