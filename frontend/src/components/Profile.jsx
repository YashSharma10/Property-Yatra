import axios from "axios";
import {
  CircleUserRound,
  LogOut,
  MessageSquareHeart,
  UserPen,
} from "lucide-react";
import React from "react";

const Profile = () => {
  async function handleLogout() {
    await axios.get("http://localhost:3000/api/logout");
    localStorage.removeItem("authToken")
  }
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className=" m-1">
        <CircleUserRound />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow text-black font-mono"
      >
        <li>
          <a>User Name</a>
        </li>
        <li>
          <a>
            <UserPen />
            Profile
          </a>
        </li>
        <li>
          <a>
            <MessageSquareHeart />
            Shortlisted
          </a>
        </li>
        <li>
          <button onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
