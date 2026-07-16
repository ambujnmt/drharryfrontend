import React, { useState } from "react";
import PrivateRoute from "../../../components/PrivateRoute/PrivateRoute";
import Header from "../../../components/Admin/Menu/Header";
import AdminSideMenu from "../../../components/Admin/Menu/SideMenu";
import Footer from "../../../components/Admin/Menu/Footer";
import FacultyList from "../../../components/Admin/Faculty/FacultyList";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
   <PrivateRoute adminOnly={true}>

    <div className="flex min-h-screen overflow-x-hidden">
       {menuOpen && (
         <div
           className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
           onClick={() => setMenuOpen(false)}
         />
       )}
 
       <div
         className={`
           ${menuOpen ? "w-64" : "w-0"}
           fixed lg:relative
           top-0 left-0 h-[100%] shadow-lg transition-all duration-300
           z-40
           lg:w-64
           
         `}
       >
         <AdminSideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
       </div>
 <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         <Header
           menuOpen={menuOpen}
           toggleMenu={() => setMenuOpen(!menuOpen)}
         />
 
       <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <FacultyList />
        </div>

        <Footer />
      </div>
    </div>

   </PrivateRoute>
  
  );
}
