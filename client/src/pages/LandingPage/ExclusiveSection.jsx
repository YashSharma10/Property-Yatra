import React from "react";
import { Button } from "@/components/ui/button";
import investment from "../../assets/investment.jpg";
import exclusive from "../../assets/exclusive.png";

const ExclusiveSection = () => {
  return (
    <section className="width">
      <div className="mb-4">
        <h2 className="heading">Unlock Exclusive Investment Opportunities</h2>
        <p className="subHeading">
          Discover tailored plans and offers to boost your financial growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Investment Section */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">
            Grow Your Wealth with Investment
          </h3>
          <img src={investment} alt="Investment" className="max-w-xs mb-4" />
          <p className="text-sm mb-6 text-center">
            Start investing today and watch your money work for you. We offer
            secure, smart, and easy investment options tailored to your goals.
          </p>
          <Button className="w-full">Explore Investment Plans</Button>
        </div>

        {/* Exclusive Section */}
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-4">
            Exclusive Offers Just for You
          </h3>
          <img
            src={exclusive}
            alt="Exclusive Offers"
            className="h-40 object-cover mb-4"
          />
          <p className="text-small mb-6 text-center">
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
