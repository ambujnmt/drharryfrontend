import React, { useState } from "react";
import SideMenu from "../../components/Menu/SideMenu";
import Header from "../../components/Menu/Header";
import Footer from "../../components/Menu/Footer";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Total from "../../components/Doctor/Total";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    <PrivateRoute>

    <div className="flex">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`
          ${menuOpen ? "w-64" : "w-0 overflow-hidden"}
          fixed lg:relative
          top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300
          z-40
          lg:w-64
          
        `}
      >
        <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${menuOpen ? "ml-0" : "ml-0"} 
         
        `}
      >
        <Header
          menuOpen={menuOpen}
          toggleMenu={() => setMenuOpen(!menuOpen)}
        />

        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <Total />
        </div>

        <Footer />
      </div>
    </div>
    </PrivateRoute>
  );
}
