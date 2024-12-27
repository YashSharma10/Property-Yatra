import React, { useState } from "react";
import { Link } from "react-router-dom";
import { brandName } from "../constants/brand";
import { Headset, UserRound } from "lucide-react";
import banner from "../assets/banner.jpeg";
function Navbar() {
  return (
    <nav
      className="navbar bg-base-100 min-h-72 bg-cover bg-center "
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl font-extrabold">{brandName}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <Link to={"/buyers"}>For Buyers</Link>
          </li>
          <li>
            <Link to={"/owners"}>For Owners</Link>
          </li>
          <li className="bg-slate-200 rounded-md">
            <Link to={"/post-property"}>
              Post property
              <span className="bg-green-500 animate-bounce px-1 text-white">
                Free
              </span>
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <Headset />
              </summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <UserRound />
              </summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
