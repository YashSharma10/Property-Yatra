// import { brandName } from "@/constants";
import logo from "@/assets/logo.png";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { Button } from "../button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 w-full z-50 shadow-lg py-2 px-4 flex justify-between bg-white">
      <button
        variant="ghost"
        onClick={() => navigate("/")}
        className="text-xl font-bold text-brand cursor-pointer"
      >
        PropertyYatra
        {/* <img src={logo} alt="logo" className="h-11 " /> */}
      </button>

      <div className="flex items-center gap-4">
        {/* Tools Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            className="text-brand border-brand flex items-center"
            onClick={toggleDropdown}
          >
            Tools
            <ChevronDown size={16} className="ml-2" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/comingsoon")}
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
        </div>

        {/* Home Loan Button */}
        <Button
          variant="outline"
          className="text-brand border-brand"
          onClick={() => navigate("/comingsoon")}
        >
          Home Loan
        </Button>

        {/* Services Button */}
        <Button
          variant="outline"
          className="text-brand border-brand"
          onClick={() => navigate("/comingsoon")}
        >
          Services
        </Button>

        {!token ? (
          <Button
            variant="outline"
            className="text-brand w-full border-brand"
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
      </div>
    </header>
  );
};

export default Navbar;
