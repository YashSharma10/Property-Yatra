import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "@/constants";

const properties = [
  {
    id: 1,
    title: "Modern 2 BHK Apartment in Mumbai",
    price: "₹35,000/month",
    location: "Mumbai, Maharashtra",
    imgUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "Luxurious Villa in Bengaluru",
    price: "₹1,20,000/month",
    location: "Bengaluru, Karnataka",
    imgUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    title: "Cozy Studio in New Delhi",
    price: "₹18,000/month",
    location: "New Delhi, Delhi",
    imgUrl: "https://via.placeholder.com/400x250",
  },
];

export default function UserProfile() {
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await axios.get(`${BACKEND_URL}/api/logout`);
      dispatch(setUser(null));
      navigate("/");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <section>
          <Card className="flex flex-col md:flex-row items-center md:items-start p-6 space-y-6 md:space-y-0 md:space-x-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <CardHeader>
                <CardTitle>Rahul Sharma</CardTitle>
                <CardDescription>rahulsharma@example.com</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-xs mt-2">
                  Joined: February 2022
                </p>
              </CardContent>
              <CardFooter className="space-x-4 mt-4">
                <Button variant="outline">Edit Profile</Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  disable={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin">Please wait</Loader2>
                  ) : (
                    "Logout"
                  )}
                </Button>
              </CardFooter>
            </div>
          </Card>
        </section>

        {/* Properties Section */}
        <section>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Properties Posted by Rahul Sharma</CardTitle>
              <CardDescription>
                Manage your property listings below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card
                    key={property.id}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={property.imgUrl}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <CardContent className="text-center mt-4">
                      <CardTitle>{property.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {property.location}
                      </CardDescription>
                      <p className="text-gray-800 font-semibold mt-2">
                        {property.price}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
