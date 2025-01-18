import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { setFilters } from "@/redux/slices/globalEvent";
import banner from "../../assets/banner.jpg";
import { Button } from "@/components/ui/button";

const HeaderSection = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const [activeTab, setActiveTab] = useState("Sell");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    if (tab === "Rent" || tab === "Sell") {
      dispatch(setFilters({ listingType: tab.toLowerCase() }));
    } else {
      dispatch(setFilters({ propertyType: tab.toLowerCase() }));
    }
    setActiveTab(tab);
  };

  const handleSearch = () => {
    navigate("/property-listing");
  };

  const tabs = ["Sell", "Rent", "PG", "Commercial", "Plot"];

  const { isVisible } = useSelector((store) => store.globalEvent);

  return (
    //  ${isVisible ? "opacity-0 pointer-events-none" : "opacity-100"

    <section
      className={`absolute top-10 right-0 left-0 transition-opacity duration-500 w-screen z-10}`}
    >
      <img src={banner} alt="header" className="w-full h-80 object-fill" />

      {/* SearchBox */}
      <div className="relative -mt-20 z-10 ">
        <Card className="flex flex-col items-center max-w-xs sm:max-w-xl mx-auto p-2 sm:p-4 shadow-md rounded-2xl bg-white">
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
            <Search className="ml-2" />
            <input
              type="text"
              placeholder="Enter city Location..."
              value={filters.searchLocation}
              onChange={(e) =>
                dispatch(
                  setFilters({
                    searchLocation: e.target.value,
                  })
                )
              }
              className="w-full px-3 py-2 outline-none text-sm"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="p-2 bg-brand text-white"
            >
              Search
            </button>
          </div>
          <p className="text-xs my-1">or</p>
          <Button
            className="w-full  bg-brand"
            onClick={() => navigate("/property-listing")}
          >
            View Property
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default HeaderSection;
