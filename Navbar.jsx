import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-black drop-shadow-md cursor-pointer">
          SkyFly ✈️
        </h1>

        {/* NAV MENU */}
        <nav className="hidden md:flex gap-6 text-black font-medium">
          <a className="hover:text-yellow-300 transition duration-300 cursor-pointer">Home</a>
          <a className="hover:text-yellow-300 transition duration-300 cursor-pointer">Tiket</a>
          <a className="hover:text-yellow-300 transition duration-300 cursor-pointer">Promo</a>
          <a className="hover:text-yellow-300 transition duration-300 cursor-pointer">Destinasi</a>
        </nav>

        {/* LOGIN BUTTON */}
        <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition duration-300">
          Login
        </button>
      </div>
    </header>
  );
}
