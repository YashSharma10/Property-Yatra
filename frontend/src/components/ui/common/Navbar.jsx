// import { brandName } from "@/constants";
import logo from "@/assets/logo.png";
import { CircleUserRound } from "lucide-react";
import { Button } from "../button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "@/hooks/useAuthCheck";

const Navbar = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));

  const handleProfileNavigation = () => {
    if (JSON.parse(sessionStorage.getItem("user"))?.role === "agent") {
      navigate("/agent-profile");
    } else {
      navigate("/profile");
    }
  };
  console.log("user",JSON.parse(sessionStorage.getItem("user")));
  

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

      {/* <div className="w-full lg:max-w-md max-w-xs">
        {isVisible && <InputSearch />}
      </div> */}

      <div className="flex items-center gap-2">
        {/* Post Property button */}
        <Button onClick={() => navigate("/add")} className="hidden sm:block">
          Post property
          <span className="bg-green-500 text-white text-sm px-2 ml-2 rounded-md">
            Free
          </span>
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
        {/* <MenuSheet /> */}
      </div>
    </header>
  );
};

export default Navbar;
