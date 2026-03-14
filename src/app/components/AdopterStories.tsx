"use client"
import { Heart } from 'lucide-react'
import React from 'react'

  const adoptersStories = [
    {
      id: 1,
      adopterName: "Sarah Johnson",
      petName: "Buddy",
      petType: "Golden Retriever",
      testimonial:
        "Buddy has brought so much joy to our family! He's incredibly loving and has adapted perfectly to our home. Best decision ever!",
      rating: 5,
      date: "2024-09-08",
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 2,
      adopterName: "Mike Chen",
      petName: "Whiskers",
      petType: "Persian Cat",
      testimonial:
        "Whiskers is the perfect companion. She's gentle, playful, and has made our house feel like a real home.",
      rating: 5,
      date: "2024-09-07",
      image:
        "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 3,
      adopterName: "Emily Davis",
      petName: "Luna",
      petType: "Labrador Mix",
      testimonial:
        "Luna is amazing with our kids. She's patient, protective, and full of energy. We couldn't ask for a better family dog!",
      rating: 5,
      date: "2024-09-06",
      image:
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 4,
      adopterName: "John Smith",
      petName: "Mittens",
      petType: "Tabby Cat",
      testimonial:
        "Mittens has been the perfect addition to our family. He's calm, affectionate, and brings us so much happiness every day.",
      rating: 4,
      date: "2024-09-05",
      image:
        "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 5,
      adopterName: "Lisa Wilson",
      petName: "Rex",
      petType: "Border Collie",
      testimonial:
        "Rex is incredibly smart and loyal. The adoption process was smooth, and the staff was so helpful in matching us with the perfect pet.",
      rating: 5,
      date: "2024-09-04",
      image:
        "https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];



const AdopterStories = () => {
  return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="bg-purple-100 p-2.5 rounded-xl mr-3">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    Adopter Stories
                  </h2>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {adoptersStories.map((story) => (
                      <div
                        key={story.id}
                        className="p-4 hover:bg-gray-50 rounded-xl transition-colors group border border-gray-100"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <img
                            src={story.image}
                            alt={story.petName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-gray-300 transition-colors"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-base text-gray-900 truncate">
                                {story.adopterName}
                              </p>
                            
                            </div>
                            <p className="text-sm text-gray-600">
                              Adopted {story.petName} • {story.petType}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          "{story.testimonial}"
                        </p>
                        <p className="text-xs text-gray-500">{story.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  )
}

export default AdopterStories