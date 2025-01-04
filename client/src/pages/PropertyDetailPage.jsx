import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BACKEND_URL } from "@/constants";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!property) {
    return (
      <div className="text-center text-xl text-red-500">Property not found</div>
    );
  }

  const name = property.name || "Not available";
  const type = property.type || "Not specified";
  const price = property.price
    ? `₹${property.price.toLocaleString()}`
    : "Price not available";
  const configuration = property.configuration || "Not specified";
  const propertyType = property.propertyType || "Not specified";
  const transactionType = property.transactionType || "Not specified";
  const propertyAge = property.propertyAge || "N/A";
  const description = property.description || "No description available";
  const features = property.features || {};
  const utilities = property.utilities || {};
  const street = property.address?.street || "Street not available";
  const city = property.address?.city || "City not available";
  const state = property.address?.state || "State not available";
  const country = property.address?.country || "Country not available";
  const pincode = property.address?.pincode || "Pincode not available";

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold text-center mb-6">{name}</h1>
      <div className="grid gap-6">
        <div className="flex justify-center">
          <img
            src={property.images[0] || "/default-image.jpg"}
            alt={name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Property Details</h2>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">Type: {type}</p>
            <p className="text-xl font-semibold mt-2">Price: {price}</p>
            <p className="text-xl font-semibold mt-2">
              Configuration: {configuration}
            </p>
            <p className="mt-2">
              <strong>Property Type:</strong> {propertyType}
            </p>
            <p className="mt-2">
              <strong>Transaction Type:</strong> {transactionType}
            </p>
            <p className="mt-2">
              <strong>Property Age:</strong> {propertyAge} years
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Features:</h3>
              <ul className="list-disc pl-6">
                {features.parking && <li>Parking</li>}
                {features.lift && <li>Lift</li>}
                {features.swimmingPool && <li>Swimming Pool</li>}
                {features.modularKitchen && <li>Modular Kitchen</li>}
                {features.balcony && <li>Balcony</li>}
                {features.park && <li>Park</li>}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Utilities:</h3>
              <ul className="list-disc pl-6">
                {utilities.water && <li>Water</li>}
                {utilities.electricity && <li>Electricity</li>}
                {utilities.gas && <li>Gas</li>}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Address:</h3>
              <p>
                {street}, {city}, {state}
              </p>
              <p>
                {country} - {pincode}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Description:</h3>
              <p>{description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center">
              For more information, contact us!
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetails;
