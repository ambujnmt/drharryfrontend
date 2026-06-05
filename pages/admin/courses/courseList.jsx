import React, { useState } from "react";
import PrivateRoute from "../../../components/PrivateRoute/PrivateRoute";
import Header from "../../../components/Admin/Menu/Header";
import AdminSideMenu from "../../../components/Admin/Menu/SideMenu";
import Footer from "../../../components/Admin/Menu/Footer";
import CourseList from "../../../components/Admin/Courses/CourseList";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (


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
        <AdminSideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
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

        <div className="flex-1 overflow-auto  bg-gray-100">
          <CourseList />
        </div>

        <Footer />
      </div>
    </div>
  
  );
}
