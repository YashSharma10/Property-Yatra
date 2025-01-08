import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

import PropertyCard from "@/components/ui/common/PropertyCard";
import { BACKEND_URL } from "@/constants";
import { setLoading, setUser } from "@/redux/slices/auth";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UserProfile() {
  const { loading } = useSelector((store) => store.auth);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState("");

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await axios.get(`${BACKEND_URL}/api/logout`,{withCredentials:true});
      // dispatch(setUser(null));
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
      const properties = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        withCredentials: true,
      });

      if (properties) {
        setUser(properties.data.user);
        setLoadingProperties(false);
        setProperties(properties.data.user.postedProperties);
        // console.log(properties.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const time = "2024-12-29T06:26:00.393+00:00";
  return (
    <div className="width">
      <div className=" space-y-8">
        <section>
          <Card className="flex  items-center p-3">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <CardHeader>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-xs mt-2 mb-1">
                  Joined Since : {user?.createdAt.split("T")[0]}
                </p>
                <div >
                  {/* <Button variant="outline">Edit Profile</Button> */}
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
                </div>
              </CardContent>
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
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {properties.map((property) => (
                    <PropertyCard property={property} />
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

        {/* liked properties */}
        <section>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Properties liked you {properties.name}</CardTitle>
              <CardDescription>
                Manage your property listings below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {properties.map((property) => (
                    <PropertyCard property={property} />
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
    </div>
  );
}
