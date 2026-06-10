import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
    });

    Cookies.set("token", token, {
      expires: 7,
    });

    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);