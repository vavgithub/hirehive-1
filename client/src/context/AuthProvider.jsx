import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, error } = useAuth();
  const [hasUser,setHasUser] = useState(false);

  useEffect(() => { 
    if(user){
      setHasUser(true)
    }else{
      setHasUser(false)
    }
  } ,[user])

  return (
    <AuthContext.Provider value={{ user, hasUser,setHasUser, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
