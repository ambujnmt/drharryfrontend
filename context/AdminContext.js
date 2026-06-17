import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = Cookies.get("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    const storedEmail = sessionStorage.getItem("adminEmail");

    if (storedEmail) {
      setAdminEmail(storedEmail);
    }

    setLoading(false);
  }, []);

  const loginAdmin = (adminData, token) => {
    Cookies.set("admin", JSON.stringify(adminData), {
      expires: 7,
    });

    Cookies.set("token", token, {
      expires: 7,
    });

    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    Cookies.remove("admin");
    Cookies.remove("token");
    sessionStorage.removeItem("adminEmail");

    setAdmin(null);
    setAdminEmail("");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
        loading,
        adminEmail,
        setAdminEmail,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);