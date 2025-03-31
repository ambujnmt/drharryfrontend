import React, { useState } from "react";
import SideMenu from "../components/Menu/SideMenu";
import Header from "../components/Menu/Header";
import Footer from "../components/Menu/Footer";
import Dashboard from "../components/Dashboard/Dashboard"; // Import the new component

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="flex">
      {/* Side Menu - Fixed and Non-Scrollable */}
      <div className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ${menuOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <SideMenu />
      </div>

      {/* Main Content - Flexible and Scrollable */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0"}`}>
        {/* Header - Stays on Top */}
        <Header menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />

        {/* Scrollable Dashboard Section */}
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <Dashboard />
        </div>

        {/* Footer - Stays at the Bottom */}
        <Footer />
      </div>
    </div>
  );
}
