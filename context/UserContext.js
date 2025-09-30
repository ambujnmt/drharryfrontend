import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new loading flag

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // finished checking localStorage
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
