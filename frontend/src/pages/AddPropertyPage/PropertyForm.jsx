import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const allowedFormats = ["jpg", "jpeg", "png", "gif"];

const PropertyForm = () => {
  const navigate = useNavigate();
  const { propertyDetails, roadmapVisible } = useSelector(
    (store) => store.globalEvent
  );
  const { token } = useSelector((store) => store.auth);
  console.log(propertyDetails);

  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    sellPrice: 0,
    rentPrice: 0,
    description: "",
    images: [],
    propertyAge: 0,
    area: 0,
    listingType: propertyDetails.listingType,
    propertyType: propertyDetails.propertyType,
    address: {
      house: "",
      city: "",
      pincode: "",
      state: "",
    },
    features: {
      parking: false,
      water: false,
      lift: false,
      electricity: false,
      swimmingPool: false,
      modularKitchen: false,
      balcony: false,
      park: false,
      furnished: false,
      meetingRoom: false,
      meal: false,
      ac: false,
      wifi: false,
      boundaryWall: false,
      gym: false,
    },
  });

  console.log(propertyFormData);

  const facilitiesList = () => {
    let facilities = [
      { name: "parking", label: "Parking" },
      { name: "water", label: "Water" },
      { name: "electricity", label: "Electricity" },
    ];

    if (propertyDetails.propertyType === "PG") {
      facilities = [
        ...facilities,
        { name: "wifi", label: "Wi-Fi" },
        { name: "laundry", label: "Laundry" },
        { name: "meals", label: "Meals" },
        { name: "ac", label: "AC" },
        { name: "cleaning", label: "Cleaning" },
        { name: "lift", label: "Lift" },
      ];
    }
    if (propertyDetails.propertyType === "Commercial") {
      facilities = [
        ...facilities,
        { name: "wifi", label: "Wi-Fi" },
        { name: "maintenance", label: "Maintenance" },
        { name: "cleaning", label: "Cleaning" },
        { name: "ac", label: "AC" },
        { name: "furnished", label: "Furnished" },
        { name: "meetingRoom", label: "Meeting Room" },
        { name: "lift", label: "Lift" },
      ];
    }
    if (propertyDetails.propertyType === "Plot") {
      facilities = [
        ...facilities,
        { name: "boundaryWall", label: "Boundary Wall" },
      ];
    }
    if (propertyDetails.propertyType === "Flat") {
      facilities = [
        ...facilities,
        { name: "swimmingPool", label: "Swimming pool" },
        { name: "gym", label: "Gym" },
        { name: "modularKitchen", label: "Modular Kitchen" },
        { name: "balcony", label: "Balcony" },
        { name: "park", label: "Park" },
      ];
    }

    return facilities;
  };

  const isFileValid = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedFormats.includes(fileExtension);
  };
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const handleFileChange = (e) => {
    const { files } = e.target;
    let validFiles = [];
    let error = "";
    const file = Array.from(e.target.files);
    setImages(files);

    const filePreviews = file.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);

    // Validate files before setting them
    Array.from(files).forEach((file) => {
      if (isFileValid(file)) {
        validFiles.push(file);
      } else {
        error = "Only JPG, JPEG, PNG, and GIF files are allowed.";
      }
    });

    if (error) {
      setImageError(error); // Show the error message
    } else {
      setImageError(""); // Clear the error if files are valid
    }

    setPropertyFormData((prev) => ({
      ...prev,
      images: validFiles,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPropertyFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAddressDetails = (field, value) => {
    setPropertyFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Authentication required");
    } else {
      setPropertyFormData({
        ...propertyFormData,
        listingType: propertyDetails.listingType,
        propertyType: propertyDetails.propertyType,
      });
      const formData = new FormData();
      Object.entries(propertyFormData).forEach(([key, value]) => {
        if (key === "address") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          if (key === "features") {
            const featuresInclude = {};

            Object.entries(value).forEach(([featureKey, featureValue]) => {
              if (featureValue === true) {
                featuresInclude[featureKey] = true;
              }
            });

            formData.append("features", JSON.stringify(featuresInclude));
          } else {
            formData.append(key, value);
          }
        }
      });

      try {
        setLoading(true);
        const response = await axios.post(
          `${BACKEND_URL}/api/properties/new`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setPropertyFormData({});
          setLoading(false);
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleNext = () => {
    if (activeTab === "tab1") setActiveTab("tab2");
    else if (activeTab === "tab2") setActiveTab("tab3");
  };

  const handlePrevious = () => {
    if (activeTab === "tab2") setActiveTab("tab1");
    else if (activeTab === "tab3") setActiveTab("tab2");
  };

  return (
    <section
      className={`${ 
        roadmapVisible ? "hidden" : ""
      } width relative bg-white max-w-md my-3 rounded-md `}
    >
      <Tabs value={activeTab} >
        <TabsList className="mb-6 w-full mx-auto">
          <TabsTrigger value="tab1" onClick={() => setActiveTab("tab1")}>
            Basic Details
          </TabsTrigger>
          <TabsTrigger value="tab2" onClick={() => setActiveTab("tab2")}>
            Price & Age
          </TabsTrigger>
          <TabsTrigger value="tab3" onClick={() => setActiveTab("tab3")}>
            Media Upload
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Details */}
        <TabsContent value="tab1" >
          <div className="space-y-4">
            <Input
              placeholder="Property Name"
              name="name"
              value={propertyFormData.name}
              onChange={handleInputChange}
              className="w-full"
            />

            <Input
              placeholder="Property area in sqf"
              name="area"
              onChange={handleInputChange}
              className="w-full"
              type="number"
            />

            <Input
              placeholder="Property age"
              name="propertyAge"
              type="number"
              onChange={handleInputChange}
              className="w-full"
            />

            <div className="space-y-2">
              <label className="block font-medium">Facilities:</label>
              <div className="grid grid-cols-2 gap-4">
                {facilitiesList().map((facility) => (
                  <div
                    key={facility.name}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={facility.name}
                      name={facility.name}
                      checked={propertyFormData.features[facility.name]}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={facility.name}>{facility.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Description"
              name="description"
              value={propertyFormData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full"
            />
          </div>
        </TabsContent>

        {/* Tab 2: Rent & Property Details */}
        <TabsContent value="tab2">
          <div className="space-y-4">
            <Input
              placeholder={
                propertyDetails.listingType === "sell"
                  ? "Sell Price"
                  : "Monthly Rent Price"
              }
              name={
                propertyDetails.listingType === "sell"
                  ? "sellPrice"
                  : "rentPrice"
              }
              onChange={handleInputChange}
              type="number"
              className="w-full"
            />

            {/* Address Details */}
            <Input
              placeholder="Address Line 1"
              name="house"
              value={propertyFormData.address.house}
              onChange={(e) => addAddressDetails(e.target.name, e.target.value)}
              className="w-full"
            />
            <console className="log"></console>
            <Input
              placeholder="City"
              name="city"
              value={propertyFormData.address.city}
              onChange={(e) => addAddressDetails(e.target.name, e.target.value)}
              className="w-full"
            />

            <Input
              placeholder="Pincode"
              name="pincode"
              value={propertyFormData.address.pincode}
              onChange={(e) => addAddressDetails(e.target.name, e.target.value)}
              className="w-full"
            />

            <Input
              placeholder="State"
              name="state"
              value={propertyFormData.address.state}
              onChange={(e) => addAddressDetails(e.target.name, e.target.value)}
              className="w-full"
            />
          </div>
        </TabsContent>

        {/* Tab 3: Media Upload */}
        <TabsContent value="tab3" className="h-full"> 
          <div className="space-y-4">
            <label className="block font-medium">Upload Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
          </div>
          <div>
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="preview"
                style={{ width: 100 }}
              />
            ))}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full"
              // disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="sticky mt-3 bottom-0 flex justify-between w-full">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={activeTab === "tab1"}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={activeTab === "tab3"}>
          Next
        </Button>
      </div>

      {/* Submit Button */}
    </section>
  );
};

export default PropertyForm;
