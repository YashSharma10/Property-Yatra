import React from "react";

const Roadmap = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-gray-900 animate__animated animate__fadeIn animate__delay-1s">
          Property Listing Roadmap
        </h2>
        <div className="space-y-12">
          {/* Step 1: Add Property Details */}
          <div className="flex items-center justify-center space-x-4 animate__animated animate__fadeIn animate__delay-2s">
            <div className="w-1/4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl transform hover:scale-110 transition-transform duration-300 ease-in-out">
                1
              </div>
            </div>
            <div className="w-3/4 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">Add Property Details</h3>
              <p className="text-lg text-gray-600">
                Provide all the necessary details about the property, including
                location, type (house, apartment, etc.), size, and any other
                important information to make your listing stand out.
              </p>
            </div>
          </div>

          {/* Step 2: Upload Pictures and Videos */}
          <div className="flex items-center justify-center space-x-4 animate__animated animate__fadeIn animate__delay-3s">
            <div className="w-1/4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl transform hover:scale-110 transition-transform duration-300 ease-in-out">
                2
              </div>
            </div>
            <div className="w-3/4 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">Upload Pictures and Videos</h3>
              <p className="text-lg text-gray-600">
                Upload high-quality images and videos of your property to give
                potential buyers and renters a virtual tour. This helps create a
                lasting impression and increases interest.
              </p>
            </div>
          </div>

          {/* Step 3: Add Pricing and Ownership */}
          <div className="flex items-center justify-center space-x-4 animate__animated animate__fadeIn animate__delay-4s">
            <div className="w-1/4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl transform hover:scale-110 transition-transform duration-300 ease-in-out">
                3
              </div>
            </div>
            <div className="w-3/4 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">Add Pricing and Ownership</h3>
              <p className="text-lg text-gray-600">
                Define the price of your property and specify whether it is for
                sale, rent, or lease. Additionally, mention the ownership details,
                including if you are the owner or an authorized agent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
