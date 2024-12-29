import { Search } from "lucide-react"; // Importing the search icon from lucide-react
import PropertyCarousel from "../components/PropertySlider";

const LandingPage = () => {
  return (
    <div className="relative bg-gray-100 mt-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-cover bg-center py-32 relative h-2/3" style={{ backgroundImage: 'url("https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div> {/* Added backdrop-blur-lg for glass effect */}
        <div className="z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 shadow-md">
            Find Your Dream Home
          </h1>
          <div className="text-xl mb-8">
            Rent, Buy, or Sell Properties
          </div>

          {/* Search Box */}
          <div className="relative mb-10 w-80 md:w-96 mx-auto">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-xl text-gray-700 text-lg placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Search for properties..."
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>
      </section>

      {/* Recent Properties Carousel */}
      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          {/* Swiper Carousel */}
          <PropertyCarousel/>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">User-friendly Interface</h3>
              <p className="text-gray-600">Easily search, filter, and find the perfect property with our intuitive design.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Wide Range of Listings</h3>
              <p className="text-gray-600">Browse through thousands of properties for sale, rent, and more.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">Our platform ensures safe and secure transactions for both buyers and sellers.</p>
            </div>
          </div>
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
