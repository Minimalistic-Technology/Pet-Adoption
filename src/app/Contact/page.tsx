"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Users,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const ContactInfo: React.FC = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: ["(555) 123-PETS", "(555) 123-7387"],
      color: "orange",
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["adopt@pawheartrescue.com", "info@pawheartrescue.com"],
      color: "blue",
      description: "Send us detailed inquiries",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Rescue Lane", "Pet City, PC 12345"],
      color: "green",
      description: "Come meet our animals",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
      color: "purple",
      description: "We're here to help",
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: "24-Hour Response",
      description: "We respond to all inquiries within 24 hours",
    },
    {
      icon: Users,
      title: "Expert Matching",
      description: "Our team helps find your perfect companion",
    },
    {
      icon: Heart,
      title: "Ongoing Support",
      description: "Lifetime support for all our adoptions",
    },
    {
      icon: MessageCircle,
      title: "Free Consultation",
      description: "No-cost adoption counseling sessions",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: "bg-orange-100 text-orange-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600"
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Contact Info */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="flex items-start space-x-4 group">
                <div
                  className={`w-12 h-12 ${getColorClasses(
                    method.color
                  )} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {method.title}
                  </h4>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                  <p className="text-sm text-gray-500 mt-1">
                    {method.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h4 className="text-xl font-bold text-gray-900 mb-6">
          Why Choose MT Adoption Rescue?
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Icon className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-gray-900 text-sm">
                    {feature.title}
                  </h5>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl shadow-xl p-6 text-white">
        <h4 className="font-bold mb-2 flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          Emergency Pet Situations
        </h4>
        <p className="text-sm opacity-90 mb-3">
          For urgent pet emergencies or after-hours adoption situations, call
          our emergency line:
        </p>
        <p className="font-semibold text-lg">(555) URGENT-1</p>
        <p className="text-xs opacity-80 mt-2">
          Available 24/7 for critical situations only
        </p>
      </div>

      {/* Social Proof */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-3">
          <Heart className="w-6 h-6 text-pink-500" />
          <span className="text-2xl font-bold text-gray-900">2,500+</span>
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
        <p className="text-gray-600 font-semibold">Happy Adoptions Completed</p>
        <p className="text-sm text-gray-500 mt-1">
          Join thousands of families who found their perfect companion through
          us
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
