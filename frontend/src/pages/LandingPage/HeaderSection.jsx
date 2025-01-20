import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import image from "../../assets/image.png";
import { Button } from "@/components/ui/button";
import { setFilters } from "@/redux/slices/globalEvent";

const HeaderSection = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Sell");
  const [selectedProperties, setSelectedProperties] = useState([]);
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

  const handleDropdown = () => {
    setDropdownMenu(!dropdownMenu);
  };

  const handleCheckboxChange = (propertyType) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyType)
        ? prev.filter((item) => item !== propertyType)
        : [...prev, propertyType]
    );
  };

  const tabs = ["Sell", "Rent", "PG", "Commercial", "Plot"];
  const propertyOptions = ["Apartment", "Villa", "Independent House", "Studio"];

  return (
    <section className={`absolute top-10 right-0 left-0 transition-opacity duration-500 w-screen z-10`}>
      <img src={image} alt="header" className="w-full h-80 object-fill" />

      {/* SearchBox */}
      <div className="relative -mt-20 z-10">
        <div className="flex flex-col items-center max-w-md sm:max-w-xl mx-auto shadow-2xl rounded-2xl bg-white">
          {/* Navigation Tabs */}
          <div className="flex gap-4 w-full justify-around mb-3 px-4 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`pb-2 text-sm sm:text-lg font-medium ${
                  activeTab === tab
                    ? "text-brand border-b-2 border-brand"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <hr className="h-px bg-slate-300 w-full" />

          {/* Search Input */}
          <div className="flex w-full gap-2 p-4">
            <div className="flex items-center">
              <Button
                className="text-xs hover:bg-transparent"
                variant="ghost"
                onClick={handleDropdown}
              >
                All Residential
                <ChevronDown size={16} />
              </Button>
            </div>
            <div className="flex flex-1 items-center border-l p-2">
              <Search className="ml-1" />
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
                className="w-full px-3 py-2 border-none outline-none"
              />
              <Button
                type="submit"
                onClick={handleSearch}
                className="bg-brand text-white rounded-md px-1"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Dropdown with Animation */}
        <div
          className={`transition-transform transform ${
            dropdownMenu ? "scale-100" : "scale-0"
          } origin-top flex flex-col items-center max-w-md sm:max-w-xl mx-auto overflow-hidden bg-white rounded-b-sm p-4`}
        >
          <p className="text-sm text-gray-700 mb-2">
            Select property types to refine your search:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {propertyOptions.map((property) => (
              <label key={property} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedProperties.includes(property)}
                  onChange={() => handleCheckboxChange(property)}
                  className="w-4 h-4 text-brand focus:ring-brand"
                />
                <span className="text-gray-700">{property}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
