import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Sheet } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/constants";
import { setFilters } from "@/redux/slices/globalEvent";
import axios from "axios";
import { ArrowBigDown, FilterIcon, Heart, Info, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const PropertyListingPage = () => {
  const { filters } = useSelector((store) => store.globalEvent);
  const { token, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState([]);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(filters);

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
      const properties = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      properties.data.user.likedProperties.map((liked) =>
        setLiked((p) => [...p, liked._id])
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    if (category === "features") {
      const updatedFeatures = {
        ...filters.features,
        [name]: checked,
      };
      dispatch(
        setFilters({
          ...filters,
          features: updatedFeatures,
        })
      );
    } else {
      console.error(
        "Checkbox changes are only supported for 'features' category."
      );
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    dispatch(setFilters({ listingType: value }));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const price = filters.listingType === "sell" ? "sellPrice" : "rentPrice";
    dispatch(setFilters({ [price]: Number(value) }));
    dispatch(setFilters({ price: Number(value) }));
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
    console.log(token);

    try {
      const response = await axios.post(
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

  const [filterVisible, setFilterVisible] = useState(false);
  const handleFilterVisible = () => {
    setFilterVisible((r) => !r);
    console.log(filterVisible);
  };
  useEffect(() => {
    fetchProperties();
    fetchLikedPropertiesOfUser();
  }, [filters, page]);

  return (
    <div className="width flex gap-3 sm:gap-8 justify-center">
      {/* Filter Section */}
      <div
        className={`p-3 my-10 h-fit sticky top-16 bg-white rounded-md shadow-lg border-r-2  sm:block w-full sm:w-fit ${
          filterVisible ? "block" : "hidden"
        }`}
      >
        {/* Select Property Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Property Type</label>
          <select
            name="type"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2 capitalize"
          >
            {["All", "residential", "commercial", "pg", "plot"].map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Price Range</label>

          <input
            type="text"
            value={filters.price}
            onChange={handleInputChange}
            className="w-full mt-2 border rounded-md p-1"
          />
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Features</h3>
          {Object.keys(filters.features).map((feature) => (
            <label key={feature} className="block">
              <input
                type="checkbox"
                name={feature}
                checked={filters.features[feature]}
                onChange={(e) => handleCheckboxChange(e, "features")}
              />
              {feature}
            </label>
          ))}
        </div>

        {/* Rent // Sell*/}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Type</h3>
          <div className="flex gap-4">
            {["rent", "sell"].map((option) => (
              <label key={option} className="block">
                <input
                  type="radio"
                  value={option}
                  checked={filters.listingType === option}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
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
        <div className="sm:hidden">
          <FilterIcon onClick={handleFilterVisible} />
          <button>Sort </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {totalProperties} results |
        </h2>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center mt-20 gap-12">
            {/* Loader */}
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
                {/* Property Image and Heart Icon */}
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

                {/* Property Details */}
                <div className="flex-grow p-4">
                  <div className="text-xl font-semibold flex justify-between items-center">
                    <span>{property.name}</span>
                    <span className="text-xs bg-green-400 rounded-md px-2 py-1">
                      {property.listingType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm  overflow-hidden w-full max-h-10">
                    {property.description}
                  </p>
                  <div className="flex gap-3 text-sm  py-1">
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
                        {property?.features ? (
                          <Badge>Nothing</Badge>
                        ) : (
                          property?.features &&
                          Object.keys(property.features).map((feature) => (
                            <Badge key={feature}>{feature}</Badge>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="mt-2 ">
                      <Button
                        className="w-full"
                        onClick={() => handlePropertyClick(property._id)}
                      >
                        <Info />
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
