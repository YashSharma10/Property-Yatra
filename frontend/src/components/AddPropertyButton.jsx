import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate hook for navigation

const AddPropertyButton = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to handle the button click
  const handleAddPropertyClick = () => {
    navigate("/add-property"); // Navigate to the add property page
  };

  return (
    <div className="mt-3 bg-white p-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-wide text-gray-900">
        Add Your Property
        <span className="ml-2 text-white bg-green-500 p-2 rounded-md text-sm font-medium">
          Free
        </span>
      </h2>
      <p className="text-lg sm:text-xl mb-6 text-gray-600">
        A simple and easy way to list your property for sale or rent.
      </p>
      <button
        onClick={handleAddPropertyClick}
        className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Add Your Property
      </button>
      
    </div>
  );
};

export default AddPropertyButton;
