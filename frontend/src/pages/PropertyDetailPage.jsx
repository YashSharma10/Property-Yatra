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
    return <div className="text-center text-xl">Loading...</div>;
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
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">{name}</h1>
      <div className="grid gap-6">
        <div className="flex justify-center">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${name} - ${idx + 1}`}
                className="w-full rounded-lg shadow-lg mb-4"
              />
            ))
          ) : (
            <img
              src="/default-image.jpg"
              alt="Default"
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Property Details</h2>
            </div>
            <div>
              <ShareButton />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">Listing Type: {listingType}</p>
            <p className="text-xl font-semibold mt-2">Price: {price}</p>
            <p className="text-xl font-semibold mt-2">Area: {area} sq. ft.</p>
            <p className="mt-2">
              <strong>Property Type:</strong> {propertyType}
            </p>
            <p className="mt-2">
              <strong>Property Age:</strong> {propertyAge} years
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Features:</h3>
              <ul className="list-disc pl-6">
                {Object.entries(features)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <li key={key}>{key.replace(/([A-Z])/g, " $1")}</li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Address:</h3>
              <p>{addressString}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Description:</h3>
              <p>{description}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Dialog>
              <DialogTrigger>
                <Button className="w-full mt-2 sm:w-fit">
                  <Phone />
                  Inquire / Call back
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Your Request</DialogTitle>
                  <DialogDescription>
                    Are you sure you’d like to request a callback? Our team will
                    contact you shortly to assist with your inquiry.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose>
                  <Button onClick={handleInquiry} className="w-full">
                    Yes
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetails;
