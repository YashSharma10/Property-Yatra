import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BACKEND_URL } from "@/constants";
import { Separator } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NewLaunchPropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const fetchLatestProperty = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties/latest`);
      console.log(response);
      setProperties(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchLatestProperty();
  }, []);
  return (
    <section className="width">
      {/* Section Heading */}
      <div className="mb-4">
        <h2 className="heading">Newly Launched Properties</h2>
        <p className="subHeading">
          Explore our exclusive listings of newly launched properties.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="w-full">
        <Carousel className="p-2 ">
          <CarouselContent>
            {properties.map((property) => (
              <CarouselItem
                className="sm:basis-1/3 relative"
                key={property._id}
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div>
                    <Badge className="absolute z-10 top-2  bg-red-500">
                      New Arrival
                    </Badge>
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-48 object-cover overflow-hidden transform transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-lg font-semibold text-gray-900  overflow-hidden flex justify-between">
                      {property.name}
                      <p className="text-sm text-gray-500 py-1">
                        {property.address.city}
                      </p>
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-1 mb-1 overflow-hidden ">
                      {property.description}
                    </p>
                    <div className="text-lg font-bold text-gray-900">
                      ₹{property.sellPrice}
                    </div>
                  </div>
                  <div>
                    <Button
                      className="w-full bg-brand"
                      onClick={() => navigate(`/property/${property._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Separator */}
      <Separator className="my-8" />
    </section>
  );
};

export default NewLaunchPropertiesSection;
