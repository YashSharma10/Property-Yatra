import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import facilityManagement from "../../assets/facilty.webp";
import legalServices from "../../assets/legal.png";
import tools from "../../assets/tools.jpg";
import { useNavigate } from "react-router-dom";

const ServicesAndTools = () => {
  const navigate = useNavigate();
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  const [isFacilityHovered, setIsFacilityHovered] = useState(false);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Facility Management */}
        <div
          className="bg-white text-gray-900 p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all duration-300 w-full relative"
          onMouseEnter={() => setIsFacilityHovered(true)}
          onMouseLeave={() => setIsFacilityHovered(false)}
        >
          <div className="w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-2xl relative">
            <img
              src={facilityManagement}
              alt="Facility Management"
              className="w-full h-full object-cover rounded-xl transform transition duration-500 hover:scale-105"
            />
          </div>

          {isFacilityHovered ? (
            <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center bg-gray-800 bg-opacity-80 rounded-2xl p-6">
              <p className="text-white text-center mb-4 text-lg font-semibold leading-tight">
                We provide comprehensive facility management services, including:
              </p>
              <ul className="text-white list-inside pl-6 space-y-2 text-sm text-left">
                <li>• 24/7 Property Maintenance</li>
                <li>• Cleaning and Housekeeping</li>
                <li>• Security Services</li>
                <li>• Landscaping and Gardening</li>
                <li>• Utility Management</li>
                <li>• Waste Management</li>
                <li>• Repairs and Renovations</li>
                <li>• Corporate Facility Solutions</li>
              </ul>
              <Button
                onClick={() => navigate("/facility-management")}
                className="w-3/4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300"
              >
                Manage Facility
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-3 text-center">Facility Management</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Streamline your property management needs with our top-notch facility management services.
              </p>
            </>
          )}
        </div>

        {/* Legal Services */}
        <div className="bg-white text-gray-900 p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all duration-300 w-full">
          <div className="w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-2xl relative">
            <img
              src={legalServices}
              alt="Legal Services"
              className="w-full h-full object-cover rounded-xl transform transition duration-500 hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Legal Services</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Access expert legal services for rent agreements, property disputes, and more.
          </p>
          <Button
            onClick={() => navigate("/legal-services")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300"
          >
            Get Legal Help
          </Button>
        </div>

        {/* Tools Card */}
        <div
          className="bg-gray-50 text-gray-900 p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all duration-300 w-full relative"
          onMouseEnter={() => setIsToolsHovered(true)}
          onMouseLeave={() => setIsToolsHovered(false)}
        >
          <div className="w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-2xl relative">
            <img
              src={tools}
              alt="Tools"
              className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                isToolsHovered ? "opacity-40" : "opacity-90"
              }`}
            />
          </div>

          {isToolsHovered ? (
            <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center bg-gray-800 bg-opacity-80 rounded-2xl p-6">
              <Button
                onClick={() => navigate("/emicalculator")}
                className="w-3/4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition duration-300"
              >
                EMI Calculator
              </Button>
              <Button
                onClick={() => navigate("/rent-agreement")}
                className="w-3/4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-300"
              >
                Rent Agreement
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-3 text-center">Tools</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Explore a variety of tools designed to make your property management seamless and efficient.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesAndTools;
