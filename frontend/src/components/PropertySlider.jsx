import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import default carousel styles

const PropertyCarousel = () => {
  const [properties, setProperties] = useState([]);

  // Fetch the latest properties when the component mounts
  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/properties/latest");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchLatestProperties();
  }, []);

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">Recently Added Properties</h2>

        {/* Carousel Wrapper */}
        <Carousel
          showArrows={true} // Display next/previous arrows
          infiniteLoop={true} // Enable infinite looping of the carousel
          showThumbs={false} // Disable thumbnail navigation
          showStatus={false} // Disable status display (like slide x of y)
          emulateTouch={true} // Allow touch gestures on mobile
          dynamicHeight={true} // Adjust height dynamically based on content
          swipeable={true} // Allow swipe navigation on mobile
          autoPlay={true} // Automatically play the carousel
          interval={3000} // Delay between slides (in milliseconds)
          transitionTime={500} // Time for each transition (in milliseconds)
          centerMode={true} // Enable centering of the slides
          centerSlidePercentage={33.33} // Set the percentage for the centered slide
          showIndicators={false} // Hide indicators below the carousel
          stopOnHover={true} // Stop autoplay when hovered
          width={"100%"} // Ensure carousel is 100% width of the container
        >
          {properties.length > 0 &&
            properties.map((property) => (
              <div key={property._id} className="relative">
                {/* Property Image */}
                <img
                  src={property.images[0] || "https://via.placeholder.com/600"}
                  alt={property.name}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
                {/* Image Overlay with Property Details */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg flex flex-col justify-end p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{property.name}</h4>
                  <p className="text-white text-sm mb-2">
                    {property.bedrooms} Beds, {property.bathrooms} Baths
                  </p>
                  <p className="text-lg font-bold text-blue-400">{property.price}</p>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PropertyCarousel;
