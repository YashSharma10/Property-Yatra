import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubscriptionPlans from "./SubscriptionPlans";
import PropertyAnalyticsDashboard from "./PropertyAnalyticsData";

const Dashboard = () => {
  const properties = [
    {
      id: 1,
      name: "Skyline Towers",
      location: "Mumbai, Maharashtra",
      views: 452,
      datePosted: "2024-12-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Parkview Residences",
      location: "Bengaluru, Karnataka",
      views: 324,
      datePosted: "2024-11-22",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Seaside Villas",
      location: "Goa",
      views: 598,
      datePosted: "2024-10-10",
      status: "Active",
    },
  ];

  return (
    <div className="flex  bg-gray-50">
      {/* Left Sidebar */}
      {/* <aside className="w-64 bg-gray-900 text-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-6">Dashboard Menu</h2>
        <nav className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Posted Properties
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Subscription
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            User Details
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Post New Property
          </Button>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Posted Properties</h1>
          <Button variant="primary">Add New Property</Button>
        </div>

        {/* <SubscriptionPlans/> */}
        <PropertyAnalyticsDashboard/>
        {/* Properties Table */}
        <Card className="p-4 bg-white shadow-sm rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Total Views</TableHead>
                <TableHead className="text-center">Posted Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell className="text-center">{property.views}</TableCell>
                  <TableCell className="text-center">{property.datePosted}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        property.status === "Active" ? "success" : "destructive"
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
