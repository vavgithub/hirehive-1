import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error } = useAuth();
  const [user,setUser] = useState(null);

  useEffect(()=>{
    if(!isLoading){
      setUser(data)
    }
  },[user,isLoading])

  return (
    <AuthContext.Provider value={{ user, isLoading, error ,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
