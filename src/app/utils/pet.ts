export interface Pet {
  id: number;
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "other";
  otherAnimal?: string;
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
