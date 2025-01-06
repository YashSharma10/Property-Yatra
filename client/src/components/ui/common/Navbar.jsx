import { brandName } from "@/constants";
import { CircleUserRound } from "lucide-react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import InputSearch from "./InputSearch";
import MenuSheet from "./MenuSheet";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <header className="w-full shadow-lg py-2 px-8 flex justify-around bg-white fixed z-20 top-0 h-[6vh]">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className=" text-3xl font-bold text-brand"
      >
        {brandName}
      </Button>
      <div className="w-full lg:max-w-md max-w-xs">
        {isVisible && <InputSearch />}
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate("/add-property")}>
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound size={30} className="text-brand" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 mt-4">
              <DropdownMenuLabel>
                <Link to={"/profile"}>My Activity</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Recently Searched</DropdownMenuItem>
              <DropdownMenuItem>Recently Viewed</DropdownMenuItem>
              <DropdownMenuItem>Shortlisted</DropdownMenuItem>
              <DropdownMenuItem>Contacted</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <MenuSheet />
      </div>
    </header>
  );
};

export default Navbar;
