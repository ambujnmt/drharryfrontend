import React from "react";

export default function HomeFooter() {
  return (
    <footer className="bg-[#5278FF] text-white py-12 px-6 md:px-20 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-semibold leading-tight">
          Your health <br />
          Our priority.
          </h1>
          <p className="mt-10 text-sm text-white/80">
            2025 Ibey Design. Allright reserved
          </p>
        </div>

        {/* Right Side */}
        <div className="text-right space-y-4 items-end">
          {/* Navigation */}
          <nav className="grid grid-cols-2  gap-8 text-white">
            <a href="#" className="text-yellow-400 font-medium">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400">Servizi</a>
            <a href="#" className="hover:text-yellow-400">Menu</a>
            <a href="#" className="hover:text-yellow-400">Contatti</a>
          </nav>

          {/* Logo */}
          <div className="mt-4 ml-5">
            <img
              src="https://nmtdevserver.com/welli/logo.png"
              alt="Logo"
              className="w-24 md:w-28 xl:w-40"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}


