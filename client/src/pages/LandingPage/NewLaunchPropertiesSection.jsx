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
import { Separator } from "@radix-ui/react-dropdown-menu";

const NewLaunchPropertiesSection = () => {
  const properties = [
    {
      id: 1,
      name: "Skyline Towers",
      location: "Mumbai, Maharashtra",
      price: "₹1,25,00,000",
      description:
        "Luxury apartments with stunning city views and top-notch amenities.",
      image: "/path/to/image1.jpg",
    },
    {
      id: 2,
      name: "Parkview Residences",
      location: "Bengaluru, Karnataka",
      price: "₹95,00,000",
      description:
        "Spacious apartments near Cubbon Park with modern interiors.",
      image: "/path/to/image2.jpg",
    },
    {
      id: 3,
      name: "Seaside Villas",
      location: "Goa",
      price: "₹1,50,00,000",
      description:
        "Exclusive villas with private beach access and panoramic ocean views.",
      image: "/path/to/image3.jpg",
    },
    {
      id: 4,
      name: "Urban Heights",
      location: "New Delhi, Delhi",
      price: "₹85,00,000",
      description:
        "Premium apartments with a modern design in the heart of the city.",
      image: "/path/to/image4.jpg",
    },
    {
      id: 5,
      name: "Riverfront Estates",
      location: "Kochi, Kerala",
      price: "₹1,20,00,000",
      description: "Spacious villas with stunning views of the backwaters.",
      image: "/path/to/image5.jpg",
    },
    {
      id: 6,
      name: "Mountain Retreat",
      location: "Shimla, Himachal Pradesh",
      price: "₹90,00,000",
      description:
        "Serene homes nestled in the mountains with breathtaking views.",
      image: "/path/to/image6.jpg",
    },
    {
      id: 7,
      name: "The Oasis",
      location: "Chennai, Tamil Nadu",
      price: "₹1,10,00,000",
      description:
        "Luxurious flats with world-class amenities and scenic views.",
      image: "/path/to/image7.jpg",
    },
    {
      id: 8,
      name: "Sky Garden Residences",
      location: "Pune, Maharashtra",
      price: "₹75,00,000",
      description:
        "Modern apartments with garden views and access to premium facilities.",
      image: "/path/to/image8.jpg",
    },
  ];

  return (
    <section className="my-7 rounded-md max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-4">
          Newly Launched Properties
        </h2>
        <p className="text-lg text-gray-600">
          Explore our exclusive listings of newly launched properties.
        </p>
      </div>

      <div className="w-full">
        <Carousel >
          <CarouselContent>
            {properties.map((property) => (
              <CarouselItem className="w-60  basis-1/3">
                <Card
                  key={property.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <CardHeader className="relative">
                    <Badge className="absolute top-2 left-2 bg-red-500 rounded-md text-sm font-semibold">
                      New Arrival
                    </Badge>
                    <img
                      src={property.image}
                      alt={property.name}
                      className=" object-cover mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {property.location}
                    </p>
                    <p className="text-base text-gray-700 mb-4">
                      {property.description}
                    </p>
                    <div className="font-semibold text-gray-900">
                      {property.price}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center p-2">
                    <Button variant="" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Optional Separator */}
      <Separator className="my-8" />
    </section>
  );
};

export default NewLaunchPropertiesSection;
