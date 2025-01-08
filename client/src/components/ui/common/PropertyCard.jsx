import { Heart } from "lucide-react";
import React from "react";

const PropertyCard = ({property}) => {
  return (
    <div
      key={property._id}
      className="flex rounded-lg shadow-sm cursor-pointer border transition hover:shadow-lg"
    >
      {/* Property Image and Heart Icon */}
      <div className="relative flex-shrink-0">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-44 h-44 object-cover rounded-tl-lg rounded-bl-lg"
        />
        <Heart
          className="absolute top-2 right-2 text-red-500 cursor-pointer"
          // onClick={() => handleLikedProperty(property._id)}
        />
      </div>

      {/* Property Details */}
      <div
        className="flex-grow p-4"
        // onClick={() => handlePropertyClick(property._id)}
      >
        <p className="text-xl font-semibold">{property.name}</p>
        <p className="text-gray-600 text-sm truncate">{property.description}</p>
        <div className="flex gap-3 text-sm py-2">
          <p className="after:content-['|'] after:ml-0.5 after:text-gray-400">
            ₹
            {property.sellPrice === 0 ? property.rentPrice : property.sellPrice}
          </p>
          <p className="after:content-['|'] after:ml-0.5 after:text-gray-400">
            {property.area} sqft
          </p>
          <p>{property.configuration}</p>
        </div>
        <p className="text-sm text-gray-500">Address: {property.type}</p>
        <p>
          H.no {property.address.house},{property.address.state}
        </p>
        <p>Pincode : {property.address.pincode}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
