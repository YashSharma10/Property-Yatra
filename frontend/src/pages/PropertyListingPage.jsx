import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PropertyListing = () => {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    features: [],
    utilities: [],
  });
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = async () => {
    setIsLoading(true); // Start loading
    const queryParams = new URLSearchParams({
      type: filters.type,
      price: filters.price,
      features: filters.features.join(","),
      utilities: filters.utilities.join(","),
      page,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/properties/list?${queryParams}`
      );
      const data = await response.json();
      setProperties(data.properties);
      setTotalProperties(data.total);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    setFilters((prev) => {
      const updatedCategory = checked
        ? [...prev[category], name]
        : prev[category].filter((item) => item !== name);
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar for Filters */}
      <div className="w-full sm:w-1/4 p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Property Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Property Type</label>
          <select
            name="type"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
          </select>
        </div>

        {/* Price Range Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Max Price</label>
          <input
            type="number"
            name="price"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          />
        </div>

        {/* Features Checkboxes */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Features</h3>
          {["parking", "lift", "swimming pool"].map((feature) => (
            <label key={feature} className="block">
              <input
                type="checkbox"
                name={feature}
                checked={filters.features.includes(feature)}
                onChange={(e) => handleCheckboxChange(e, "features")}
                className="mr-2"
              />
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </label>
          ))}
        </div>

        {/* Utilities Checkboxes */}
        <div>
          <h3 className="text-sm font-medium">Utilities</h3>
          {["water", "electricity", "gas"].map((utility) => (
            <label key={utility} className="block">
              <input
                type="checkbox"
                name={utility}
                checked={filters.utilities.includes(utility)}
                onChange={(e) => handleCheckboxChange(e, "utilities")}
                className="mr-2"
              />
              {utility.charAt(0).toUpperCase() + utility.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Property Listings */}
      <div className="w-full sm:w-3/4 p-4">
        <h2 className="text-lg font-bold mb-4">Properties</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="mb-4 p-4 border rounded shadow-sm cursor-pointer"
                  onClick={() => handlePropertyClick(property._id)}
                >
                  <h3 className="font-semibold">{property.name}</h3>
                  <p>{property.description}</p>
                </div>
              ))
            ) : (
              <p>No properties found.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page * 5 >= totalProperties}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">{selectedProperty.name}</h2>
            <p>{selectedProperty.description}</p>
            <ul>
              <li>
                <strong>Type:</strong> {selectedProperty.type}
              </li>
              <li>
                <strong>Price:</strong> {selectedProperty.price}
              </li>
              <li>
                <strong>Features:</strong>{" "}
                {selectedProperty.features.join(", ")}
              </li>
              <li>
                <strong>Utilities:</strong>{" "}
                {selectedProperty.utilities.join(", ")}
              </li>
            </ul>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
