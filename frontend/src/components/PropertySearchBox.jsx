import React, { useState } from "react";
import { Search } from "lucide-react"; // For the search icon
import { useNavigate } from "react-router-dom";

const PropertySearchBox = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("buy"); // "buy" or "rent"

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle option (Rent/Buy) change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/property-listing")
    console.log(`Searching for ${selectedOption} properties with term: ${searchTerm}`);
  };

  return (
    <section className="py-8 ">
      <div className="container mx-auto text-center ">
        <div className="mb-4">
          <button
            onClick={() => handleOptionChange("buy")}
            className={`px-6 py-3 mr-4 rounded-lg text-lg font-semibold ${selectedOption === "buy" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"} transition duration-300`}
          >
            Buy
          </button>
          <button
            onClick={() => handleOptionChange("rent")}
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${selectedOption === "rent" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"} transition duration-300`}
          >
            Rent
          </button>
        </div>

        {/* Search Box Form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center justify-center backdrop-blur-sm  rounded-lg shadow-lg">
          {/* Search Input Field */}
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-4 pl-12 rounded-xl text-gray-700 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for properties..."
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 md:mt-0 md:ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default PropertySearchBox;
