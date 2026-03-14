import { createContext, ReactNode, useContext, useState } from "react";

interface Pet {
  id: number;
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "other";
  breed: string;
  age: string;
  gender: "male" | "female";
  description: string;
  adoptionFee: number;
  image: string;
  status: "Not Adopted" | "In Process" | "adopted";
  location: string;
  contactEmail: string;
  contactPhone: string;
}



interface FavoritesContextType {
  favorites: Pet[];
  addToFavorites: (pet: Pet) => void;
  removeFromFavorites: (petId: number) => void;
  isFavorite: (petId: number) => boolean;
  toggleFavorite: (pet: Pet) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

// Sample favorite pets data for demo
const sampleFavoritePets: Pet[] = [
  {
    id: 1,
    name: "Max",
    breed: "German Shepherd",
    age: "2",
    gender: "male",
    location: "Bhopal",
    status: "Not Adopted",
    image:
      "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=300",
    type: "dog",
    description: "hello",
    adoptionFee: 200,
    contactEmail: "email@gmail.com",
    contactPhone: "227637376736",
  },
  {
    id: 2,
    name: "Bella",
    breed: "Siamese Cat",
    age: "3",
    gender: "female",
    location: "Bhopal",
    status: "In Process",
    image:
      "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=300",
    type: "cat",
    description: "hello",
    adoptionFee: 200,
    contactEmail: "email@gmail.com",
    contactPhone: "227637376736",
  },
  {
    id: 6,
    name: "Mia",
    breed: "Russian Blue",
    age: "2 years",
    gender: "female",
    location: "Mumbai",
    status: "Not Adopted",
    image:
      "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=300",
    type: "cat",
    description: "hello",
    adoptionFee: 200,
    contactEmail: "email@gmail.com",
    contactPhone: "227637376736",
  },
];

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Pet[]>(sampleFavoritePets);

  const addToFavorites = (pet: Pet) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === pet.id)) {
        return prev; // Already in favorites
      }
      return [...prev, pet];
    });
  };

  const removeFromFavorites = (petId: number) => {
    setFavorites((prev) => prev.filter((pet) => pet.id !== petId));
  };

  const isFavorite = (petId: number) => {
    return favorites.some((pet) => pet.id === petId);
  };

  const toggleFavorite = (pet: Pet) => {
    if (isFavorite(pet.id)) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet);
    }
  };


  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
