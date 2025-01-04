import { Button } from "@/components/ui/button"; // Shadcn Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn Card
import { Checkbox } from "@/components/ui/checkbox"; // Shadcn Checkbox
import { Select, SelectContent, SelectItem } from "@/components/ui/select"; // Shadcn Select
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyListingPage = () => {
  const { search } = useParams();
  console.log(search);

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    features: [],
    utilities: [],
    furnished: "",
    parking: "",
    petsAllowed: "",
    bedrooms: "",
    bathrooms: "",
    ownership: "",
    builtYear: "",
  });
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProperties = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      ...filters,
      features: filters.features.join(","),
      utilities: filters.utilities.join(","),
      page,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/properties/list?${queryParams}`
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
    setFilters((prev) => {
      const updatedCategory = checked
        ? [...prev[category], name]
        : prev[category].filter((item) => item !== name);
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);

  return (
    <div className="flex flex-col lg:flex-row mt-20">
      {/* Sidebar for Filters */}
      <div className="w-full lg:w-1/4 p-6 bg-gray-100 border-r">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>

        {/* Property Type Dropdown */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium">Property Type</label>
          <Select
            name="type"
            onChange={handleDropdownChange}
            value={filters.type}
          >
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Independent House">
                Independent House
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* Price Range */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium">Max Price</label>
          <input
            type="number"
            name="price"
            onChange={handleDropdownChange}
            className="w-full mt-2 border rounded p-2"
          />
        </div> */}

        {/* Features */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Features</h3>
          {["parking", "lift", "swimming pool"].map((feature) => (
            <label key={feature} className="block">
              <Checkbox
                name={feature}
                checked={filters.features.includes(feature)}
                onChange={(e) => handleCheckboxChange(e, "features")}
              />
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </label>
          ))}
        </div> */}

        {/* Utilities */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Utilities</h3>
          {["water", "electricity", "gas"].map((utility) => (
            <label key={utility} className="block">
              <Checkbox
                name={utility}
                checked={filters.utilities.includes(utility)}
                onChange={(e) => handleCheckboxChange(e, "utilities")}
              />
              {utility.charAt(0).toUpperCase() + utility.slice(1)}
            </label>
          ))}
        </div> */}

        {/* Additional Filters */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium">Furnished</label>
          <Select
            name="furnished"
            onChange={handleDropdownChange}
            value={filters.furnished}
          >
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* Other Filters */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium">Bedrooms</label>
          <Select
            name="bedrooms"
            onChange={handleDropdownChange}
            value={filters.bedrooms}
          >
           <SelectContent>
           <SelectItem value="">All</SelectItem>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num}>
                {num}
              </SelectItem>
            ))}
           </SelectContent>
          </Select>
        </div> */}

        {/* <div className="mb-6">
          <label className="block text-sm font-medium">Ownership</label>
          <Select
            name="ownership"
            onChange={handleDropdownChange}
            value={filters.ownership}
          >
           <SelectContent>
           <SelectItem value="">All</SelectItem>
            <SelectItem value="Lease">Lease</SelectItem>
            <SelectItem value="Freehold">Freehold</SelectItem>
           </SelectContent>
          </Select>
        </div> */}

        {/* <div>
          <label className="block text-sm font-medium">Built Year</label>
          <Select
            name="builtYear"
            onChange={handleDropdownChange}
            value={filters.builtYear}
          >
           <SelectContent>
           <SelectItem value="">All</SelectItem>
            {Array.from({ length: 50 }, (_, i) => 2023 - i).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
           </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Property Listings */}
      <div className="w-full lg:w-3/4 p-6">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            {/* <Loader /> */}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 min-h-[75vh]">
            {properties.map((property) => (
              <Card
                key={property._id}
                className="mb-4 border rounded shadow-sm cursor-pointer  relative"
                onClick={() => handlePropertyClick(property._id)}
              >
                <CardContent>
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-1/3 object-cover mr-4 rounded-tl-lg rounded-bl-lg"
                  />
                  <p>{property.description}</p>
                  <p>
                    <strong>Price:</strong> ₹{property.price}
                  </p>
                  <p>
                    <strong>Type:</strong> {property.type}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No properties found.</p>
        )}

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default PropertyListingPage;
