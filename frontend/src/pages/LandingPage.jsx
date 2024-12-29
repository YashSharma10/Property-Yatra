import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Correct import for Swiper's styles
import Typewriter from "react-typewriter-effect";
import { Search } from "lucide-react";  // Importing the search icon from lucide-react

const LandingPage = () => {
  return (
    <div className="relative bg-gray-100">
      {/* Hero Section with Search Box and Typing Effect */}
      <section className="flex flex-col items-center justify-center bg-cover bg-center py-20 relative" style={{ backgroundImage: 'url("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Find Your Dream Home
          </h1>
          <div className="text-xl mb-8">
            <Typewriter
              loop={true}
              text="Rent, Buy, or Sell Properties"
              typeSpeed={100}
              deleteSpeed={50}
              delay={100}
            />
          </div>

          {/* Search Box */}
          <div className="relative mb-10 w-80 md:w-96">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-xl text-gray-700 text-lg"
              placeholder="Search for properties..."
            />
            {/* Replaced react-icons search with lucide-react Search icon */}
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>
      </section>

      {/* Recent Properties Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Recently Added Properties</h2>

          {/* Swiper Carousel */}
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="mySwiper"
          >
            {/* Example Property Slides */}
            <SwiperSlide>
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Property 1"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Luxury Villa</h4>
                  <p className="text-gray-600 mb-2">4 Beds, 3 Baths</p>
                  <p className="text-lg font-bold text-blue-600">$1,200,000</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Property 1"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Luxury Villa</h4>
                  <p className="text-gray-600 mb-2">4 Beds, 3 Baths</p>
                  <p className="text-lg font-bold text-blue-600">$1,200,000</p>
                </div>
              </div>
            </SwiperSlide>
            {/* More Property Slides */}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">User-friendly Interface</h3>
              <p className="text-gray-600">Easily search, filter, and find the perfect property with our intuitive design.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Wide Range of Listings</h3>
              <p className="text-gray-600">Browse through thousands of properties for sale, rent, and more.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">Our platform ensures safe and secure transactions for both buyers and sellers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Clients Say</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-64">
              <p className="text-gray-600 italic">"The best property site I have ever used! Found my dream home within a week!"</p>
              <h4 className="text-lg font-semibold mt-4">John Doe</h4>
              <p className="text-gray-500">Homebuyer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-64">
              <p className="text-gray-600 italic">"I was able to sell my property quickly and securely. Great service!"</p>
              <h4 className="text-lg font-semibold mt-4">Jane Smith</h4>
              <p className="text-gray-500">Seller</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-8">Have any questions? Reach out to us and we'll get back to you as soon as possible.</p>
          <a href="mailto:info@propertysite.com" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 PropertySite. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
