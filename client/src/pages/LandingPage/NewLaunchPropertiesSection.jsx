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
    {
      id: 9,
      name: "Lakeview Villas",
      location: "Udaipur, Rajasthan",
      price: "₹1,40,00,000",
      description:
        "Elegant villas overlooking serene lakes, offering a peaceful retreat.",
      image: "/path/to/image9.jpg",
    },
    {
      id: 10,
      name: "Cityscape Towers",
      location: "Hyderabad, Telangana",
      price: "₹1,05,00,000",
      description:
        "Stylish apartments with easy access to tech parks and entertainment hubs.",
      image: "/path/to/image10.jpg",
    },
    {
      id: 11,
      name: "Palm Avenue",
      location: "Ahmedabad, Gujarat",
      price: "₹65,00,000",
      description:
        "Affordable homes in a prime location, surrounded by lush greenery.",
      image: "/path/to/image11.jpg",
    },
    {
      id: 12,
      name: "Horizon Residences",
      location: "Lucknow, Uttar Pradesh",
      price: "₹70,00,000",
      description:
        "Modern apartments with a focus on comfort and convenience.",
      image: "/path/to/image12.jpg",
    },
    {
      id: 13,
      name: "Pearl Coast Villas",
      location: "Pondicherry",
      price: "₹1,30,00,000",
      description:
        "Luxury beachfront villas with private pools and tranquil settings.",
      image: "/path/to/image13.jpg",
    },
    {
      id: 14,
      name: "Summit Residences",
      location: "Dehradun, Uttarakhand",
      price: "₹80,00,000",
      description:
        "Apartments surrounded by picturesque hills and serene landscapes.",
      image: "/path/to/image14.jpg",
    },
    {
      id: 15,
      name: "Eco Villas",
      location: "Jaipur, Rajasthan",
      price: "₹95,00,000",
      description:
        "Sustainable living spaces with eco-friendly architecture and design.",
      image: "/path/to/image15.jpg",
    },
  ];
  

  return (
    <section className="width">
      {/* Section Heading */}
      <div className="mb-4">
        <h2 className="heading">
          Newly Launched Properties
        </h2>
        <p className="subHeading">
          Explore our exclusive listings of newly launched properties.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        <Carousel>
          <CarouselContent>
            {properties.map((property) => (
              <CarouselItem className="basis-1/2 sm:basis-1/3" key={property.id}>
                <Card className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                  <CardHeader className="relative">
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      New Arrival
                    </Badge>
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 h-10 overflow-hidden">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {property.location}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-4 h-16 overflow-hidden ">
                      {property.description}
                    </p>
                    <div className="text-lg font-bold text-gray-900">
                      {property.price}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button
                      className="w-full bg-brand"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
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
