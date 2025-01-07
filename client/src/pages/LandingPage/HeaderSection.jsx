import React, { useEffect, useRef, useState } from "react";
import header from "../../assets/header.png";
import sky from "../../assets/sky.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const HeaderSection = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);
  const navigate = useNavigate()
  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    console.log(activeTab);
    updateUnderlinePosition(index);
  };

  const handleSearch = async () =>{
    navigate("/property-listing")
    // try {
    //   await axios.get(`${BACKEND_URL}/api/properties/list`)
    // } catch (error) {
      
    // }
  }
  const updateUnderlinePosition = (index) => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll("button");
      const activeButton = buttons[index];
      const buttonRect = activeButton.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();
      const offsetLeft = buttonRect.left - parentRect.left;

      setUnderlineStyle({
        width: `${buttonRect.width}px`,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  };

  useEffect(() => {
    updateUnderlinePosition(0); 
  }, []);

  const tabs = [
    "Buy",
    "Rent",
    "New Launch",
    "PG / Co-living",
    "Commercial",
    "Plots / Land",
  ];

  const { isVisible } = useSelector((store) => store.globalEvent);

  return (
    <section
      className={`absolute top-10 right-0 left-0 transition-opacity duration-500 w-screen  ${
        !isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img src={sky} alt="header" className="w-full max-h-96" />

      {/* SearchBox */}
     
      <Card className="flex justify-center -mt-28 flex-col items-center max-w-md mx-auto p-4 shadow-md rounded-2xl bg-white">
        {/* Navigation Tabs */}
        <div ref={navRef} className="relative bg-white flex gap-6 text-sm sm:text-base">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab, index)}
              className={`relative pb-1 ${
                activeTab === tab ? "text-brand font-semibold bg-white" : "text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
          {/* Common Underline */}
          <div
            className="absolute bottom-0 h-[2px] bg-brand transition-transform duration-300 ease-in-out"
            style={underlineStyle}
          ></div>
        </div>
        {/* Divider */}
        <hr className="bg-brand h-0.5 w-full mt-2" />
        {/* Search Input */}
        <div className="flex w-full">
          <input
            className="w-full outline-none px-3"
            type="text"
            placeholder="Enter Locality / Project / Society / Landmark"
          />
          <button type="submit" className="p-1" onClick={handleSearch}>
            <Search className="text-brand" />
          </button>
        </div>
      </Card>
    </section>
  );
};

export default HeaderSection;
