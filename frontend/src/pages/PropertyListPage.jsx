import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Skeleton } from "@/components/ui/skeleton";
import { Cross, FilterIcon, Heart, Info, X } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setFilters } from "@/redux/slices/globalEvent";
import { BACKEND_URL } from "@/constants";

const PropertyListingPage = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState([]);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const fetchProperties = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      ...filters,
      features: JSON.stringify(filters.features),
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

  const fetchLikedPropertiesOfUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const likedProperties = response.data.user.likedProperties.map(
        (liked) => liked._id
      );
      setLiked(likedProperties);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    if (category === "features") {
      const updatedFeatures = {
        ...filters.features,
        [name]: checked,
      };
      dispatch(setFilters({ ...filters, features: updatedFeatures }));
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    dispatch(setFilters({ listingType: value }));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const price = filters.listingType === "sell" ? "sellPrice" : "rentPrice";
    dispatch(setFilters({ [price]: Number(value), price: Number(value) }));
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    dispatch(setFilters({ propertyType: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleLikedProperty = async (id) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/liked/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLikedPropertiesOfUser();
    } catch (error) {
      if (
        error.response?.status === 401 ||
        error.message === "No token found"
      ) {
        navigate("/auth");
        toast.error("Session expired!");
      } else {
        console.error("Auth check failed:", error);
      }
    }
  };

  const handleFilterVisible = () => {
    setFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchProperties();
    fetchLikedPropertiesOfUser();
  }, [filters, page]);

  return (
    <div className="width flex gap-3 sm:gap-8 justify-center">
      {/* Filter Section */}
      <div
        className={`p-6 h-fit sticky  bg-white rounded-lg shadow-md border sm:block w-full sm:w-[450px] ${
          filterVisible ? "block" : "hidden"
        }`}
      >
        <span className="flex gap-1 mb-2 w-full justify-end sm:hidden">
            <X
              onClick={handleFilterVisible}
              className="cursor-pointer"
            />
          </span>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            name="type"
            onChange={handleDropdownChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            {["All", "residential", "commercial", "pg", "plot"].map((item) => (
              <option value={item} key={item} className="capitalize">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <input
            type="text"
            value={filters.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Features</h3>
          {Object.keys(filters.features).map((feature) => (
            <label key={feature} className="block text-sm text-gray-600 mb-1">
              <input
                type="checkbox"
                name={feature}
                checked={filters.features[feature]}
                onChange={(e) => handleCheckboxChange(e, "features")}
                className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              {feature}
            </label>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Type</h3>
          <div className="flex gap-4">
            {["rent", "sell"].map((option) => (
              <label key={option} className="block text-sm text-gray-600">
                <input
                  type="radio"
                  value={option}
                  checked={filters.listingType === option}
                  onChange={handleRadioChange}
                  className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Built Year
          </label>
          <select
            name="builtYear"
            onChange={handleDropdownChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
      <div className={`${!filterVisible ? "block" : "hidden"}`}>
        <div className=" mb-4 flex justify-between">
          <h2 className="text-lg font-semibold mb-4">
            {totalProperties} results |
          </h2>
          <span className="flex gap-1 sm:hidden">
            Filters
            <FilterIcon
              onClick={handleFilterVisible}
              className="cursor-pointer"
            />
          </span>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center mt-20 gap-12">
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
          <div className="grid grid-cols-1 gap-4 min-h-[75vh] mr-2">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex rounded-lg shadow-sm w-full h-fit flex-col sm:flex-row border transition hover:shadow-lg"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="h-72 w-96 object-cover rounded-tl-lg sm:rounded-bl-lg rounded-tr-lg sm:rounded-tr-none"
                  />
                  {liked.length > 0 && liked.includes(property._id) && (
                    <Heart
                      className="absolute top-2 right-2 text-red-500 cursor-pointer"
                      fill="red"
                    />
                  )}
                  <Heart
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                    onClick={() => handleLikedProperty(property._id)}
                  />
                </div>
                <div className="flex-grow p-4">
                  <div className="text-xl font-semibold flex justify-between items-center">
                    <span>{property.name}</span>
                    <span className="text-xs bg-green-400 rounded-md px-2 py-1">
                      {property.listingType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm overflow-hidden w-full max-h-10">
                    {property.description}
                  </p>
                  <div className="flex gap-3 text-sm py-1">
                    <p className="after:content-['|'] after:ml-0.5 after:text-gray-400 block">
                      ₹{property.sellPrice || property.rentPrice}
                    </p>
                    <p className="after:content-['|'] after:ml-0.5 after:text-gray-400 block">
                      {property.area} sqft
                    </p>
                    <p>{property.propertyAge} year old</p>
                  </div>
                  <div className="text-sm text-gray-500 w-full sm:h-44 flex flex-col justify-between">
                    <div>
                      <span className="block">Highlights:</span>
                      <div className="flex gap-2 mt-1 flex-wrap overflow-hidden">
                        {property.features &&
                          Object.keys(property.features).map((feature) => (
                            <Badge key={feature}>{feature}</Badge>
                          ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button
                        className="w-full"
                        onClick={() => handlePropertyClick(property._id)}
                      >
                        <Info />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}

        {properties.length > 0 && (
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <span className="text-gray-600">Page {page}</span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(totalProperties / 10)}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
