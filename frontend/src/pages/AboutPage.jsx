import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="py-36 bg-gray-50">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          About Us
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We are a dedicated team committed to helping you find the perfect
          property.
        </p>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-gray-700">
            Our mission is to make property buying, selling, and renting a
            seamless and enjoyable experience. We are driven by our passion for
            real estate and our commitment to serving our customers with the
            highest standards of service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Values
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>
              Integrity: We act with honesty and transparency in all of our
              dealings.
            </li>
            <li>
              Customer Satisfaction: Our clients are our top priority, and we go
              above and beyond to meet their needs.
            </li>
            <li>
              Excellence: We strive for excellence in everything we do, from
              property listings to customer service.
            </li>
            <li>
              Innovation: We embrace technology and innovative solutions to make
              the real estate experience better for everyone.
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet Our Team
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">John Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="w-64 bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Jane Smith
              </h4>
              <p className="text-gray-600">Marketing Director</p>
            </div>
            <div className="w-64 bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Michael Brown
              </h4>
              <p className="text-gray-600">Property Specialist</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to know more? Contact Us!
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Have any questions? We’re here to help you every step of the way.
          </p>
          <Link
            to="/contact"
            className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
