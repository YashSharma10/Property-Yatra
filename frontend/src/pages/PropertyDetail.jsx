import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="property-detail">
      <img
        src={property.images[0]?.url || "https://via.placeholder.com/400x300"}
        alt={property.name}
        className="property-detail-image"
      />
      <h2>{property.name}</h2>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p><strong>Configuration:</strong> {property.configuration}</p>
      <p><strong>Property Type:</strong> {property.propertyType}</p>
      <p><strong>City:</strong> {property.address.city}</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Area:</strong> {property.area} sq ft</p>
      <p><strong>Property Age:</strong> {property.propertyAge} years</p>
      {/* Add more property details as needed */}
    </div>
  );
};

export default PropertyDetail;
