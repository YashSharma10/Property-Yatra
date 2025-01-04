import React from "react";
import { Button } from "@/components/ui/button";
import investment from "../../assets/investment.jpg";
import exclusive from "../../assets/exclusive.png";

const ExclusiveSection = () => {
  return (
    <section className="my-7 mx-auto max-w-7xl px-4">
      {/* Main Heading and Subheading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Unlock Exclusive Investment Opportunities
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Discover tailored investment plans and personalized offers designed to help you achieve financial growth and stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Investment Section */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold mb-4">
            Grow Your Wealth with Investment
          </h3>
          <img src={investment} alt="Investment" className="max-w-xs mb-4" />
          <p className="text-base mb-6 text-center">
            Start investing today and watch your money work for you. We offer
            secure, smart, and easy investment options tailored to your goals.
          </p>
          <Button className="w-full">Explore Investment Plans</Button>
        </div>

        {/* Exclusive Section */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-4">
            Exclusive Offers Just for You
          </h3>
          <img src={exclusive} alt="Exclusive Offers" className="h-40 object-cover mb-4" />
          <p className="text-base mb-6 text-center">
            Take advantage of exclusive investment opportunities with
            personalized offers. We bring the best deals right to you.
          </p>
          <Button className="w-full">View Exclusive Offers</Button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveSection;
