import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState({
    name: "",
    type: "",
    price: "",
    configuration: "",
    propertyType: "",
    utilities: { water: false, electricity: false, gas: false },
    area: "",
    address: { street: "", city: "", state: "", country: "", pincode: "" },
    propertyAge: "",
    transactionType: "",
    features: {
      parking: false,
      lift: false,
      swimmingPool: false,
      modularKitchen: false,
      balcony: false,
      park: false,
    },
    description: "",
    images: [],
    userEmail: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      const [key, subKey] = name.includes(".") ? name.split(".") : [name];
      setPropertyDetails((prev) => ({
        ...prev,
        [key]: subKey ? { ...prev[key], [subKey]: checked } : checked,
      }));
    } else if (type === "file") {
      setPropertyDetails((prev) => ({ ...prev, images: files }));
    } else {
      setPropertyDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(propertyDetails).forEach(([key, value]) => {
      formData.append(
        key,
        typeof value === "object" && !value.files
          ? JSON.stringify(value)
          : value
      );
    });
    Array.from(propertyDetails.images).forEach((file) =>
      formData.append("images", file)
    );
    try {
      const response = await fetch("http://localhost:3000/api/properties/add", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) navigate("/property-listing");
      else console.error(result.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Add Property Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {[
          {
            label: "Property Name",
            type: "text",
            name: "name",
            placeholder: "Enter property name",
          },
          {
            label: "Price",
            type: "number",
            name: "price",
            placeholder: "Enter price",
          },
          {
            label: "Area (in sq.ft)",
            type: "number",
            name: "area",
            placeholder: "Enter area",
          },
          {
            label: "Property Age (in years)",
            type: "number",
            name: "propertyAge",
            placeholder: "Enter property age",
          },
          {
            label: "Your Email",
            type: "email",
            name: "userEmail",
            placeholder: "Enter your email",
          },
        ].map(({ label, ...input }) => (
          <div key={input.name} className="form-group mt-4">
            <label className="text-lg font-medium">{label}</label>
            <input
              {...input}
              value={propertyDetails[input.name]}
              onChange={handleChange}
              className="w-full p-4 mt-2 border rounded-lg"
              required
            />
          </div>
        ))}

        {[
          {
            label: "Property Type",
            name: "type",
            options: ["Flat", "Villa", "Independent House", "Penthouse"],
          },
          {
            label: "Configuration",
            name: "configuration",
            options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"],
          },
          {
            label: "Furnishing",
            name: "propertyType",
            options: ["Furnished", "Semi-Furnished", "Unfurnished"],
          },
          {
            label: "Transaction Type",
            name: "transactionType",
            options: ["Resale", "New Booking"],
          },
        ].map(({ label, name, options }) => (
          <div key={name} className="form-group mt-4">
            <label className="text-lg font-medium">{label}</label>
            <select
              name={name}
              value={propertyDetails[name]}
              onChange={handleChange}
              className="w-full p-4 mt-2 border rounded-lg"
              required
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="form-group mt-4">
          <label className="text-lg font-medium">Utilities</label>
          {["water", "electricity", "gas"].map((utility) => (
            <label key={utility} className="block">
              <input
                type="checkbox"
                name={`utilities.${utility}`}
                checked={propertyDetails.utilities[utility]}
                onChange={handleChange}
              />{" "}
              {utility}
            </label>
          ))}
        </div>

        <div className="form-group mt-4">
          <label className="text-lg font-medium">Features</label>
          {[
            "parking",
            "lift",
            "swimmingPool",
            "modularKitchen",
            "balcony",
            "park",
          ].map((feature) => (
            <label key={feature} className="block">
              <input
                type="checkbox"
                name={`features.${feature}`}
                checked={propertyDetails.features[feature]}
                onChange={handleChange}
              />{" "}
              {feature}
            </label>
          ))}
        </div>

        <div className="form-group mt-4">
          <label className="text-lg font-medium">Description</label>
          <textarea
            name="description"
            value={propertyDetails.description}
            onChange={handleChange}
            className="w-full p-4 mt-2 border rounded-lg"
            required
          />
        </div>

        <div className="form-group mt-4">
          <label className="text-lg font-medium">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full mt-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
