import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState(null); // ✅ new
  const [adminName, setAdminName] = useState(""); // ✅ optional

  // Load admin info from localStorage on first load
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      setToken(parsedAdmin.token || "");
      setAdminEmail(parsedAdmin.email || "");
      setAdminId(parsedAdmin.admin_id || null); // ✅ load admin_id
      setAdminName(parsedAdmin.name || ""); // ✅ load name
    }
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
    localStorage.setItem("admin", JSON.stringify(adminInfo));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setToken("");
    setAdminEmail("");
    setAdminId(null);
    setAdminName("");
    localStorage.removeItem("admin");
  };

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
