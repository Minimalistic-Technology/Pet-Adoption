"use client";
import { ArrowLeft, Eye, EyeOff, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React,{useState} from "react";
import { useAuth } from "../Context/AuthContext";

const page: React.FC = () => {
const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState
("");
const [showPassword,setShowPassword] = useState(false);
 
const {login}  = useAuth();

const habdleSubmit = (e: { preventDefault: () => void; }) => {
          e.preventDefault();


 if (email === "admin@com" && password === "admin123") {
    
  const adminUser = {
    fullName: "Admin User",
    phoneNumber: "1234567890",
    email: email,
    password: password,
    gender: "male",
    city: "Mumbai",
    country: "India",
    profilePicture: undefined,
    isAdmin: true, // Add admin flag
  };

  login(adminUser);
  setPassword("");
  setEmail("")
  router.push("/Admin")
  return


 }

        const mockUser = {
          fullName: "Vyom",
          phoneNumber: "1234567890",
          email: email,
          password: password,
          gender: "male",
          city: "Mumbai",
          country: "India",
          profilePicture: undefined,          
        };

        login(mockUser);
        
        alert("Login successfull");
          setPassword("");
          setEmail("");
        router.push("/") ;
}


  return (
   
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <button className="fixed top-6 left-6 p-2 rounded-xl">
          <ArrowLeft className="h-6 w-6 text-gray-600" onClick={
            ()=> {
                  router.push("/")  
          } }/>
        </button>

        {/* card */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          {/* logo */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-amber-500 to-red-300 flex justify-center items-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mt-5 text-center">
            Login
          </h1>

          <p className="text-gray-600 text-center mt-2">
            Join our pet adoption community
          </p>

          <form className="mt-10" onSubmit={habdleSubmit}>
            <input
              type="email"
              required
              className="w-full border py-3 text-black rounded-lg text-lg px-4 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Email"
              onChange={(e)=> {
                setEmail(e.target.value); 
              }}
              value={email}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full border py-3 text-black rounded-lg text-lg px-4 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none mt-6 bg-gray-50   
              "
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              
                placeholder="Password"
              />

              <button  type="button"   className="absolute right-3 top-1/2 transform" onClick={
                () => setShowPassword(!showPassword)
              }>
                { showPassword ?  <EyeOff className="w-5 h-5" /> :  <Eye className="w-5 h-5" /> }
              </button>
            </div>

            <button
              className="w-full text-center mt-4  bg-amber-500
            rounded-xl py-4 text-xl text-white"
    
            type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
 
  );
};

export default page;
