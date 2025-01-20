import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const AboutPage = () => {
  return (
    <section className="">
      <div className="  text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          About Us.
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We are a dedicated team committed to helping you find the perfect
          property.
        </p>

        <Card className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 underline">
              Our Mission
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">
              Our mission is to make property buying, selling, and renting a
              seamless and enjoyable experience. We are driven by our passion
              for real estate and our commitment to serving our customers with
              the highest standards of service.
            </p>
          </CardContent>
        </Card>

        {/* Value */}

        {/* <Card className="max-w-4xl mx-auto mt-12 p-8">
          <CardHeader>
            <h3 className="text-2xl font-semibold underline text-gray-800 mb-4">
              Our Values
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="text-left list-disc pl-6 space-y-3 text-lg text-gray-700">
              <li>
                Integrity: We act with honesty and transparency in all of our
                dealings.
              </li>
              <li>
                Customer Satisfaction: Our clients are our top priority, and we
                go above and beyond to meet their needs.
              </li>
              <li>
                Excellence: We strive for excellence in everything we do, from
                property listings to customer service.
              </li>
              <li>
                Innovation: We embrace technology and innovative solutions to
                make the real estate experience better for everyone.
              </li>
            </ul>
          </CardContent>
        </Card> */}

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet Our Team
          </h3>
          {/* <div className="flex flex-wrap justify-center gap-8">
            {["x", "y", "z"].map((name, index) => (
              <Card
                key={index}
                className="w-64 bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <CardHeader>
                  <Avatar className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {index === 0
                      ? "CEO & Founder"
                      : index === 1
                      ? "Marketing Director"
                      : "Property Specialist"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to know more? Contact Us!
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Have any questions? We’re here to help you every step of the way.
          </p>
          <div>
            <Link to="/contact">
              <Button>Get In Touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
