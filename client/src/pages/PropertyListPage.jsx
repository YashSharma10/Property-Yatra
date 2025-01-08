import { Button } from "@/components/ui/button"; // Shadcn Button
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/constants";
import { setFilters } from "@/redux/slices/globalEvent";
import axios from "axios";
import { Heart, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PropertyListingPage = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProperties = async () => {
    setIsLoading(true);

    const queryParams = new URLSearchParams({
      ...filters,
      features: filters.features.join(","),
      page,
    });

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/properties/list?${queryParams}`
      );
      const data = await response.json();
      setProperties(data.properties);
      setTotalProperties(data.total);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    const updatedCategory = checked
      ? [...filters[category], name]
      : filters[category].filter((item) => item !== name);

    dispatch(setFilters({ [category]: updatedCategory }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: Number(value) }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleLikedProperty = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/liked/${id}`, {}, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);

  return (
    <div className="flex mt-14 max-w-5xl mx-auto gap-10 relative">
      {/* Filter Section */}
      <div className="p-3 my-10 h-fit sticky top-16 bg-white rounded-md shadow-lg border-r-2">
        {/* Select Property Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Property Type</label>
          <select
            name="type"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Price Range</label>
          <div className="flex justify-between text-sm mt-2">
            <span>₹{filters.price}</span>
          </div>
          <input
            type="range"
            name="price"
            min="0"
            max="10000000"
            step="100000"
            value={filters.price}
            onChange={handleRangeChange}
            className="w-full mt-2"
          />
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Features</h3>
          {[
            "parking",
            "lift",
            "swimming pool",
            "water",
            "electricity",
            "gas",
          ].map((feature) => (
            <label key={feature} className="block">
              <input
                type="checkbox"
                name={feature}
                checked={filters.features.includes(feature)}
                onChange={(e) => handleCheckboxChange(e, "features")}
                className="mr-2"
              />
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </label>
          ))}
        </div>

        {/* Furnished (Radio Buttons) */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Furnished</h3>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="block">
                <input
                  type="radio"
                  name="furnished"
                  value={option}
                  checked={filters.furnished === option}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Room Number*/}
        <div className="mb-6">
          <label className="block text-sm font-medium">Bedrooms</label>
          <select
            name="bedrooms"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* OwnerShip type */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Ownership</label>
          <select
            name="ownership"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            <option value="Lease">Lease</option>
            <option value="Freehold">Freehold</option>
          </select>
        </div>

        {/* Year Built */}
        <div>
          <label className="block text-sm font-medium">Built Year</label>
          <select
            name="builtYear"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          >
            <option value="">All</option>
            {Array.from({ length: 50 }, (_, i) => 2023 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Listings */}
      <div className="">
        <h2 className="text-lg font-semibold mb-4">
          {totalProperties} results |
        </h2>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center mt-20 gap-12">
            {/* Placeholder for loader */}
            {/* <Loader /> */}
            {[1, 2, 3].map((item) => (
              <div className="flex flex-col space-y-3" key={item}>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-h-[75vh]">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex rounded-lg shadow-sm cursor-pointer border transition hover:shadow-lg"
              >
                {/* Property Image and Heart Icon */}
                <div className="relative flex-shrink-0">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="h-72 w-96 object-cover rounded-tl-lg rounded-bl-lg"
                  />
                  <Heart
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleLikedProperty(property._id)}
                  />
                </div>

                {/* Property Details */}
                <div
                  className="flex-grow p-4"
                  onClick={() => handlePropertyClick(property._id)}
                >
                  <p className="text-xl font-semibold">{property.name}</p>
                  <p className="text-gray-600 text-sm truncate">
                    {property.description}
                  </p>
                  <div className="flex gap-3 text-sm py-2">
                    <p className="after:content-['|'] after:ml-0.5 after:text-gray-400 block">
                      ₹{property.price}
                    </p>
                    <p className="after:content-['|'] after:ml-0.5 after:text-gray-400 block">
                      {property.area} sqft
                    </p>
                    <p>{property.configuration}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Highlights: {property.type}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-24 flex items-center gap-3">
                    <Button variant="outline">View Number</Button>
                    <Button>
                      <Phone />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}

        {/* Pagination */}
        {properties.length > 0 && (
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * 5 >= totalProperties}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
