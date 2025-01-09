import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

// Dummy data for properties analytics
const propertyAnalyticsData = [
  {
    name: "Skyline Towers",
    totalViews: 1500,
    leadsGenerated: 120,
    status: "Active",
    price: 12500000,
    datePosted: "2024-01-01",
    category: "Apartment",
    priceTrend: [
      { date: "2024-01-01", price: 12000000 },
      { date: "2024-01-10", price: 12500000 },
      { date: "2024-01-15", price: 12700000 },
    ],
  },
  {
    name: "Parkview Residences",
    totalViews: 900,
    leadsGenerated: 70,
    status: "Sold",
    price: 9500000,
    datePosted: "2024-01-05",
    category: "Villa",
    priceTrend: [
      { date: "2024-01-05", price: 9500000 },
      { date: "2024-01-12", price: 9600000 },
      { date: "2024-01-18", price: 9500000 },
    ],
  },
  // More data here
];

const PropertyAnalyticsDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Property Analytics Dashboard</h1>
      
      {/* Property Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {propertyAnalyticsData.map((property) => (
          <Card key={property.name} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
              <Badge variant={property.status === "Active" ? "success" : "destructive"} className="ml-2">
                {property.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Total Views: {property.totalViews}</p>
                <p className="text-sm text-gray-600">Leads Generated: {property.leadsGenerated}</p>
                <p className="text-sm text-gray-600">Price: ₹{property.price.toLocaleString()}</p>
              </div>
              <Button size="sm" className="w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Trend Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Price Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={propertyAnalyticsData[0].priceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Properties Table */}
      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Property Name</TableCell>
              <TableCell>Total Views</TableCell>
              <TableCell>Leads Generated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Posted</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertyAnalyticsData.map((property) => (
              <TableRow key={property.name}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.totalViews}</TableCell>
                <TableCell>{property.leadsGenerated}</TableCell>
                <TableCell>
                  <Badge variant={property.status === "Active" ? "success" : "destructive"}>
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell>{property.datePosted}</TableCell>
                <TableCell>{property.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyAnalyticsDashboard;
