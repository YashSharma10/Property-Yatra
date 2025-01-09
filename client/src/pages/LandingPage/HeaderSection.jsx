import React, { useEffect, useRef, useState } from "react";
import header from "../../assets/header.png";
import sky from "../../assets/sky.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { setFilters } from "@/redux/slices/globalEvent";

const HeaderSection = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const [activeTab, setActiveTab] = useState("Buy");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    
  };

  const handleSearch =  (e) => {
    navigate("/property-listing");
    // dispatch(setFilters({ propertyType: activeTab.toLowerCase(), searchLocation: e.target.value }));
    console.log(filters);
  };

  const tabs = ["Buy", "Rent", "PG", "Commercial", "Plots"];

  const { isVisible } = useSelector((store) => store.globalEvent);

  return (
    <section
      className={`absolute top-10 right-0 left-0 transition-opacity duration-500 w-screen z-10 ${
        isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img src={sky} alt="header" className="w-full max-h-96" />

      {/* SearchBox */}
      <div className="relative -mt-20 z-50 ">
        <Card className="flex flex-col items-center max-w-xs sm:max-w-md mx-auto p-4 shadow-md rounded-3xl bg-white">
          {/* Navigation Tabs */}
          <div className="flex gap-4 w-full justify-center mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`pb-2 text-sm font-medium ${
                  activeTab === tab
                    ? "text-brand border-b-2 border-brand"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center w-full border overflow-hidden rounded-xl">
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchLocation}
              onChange={handleSearch}
              className="w-full px-3 py-2 outline-none text-sm"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="p-2 bg-brand text-white"
            >
              <Search />
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HeaderSection;
