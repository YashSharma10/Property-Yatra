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
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AgentDashboard() {
  const { loading } = useSelector((store) => store.auth);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

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
    navigate(`/property/analytics/${id}`);
    console.log("PropertyId", id);
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
        setProperties(properties.data.user.postedProperties);
      }
      console.log("Properties", properties.data.user.postedProperties);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <section className="mb-8">
        <Card className="flex flex-col p-2  bg-blue-100">
          {/* <img
            src="https://via.placeholder.com/150"
            alt="Agent Banner"
            className="w-40 h-40 rounded-full object-cover "
          /> */}
          <div c>
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
              <div className="flex mt-4 gap-3 flex-col sm:flex-row">
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
                <Button onClick={() => navigate("/add")}>
                  Add New Property
                </Button>
                <Button onClick={() => navigate("/subscription")}>
                  Change your plan
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
          <CardDescription>{properties.length}</CardDescription>
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
              <div className="overflow-hidden bg-white shadow-md rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Property Name</TableCell>
                      <TableCell>Total Views</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date Posted</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Inquiries</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow
                        key={property.name}
                        onClick={() => handlePropertyClick(property._id)}

                      >
                        <TableCell>{property.name}</TableCell>
                        <TableCell>{property?.views?.length}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              property.status === "active"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {property?.createdAt?.split("T")[0]}
                        </TableCell>
                        <TableCell className="capitalize">
                          {property.propertyType}
                        </TableCell>
                        <TableCell>{property.inquiries}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              //   {properties.map((property) => (
              //     <div key={property._id}>
              //       <PropertyCard property={property}>
              //       </PropertyCard>
              //       <div className="flex justify-between mt-4">
              //         <Button onClick={() => navigate(`/dashboard`)}>
              //           Analytics
              //         </Button>
              //         <Button
              //           variant="destructive"
              //           onClick={() =>
              //             console.log("Delete property", property._id)
              //           }
              //         >
              //           Delete
              //         </Button>
              //       </div>
              //     </div>
              //   ))}
              // </div>
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
