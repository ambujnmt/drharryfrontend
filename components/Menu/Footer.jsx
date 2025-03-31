import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-black py-2 px-4 text-center text-sm md:text-base lg:text-lg">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
}
