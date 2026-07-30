import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error, isFetched } = useAuth();
  const [user,setUser] = useState(null);
  const [isDone,setIsDone] = useState(false);

  useEffect(()=>{
    if (isLoading) return;

    // Successful fetch or explicit 401 (null). Do not clear user when
    // data is undefined after a transient error — keep last known session.
    if (data !== undefined) {
      setUser(data ?? null);
    }

    if (isFetched) {
      setIsDone(true);
    }
  },[data, isLoading, isFetched])

  return (
    <AuthContext.Provider value={{ user, isLoading, error , isDone, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
