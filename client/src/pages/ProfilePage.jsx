import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "@/constants";

export default function UserProfile() {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState("");

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

  useEffect(() => {
    handleProperties();
  }, []);
  const handleProperties = async () => {
    try {
      const properties = await axios.get(
        `${BACKEND_URL}/api/properties/profile`,
        { withCredentials: true }
      );
      setProperties(properties.data);
    } catch (error) {
    }
  };
  const time = "2024-12-29T06:26:00.393+00:00";
  return (
    <div className="width">
      <div className=" space-y-8">
        <section>
          <Card className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <CardHeader>
                <CardTitle>{properties.name}</CardTitle>
                <CardDescription>{properties.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-xs mt-2">
                  Joined Since : {time.split("T")[0]}
                </p>
              </CardContent>
              <CardFooter className="space-x-4 mt-4">
                {/* <Button variant="outline">Edit Profile</Button> */}
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
              <CardTitle>Properties Posted by {properties.name}</CardTitle>
              <CardDescription>
                Manage your property listings below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties &&
                  properties.postedProperties.map((property) => (
                    <Card
                      key={property._id}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={property.images}
                        alt={property.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <CardContent className="text-center mt-4">
                        <CardTitle>{property.name}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {property.location}
                        </CardDescription>
                        <p className="text-gray-800 font-semibold mt-2">
                          ₹ {property.price}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button variant="outline">
                          <Link to={`/property/${property._id}`}>
                            View Details
                          </Link>
                        </Button>
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
