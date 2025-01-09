// import { brandName } from "@/constants";
import { CircleUserRound } from "lucide-react";
import { Button } from "../button";
import logo from "@/assets/logo.png";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../dropdown-menu";
import InputSearch from "./InputSearch";
import MenuSheet from "./MenuSheet";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Function to handle profile navigation based on user role
  const handleProfileNavigation = () => {
    if (user?.role === "agent") {
      navigate("/agent-profile"); // Redirect to agent profile page
    } else {
      navigate("/profile"); // Redirect to regular user profile page
    }
  };
  console.log(user.role)

  return (
    <header className="sticky top-0 w-full z-50 shadow-lg py-2 flex justify-around bg-white">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className=" text-3xl font-bold text-brand hover:bg-transparent"
      >
        <img src={logo} alt="logo" className="h-11 w-fit" />
      </Button>
      <div className="w-full lg:max-w-md max-w-xs">
        {isVisible && <InputSearch />}
      </div>

      <div className="flex items-center gap-2">
        {/* Post Property button */}
        <Button onClick={() => navigate("/add")} className="hidden sm:block">
          Post property
          <span className="bg-green-500 text-white text-sm px-1 rounded-md">
            Free
          </span>
        </Button>

        {!user ? (
          <Button
            variant="outline"
            className="font-medium text-lg text-brand w-full border-brand"
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
        <MenuSheet />
      </div>
    </header>
  );
};

export default Navbar;
