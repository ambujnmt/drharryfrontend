import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  // Load admin info from localStorage when the component first mounts
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      setToken(parsedAdmin.token || "");
      setAdminEmail(parsedAdmin.email || "");
      setAdminId(parsedAdmin.admin_id || null);
      setAdminName(parsedAdmin.name || "");
    }
    setLoading(false); // After the check is done, set loading to false
  }, []);

  const loginAdmin = (adminData, email) => {
    const adminInfo = {
      token: adminData.token,
      name: adminData.name,
      admin_id: adminData.admin_id,
      email: email,
    };
    setAdmin(adminInfo);
    setToken(adminData.token);
    setAdminEmail(email);
    setAdminId(adminData.admin_id);
    setAdminName(adminData.name);
    localStorage.setItem("admin", JSON.stringify(adminInfo)); // Store in localStorage
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setToken("");
    setAdminEmail("");
    setAdminId(null);
    setAdminName("");
    localStorage.removeItem("admin"); // Remove from localStorage
  };

  // Return loading spinner if still loading
  if (loading) {
    return null; // Or show a loading spinner here
  }

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        adminEmail,
        adminId,
        adminName,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
