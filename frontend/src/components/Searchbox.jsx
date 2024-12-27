import { LocateFixed, Mic, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Searchbox = () => {
  return (
    <div className="w-screen flex justify-center -mt-10">
     <div className="rounded-lg bg-base-100 p-4 w-1/2 lg:w-1/2">
     <div>
        <ul className="flex font-bold justify-around mb-2">
          <li>
            <Link to={"/buy"}>Buy</Link>
          </li>
          <li>
            <Link to={"/rent"}>Rent</Link>
          </li>
          <li>
            <Link to={"/pg"}>Pg/Co-living</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-2 l">
        <label className="w-full input input-bordered flex items-center gap-2">
        <Search />
          <input type="text" className="grow " placeholder="Search" />
         <Mic/>
         <LocateFixed />
         <button className="btn btn-sm bg-brand text-white">Search</button>
        </label>
      </div>
     </div>
    </div>
  );
};

export default Searchbox;
