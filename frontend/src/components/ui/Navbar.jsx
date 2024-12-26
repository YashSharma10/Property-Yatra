import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex bg-slate-100 h-36 justify-between pt-3">
      <span className="text-2xl">Property</span>
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link to={"/buy"}>Buy</Link>
          </li>
          <li>
            <Link to={"/rent"}>Rent</Link>
          </li>
          <li>
            <Link to={"/pg"}>Pg</Link>
          </li>
        </ul>
      </nav>
      <div>
        Post property<span>Free</span>
      </div>
    </header>
  );
};

export default Navbar;
