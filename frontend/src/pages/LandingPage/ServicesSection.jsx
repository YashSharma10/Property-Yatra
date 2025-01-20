import React from "react";
import { Button } from "@/components/ui/button";
const emiCalculator = "https://via.placeholder.com/150";
const rentAgreement = "https://via.placeholder.com/150";
const plumbing = "https://via.placeholder.com/150";
const relatedService1 = "https://via.placeholder.com/150";
const relatedService2 = "https://via.placeholder.com/150";
import { useNavigate } from "react-router-dom";

const ServicesAndTools = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Explore Our Services and Tools
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We offer a wide range of tools and services to make your life easier and more convenient.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* EMI Calculator */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Home Loan EMI Calculator</h3>
          <img src={emiCalculator} alt="EMI Calculator" className="h-40 w-full object-cover mb-4" />
          <p className="text-sm mb-6 text-center">
            Plan your finances effectively with our accurate EMI calculator. Get detailed insights into your monthly installments.
          </p>
          <Button onClick={() => navigate("/emicalculator")} className="w-full">
            Calculate EMI
          </Button>
        </div>

        {/* Rent Agreement */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Rent Agreement Services</h3>
          <img src={rentAgreement} alt="Rent Agreement" className="h-40 w-full object-cover mb-4" />
          <p className="text-sm mb-6 text-center">
            Simplify the process of creating legally binding rent agreements with our reliable services.
          </p>
          <Button onClick={() => navigate("/rent-agreement")} className="w-full">
            Create Rent Agreement
          </Button>
        </div>

        {/* Plumbing Services */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Plumbing Services</h3>
          <img src={plumbing} alt="Plumbing Services" className="h-40 w-full object-cover mb-4" />
          <p className="text-sm mb-6 text-center">
            Get access to professional and affordable plumbing services to solve your issues promptly.
          </p>
          <Button onClick={() => navigate("/comingsoon")} className="w-full">
            Book a Plumber
          </Button>
        </div>

        {/* Related Service 1 */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Electrician Services</h3>
          <img src={relatedService1} alt="Electrician Services" className="h-40 w-full object-cover mb-4" />
          <p className="text-sm mb-6 text-center">
            From installations to repairs, find reliable electricians near you to meet your needs.
          </p>
          <Button onClick={() => navigate("/comingsoon")} className="w-full">
            Find an Electrician
          </Button>
        </div>

        {/* Related Service 2 */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Home Cleaning Services</h3>
          <img src={relatedService2} alt="Home Cleaning Services" className="h-40 w-full object-cover mb-4" />
          <p className="text-sm mb-6 text-center">
            Book professional home cleaning services for a spotless and hygienic living space.
          </p>
          <Button onClick={() => navigate("/comingsoon")} className="w-full">
            Book Cleaning Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesAndTools;
