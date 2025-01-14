import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ShareButton from "@/components/ui/common/ShareButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BACKEND_URL } from "@/constants";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Phone } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addView = async (id) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/properties/view/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding view:", error);
    }
  };

  const handleInquiry = async () => {
    try {
      const data = await axios.post(
        `${BACKEND_URL}/api/inquiry/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.error("Error handling inquiry:", error);
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/properties/${id}`);
        if (!response.ok) throw new Error("Property not found");
        const data = await response.json();
        addView(id);
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
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (!property) {
    return (
      <div className="text-center text-xl text-red-500">Property not found</div>
    );
  }

  const {
    name = "Not available",
    listingType,
    sellPrice,
    rentPrice,
    description = "No description available",
    propertyAge = "N/A",
    area = "N/A",
    propertyType = "Not specified",
    address = {},
    features = {},
    images = [],
  } = property;

  const price =
    listingType === "sell"
      ? sellPrice
        ? `₹${sellPrice.toLocaleString()}`
        : "Price not available"
      : rentPrice
      ? `₹${rentPrice.toLocaleString()}`
      : "Price not available";

  const addressString = `${address.house || ""}, ${address.city || ""}, ${
    address.state || ""
  } - ${address.pincode || "N/A"}`;

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50">
      {/* Property Name with Custom Font */}
      <h1 className="text-5xl font-semibold text-center text-gray-900 tracking-wide leading-tight mt-4 mb-8 font-poppins">
        {name}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        {/* Left Section - Image Gallery */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-200 rounded-lg shadow-lg">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt="Main Property"
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
            ) : (
              <img
                src="/default-image.jpg"
                alt="Default"
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Property Thumbnail ${idx + 1}`}
                  className="h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Property Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-2xl rounded-xl">
            <CardHeader className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-100 to-blue-100 rounded-t-xl">
              <h2 className="text-2xl font-semibold text-teal-800">Property Details</h2>
              <ShareButton />
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-lg text-gray-800">
                <strong className="font-medium">Listing Type:</strong> {listingType}
              </p>
              <p className="text-lg text-gray-800">
                <strong className="font-medium">Price:</strong> {price}
              </p>
              <p className="text-lg text-gray-800">
                <strong className="font-medium">Area:</strong> {area} sq. ft.
              </p>
              <p className="text-lg text-gray-800">
                <strong className="font-medium">Property Type:</strong> {propertyType}
              </p>
              <p className="text-lg text-gray-800">
                <strong className="font-medium">Property Age:</strong> {propertyAge} years
              </p>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Features:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {Object.entries(features)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <li key={key} className="text-lg">{key.replace(/([A-Z])/g, " $1")}</li>
                    ))}
                </ul>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Address:</h3>
                <p className="text-lg text-gray-700">{addressString}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Description:</h3>
                <p className="text-lg text-gray-700">{description}</p>
              </div>
            </CardContent>

            {/* Call to Action */}
            <CardFooter className="p-6 bg-gray-100 rounded-b-xl">
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full bg-teal-600 text-white hover:bg-teal-700 py-3 rounded-lg shadow-md flex justify-center items-center">
                    <Phone className="mr-3" />
                    Inquire / Call Back
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">Confirm Your Request</DialogTitle>
                    <DialogDescription>
                      Are you sure you’d like to request a callback? Our team
                      will contact you shortly to assist with your inquiry.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        onClick={handleInquiry}
                        className="w-full bg-green-500 text-white hover:bg-green-600 py-3 rounded-lg shadow-md"
                      >
                        Yes, Confirm
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
