import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, error } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
