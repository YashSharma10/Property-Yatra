import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchBoxSection = ({ visible }) => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    updateUnderlinePosition(index);
  };

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
    updateUnderlinePosition(0); // Initialize underline position for the first tab
  }, []);

  const tabs = [
    "Buy",
    "Rent",
    "New Launch",
    "PG / Co-living",
    "Commercial",
    "Plots / Land",
  ];

  return (
    <section className={`my-5 bg-transparent mt-80`}>
      <div className="flex justify-center flex-col items-center w-fit mx-auto p-4 shadow-md rounded-2xl bg-white">
        {/* Navigation Tabs */}
        <div ref={navRef} className="relative flex gap-6 text-lg sm:text-xl">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab, index)}
              className={`relative pb-1 ${
                activeTab === tab ? "text-brand font-semibold" : "text-gray-700"
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
          <button type="submit" className="p-1">
            <Search className="text-brand" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBoxSection;
