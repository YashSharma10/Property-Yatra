import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

import PropertyCard from "@/components/ui/common/PropertyCard";
import { BACKEND_URL } from "@/constants";
import { setLoading } from "@/redux/slices/auth";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AgentDashboard() {
  const { loading } = useSelector((store) => store.auth);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [user, setUser] = useState(null);  // Default to null, to avoid errors in rendering
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]); // Set properties as an empty array

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await axios.get(`${BACKEND_URL}/api/logout`, { withCredentials: true });
      navigate("/");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  useEffect(() => {
    handleProperties();
  }, []);

  const handleProperties = async () => {
    try {
      const properties = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        withCredentials: true,
      });

      if (properties) {
        setUser(properties.data.user);
        setLoadingProperties(false);
        setProperties(properties.data.user.postedProperties); // Ensure it's an array
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <section className="mb-8">
        <Card className="flex items-center p-6 bg-blue-100">
          <img
            src="https://via.placeholder.com/150"
            alt="Agent Banner"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="ml-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Welcome, {user?.name}
              </CardTitle>
              <CardDescription className="text-lg">
                Email: {user?.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-gray-600 text-sm">
                Member Since: {user?.createdAt.split("T")[0]}
              </p>
              <div className="flex space-x-4 mt-4">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin">Please wait</Loader2>
                  ) : (
                    "Logout"
                  )}
                </Button>
                <Button onClick={() => navigate("/add-property")}>
                  Add New Property
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="p-4">
          <CardTitle>Total Properties</CardTitle>
          <CardDescription>
            {properties.length}
          </CardDescription>
        </Card>
        <Card className="p-4">
          <CardTitle>Active Listings</CardTitle>
          <CardDescription>
            {properties.filter((p) => p.status === "active").length}
          </CardDescription>
        </Card>
        <Card className="p-4">
          <CardTitle>Total Inquiries</CardTitle>
          <CardDescription>42</CardDescription> {/* Placeholder */}
        </Card>
      </section>

      {/* Properties Section */}
      <section>
        <Card className="p-6 mb-6">
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>
              Manage your property listings below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {properties.map((property) => (
                  <PropertyCard property={property} key={property._id}>
                    <div
                      className="flex-grow p-4"
                      onClick={() => handlePropertyClick(property._id)}
                    ></div>
                    <div className="flex justify-between mt-4">
                      <Button onClick={() => navigate(`/edit/${property._id}`)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          console.log("Delete property", property._id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </PropertyCard>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No properties available
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
