import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PropertyListing = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    features: [],
    utilities: [],
    furnished: "",
    petsAllowed: "",
    bedrooms: "",
    ownership: "",
    builtYear: "",
  });
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProperties = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      ...filters,
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
      setIsLoading(false);
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
  console.log(filters);

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
    <div className="flex flex-col lg:flex-row mt-20">
      {/* Sidebar for Filters */}
      <div className="w-full lg:w-1/4 p-6 bg-gray-100 border-r">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>

        {/* Property Type Dropdown */}
        <div className="mb-6">
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

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Max Price</label>
          <input
            type="number"
            name="price"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          />
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Features</h3>
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

        {/* Utilities */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Utilities</h3>
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

        {/* Additional Filters */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Furnished</label>
          <select
            name="furnished"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Other Filters */}
        {/* Bedrooms, Bathrooms, Ownership, Built Year */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Bedrooms</label>
          <select
            name="bedrooms"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">Ownership</label>
          <select
            name="ownership"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            <option value="Lease">Lease</option>
            <option value="Freehold">Freehold</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Built Year</label>
          <select
            name="builtYear"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            {Array.from({ length: 50 }, (_, i) => 2023 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Listings */}
      <div className="w-full lg:w-3/4 p-6">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : properties.length > 0 ? (
          <div>
            <div className="grid sm:grid-cols-2 min-h-[75vh]">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="mb-4 p-4 border rounded shadow-sm cursor-pointer flex relative"
                  onClick={() => handlePropertyClick(property._id)}
                >
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full  object-cover mr-4"
                  />
                  <div className="absolute bottom-5 text-black font-bold backdrop-blur-md rounded-md px-3">
                    <h3 className="font-semibold">{property.name}</h3>
                    <p>{property.description}</p>
                    <p>
                      <strong>Price:</strong> ₹{property.price}
                    </p>
                    <p>
                      <strong>Type:</strong> {property.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
          </div>
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
