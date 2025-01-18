// import { brandName } from "@/constants";
import logo from "@/assets/logo.png";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../button";

const Navbar = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const handleProfileNavigation = () => {
    if (JSON.parse(sessionStorage.getItem("user"))?.role === "agent") {
      navigate("/agent-profile");
    } else {
      navigate("/profile");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-lg py-2 px-4 bg-white flex items-center justify-between">
      {/* Brand Logo */}
      <button
        onClick={() => navigate("/")}
        className="text-xl font-bold text-brand cursor-pointer flex items-center gap-2"
      >
        PropertyYatra
        {/* <img src={logo} alt="logo" className="h-11" /> */}
      </button>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        {/* Tools Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 cursor-pointer hover:text-brand"
            onClick={toggleDropdown}
          >
            Tools
            <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/emicalculator")}
              >
                EMI Calculator
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/rent-agreement")}
              >
                Rent Agreement
              </button>
            </div>
          )}
        </div>

        {/* Other Links */}
        <button
          className="cursor-pointer hover:text-brand"
          onClick={() => navigate("/comingsoon")}
        >
          Home Loan
        </button>
        <button
          className="cursor-pointer hover:text-brand"
          onClick={() => navigate("/comingsoon")}
        >
          Services
        </button>
        <Button
          className="cursor-pointer b"
          onClick={() => navigate("/add")}
        >
          Post a Property
        </Button>

        {!token ? (
          <Button
            className="cursor-pointer bg-brand"
            onClick={() => navigate("/auth")}
          >
            Login / Register
          </Button>
        ) : (
          <CircleUserRound
            size={30}
            onClick={handleProfileNavigation}
            className="cursor-pointer"
          />
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-brand text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start md:hidden">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            Tools
          </button>
          {isDropdownOpen && (
            <div className="w-full border-t">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/Emicalculator")}
              >
                EMI Calculator
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/comingsoon")}
              >
                Rent Agreement
              </button>
            </div>
          )}
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate("/comingsoon")}
          >
            Home Loan
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate("/add")}
          >
            Post a Property
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate("/comingsoon")}
          >
            Services
          </button>
          {!token ? (
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/auth")}
            >
              Login / Register
            </button>
          ) : (
            <CircleUserRound
              size={30}
              onClick={handleProfileNavigation}
              className="cursor-pointer px-4 py-2"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
