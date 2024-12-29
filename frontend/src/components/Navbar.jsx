import { Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { brandName } from "../constants/brand";
import Profile from "./Profile";
import { authStatus } from "../utils/checkAuthenication";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = authStatus.isAuthenticated;
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3 flex-1">
          <div
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            {brandName}
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden ">
          <button
            onClick={toggleMenu}
            className="text-3xl transition transform duration-300 hover:scale-110"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Centered Navigation Menu for Desktop */}
        <div className="hidden lg:flex justify-center items-center flex-grow">
          <ul className="flex space-x-8 font-medium">
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/">Home</Link>
            </li>
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Search Icon for Desktop */}
        <div className="hidden lg:flex items-center ml-8">
          <button className="text-xl hover:text-blue-400 transition transform duration-300 ease-in-out">
            <Search />
          </button>
        </div>

        {/* Mobile Menu and Search */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4 space-y-4 transition-all duration-500`}
        >
          <ul className="space-y-4 text-center font-medium">
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/">Home</Link>
            </li>
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500">
              <Link to="/contact">Contact</Link>
            </li>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="text-xl hover:text-blue-400 transition transform duration-300 ease-in-out">
                <Search />
              </button>
            </div>
          </ul>
        </div>

        <div className="ml-4">
          {!user ? (
            <button
              className="btn btn-outline btn-info"
              onClick={() => navigate("/auth")}
            >
              Register/Login
            </button>
          ) : (
            <Profile />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
