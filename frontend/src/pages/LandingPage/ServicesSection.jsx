import React from "react";
import { Button } from "@/components/ui/button";
import facilityManagement from "../../assets/facilty.webp";
import legalServices from "../../assets/legal.png";
import homeLoan from "../../assets/homeloan.png";
import tools from "../../assets/tools.jpg";
import { useNavigate } from "react-router-dom";

const ServicesAndTools = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Explore Our Services and Tools
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover a wide range of solutions designed to make your property management simpler and more efficient.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {/* Facility Management */}
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
          <div className="w-full h-48 mb-4 overflow-hidden relative">
            <img
              src={facilityManagement}
              alt="Facility Management"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Facility Management</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Streamline your property management needs with our top-notch facility management services.
          </p>
          <Button
            onClick={() => navigate("/facility-management")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Manage Facility
          </Button>
        </div>

        {/* Legal Services */}
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
          <div className="w-full h-48 mb-4 overflow-hidden relative">
            <img
              src={legalServices}
              alt="Legal Services"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Legal Services</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Access expert legal services for rent agreements, property disputes, and more.
          </p>
          <Button
            onClick={() => navigate("/legal-services")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Get Legal Help
          </Button>
        </div>

        {/* Home Loan Services */}
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
          <div className="w-full h-48 mb-4 overflow-hidden relative">
            <img
              src={homeLoan}
              alt="Home Loan EMI Calculator"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Home Loan</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Plan your finances effectively with our Home Loan services and Banking Facilities.
          </p>
          <Button
            onClick={() => navigate("/emicalculator")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Calculate EMI
          </Button>
        </div>

        {/* Tools */}
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
          <div className="w-full h-48 mb-4 overflow-hidden relative">
            <img
              src={tools}
              alt="Tools"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Tools</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Explore a variety of tools designed to make your property management seamless and efficient.
          </p>
          <Button
            onClick={() => navigate("/tools")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Explore Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesAndTools;
