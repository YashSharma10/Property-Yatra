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

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/property/analytics/:${id}`,
          { withCredentials: true }
        );
        // const response = await axios.get(`${BACKEND_URL}/api/property/analytics`, {
        //   withCredentials: true,
        // });
  
        // if (!response.ok) {
        //   throw new Error("Property not found");
        // }
        // const data = await response.json();
        // addView(id);
        // setProperty(data);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PropertyAnalyticsDashboard;
