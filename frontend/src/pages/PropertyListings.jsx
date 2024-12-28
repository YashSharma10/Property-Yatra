import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/PropertyListings.css";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    configuration: "",
  });

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/properties");
        setProperties(response.data);
        setFilteredProperties(response.data); // Initially display all properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply Filters when filters change
  useEffect(() => {
    let filtered = properties;

    if (filters.city) {
      filtered = filtered.filter((property) =>
        property.address.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (property) => property.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (property) => property.price <= Number(filters.maxPrice)
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) =>
          property.propertyType.toLowerCase() ===
          filters.propertyType.toLowerCase()
      );
    }

    if (filters.configuration) {
      filtered = filtered.filter(
        (property) =>
          property.configuration.toLowerCase() ===
          filters.configuration.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]); // Re-run the effect whenever filters or properties change

  return (
    <div className="property-container">
      {/* Sidebar Filter */}
      <aside className="filter-sidebar">
        <h3>Filter Properties</h3>
        <div className="filter-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder="Enter city"
          />
        </div>

        <div className="filter-group">
          <label>Min Price:</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min price"
          />
        </div>

        <div className="filter-group">
          <label>Max Price:</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max price"
          />
        </div>

        <div className="filter-group">
          <label>Property Type:</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            <option value="">Select Type</option>
            <option value="flat">Flat</option>
            <option value="villa">Villa</option>
            <option value="independent house">Independent House</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Configuration:</label>
          <select
            name="configuration"
            value={filters.configuration}
            onChange={handleFilterChange}
          >
            <option value="">Select Configuration</option>
            <option value="1 bhk">1 BHK</option>
            <option value="2 bhk">2 BHK</option>
            <option value="3 bhk">3 BHK</option>
          </select>
        </div>
      </aside>

      {/* Property Listings */}
      <section className="property-listings">
        <h2>Property Listings</h2>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id} className="property-card">
              <img
                src={
                  property.images[0]?.url ||
                  "https://via.placeholder.com/200x150"
                }
                alt={property.name}
                className="property-image"
              />
              <div className="property-details">
                <h4>{property.name}</h4>
                <p>
                  <strong>Type:</strong> {property.type}
                </p>
                <p>
                  <strong>Price:</strong> ₹{property.price}
                </p>
                <p>
                  <strong>City:</strong> {property.address.city}
                </p>
                <p>
                  <strong>Property Type:</strong> {property.propertyType}
                </p>
                <p>
                  <strong>Configuration:</strong> {property.configuration}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No properties match your filters.</p>
        )}
      </section>
    </div>
  );
};

export default PropertyListing;
