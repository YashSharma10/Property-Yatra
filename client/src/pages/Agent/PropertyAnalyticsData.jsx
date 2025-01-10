import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 200 },
  { name: "Apr", sales: 278 },
  { name: "May", sales: 189 },
];

const PropertyAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [posted, setPosted] = useState({});
  const [viewData,setViewData] = useState();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/api/property/analytics/${id}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const d = response.data.postedProperties.find(
            (pId) => pId._id === id
          );

          if (d) {
            setPosted(d);
            returnView(d.views); // Pass views data directly
          } else {
            console.error("Property not found");
          }
        }
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const returnView = (views) => {
    if (!views || !Array.isArray(views)) {
      console.error("Views data is missing or invalid");
      return;
    }

    const timestamps = views.map((view) => view.createdAt);

    if (!timestamps || timestamps.length === 0) {
      console.error("No timestamps available to process");
      return;
    }

    const dates = timestamps.map((timestamp) =>
      new Date(timestamp).toISOString().split("T")[0]
    );

    const dateCounts = dates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(dateCounts).map(([time, view]) => ({
      time,
      view,
    }));
    setViewData(result);
    console.log("Result:", result);
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={viewData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="view" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      {/* Properties Section */}
      <section>
        <Card className="p-6 mb-6">
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>User data view on your property.</CardDescription>
          </CardHeader>
          <CardContent>
            {posted.views?.length > 0 ? (
              <div className="overflow-hidden bg-white shadow-md rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Number</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posted?.views.map((property) => (
                      <TableRow key={property._id}>
                        <TableCell>{property?.name}</TableCell>
                        <TableCell>{property?.email}</TableCell>
                        <TableCell className="capitalize">
                          {property.number}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
};

export default PropertyAnalyticsDashboard;
