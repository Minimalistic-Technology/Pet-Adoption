"use client"
import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  fullName: String;
  phoneNumber: String;
  email: String;
  password: String;
  gender: String;
  city: String;
  country: String;
  isAdmin? : boolean
}

interface AuthContextType {
    isAuthenticated : Boolean;
    user: User | null;
    login : (userData : User) => void;
    logout : () => void
}

// initial value undefined because it hels to idetify that the context is used within the  provider
const  AuthContext = createContext<AuthContextType | undefined> (undefined)



export const useAuth = () => {
    const context  = useContext (AuthContext);
    if(context === undefined)
      {
          throw new Error ("useAuth must be within an AuthProvider");
      }
      return context
}


interface AuthProviderProps {
    children : ReactNode
}


export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {
     const [isAuthenticated,setIsAuthenticated] = useState(false);
     const [user,setUser] = useState<User | null>(null);

     const login = (userData : User)  => {
             setIsAuthenticated(true);
             setUser(userData)

     }
 
     const logout = () => {
       setIsAuthenticated(false);
       setUser(null);
     };


     const value = {
        isAuthenticated,
        user,
        login,
        logout,
     };
      

     return <AuthContext.Provider value={value} >
        {children}
     </AuthContext.Provider>

}
