import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PropertyForm = () => {
  const { propertyDetails } = useSelector((store) => store.globalEvent);
  console.log(propertyDetails);

  const [activeTab, setActiveTab] = useState("tab1");
  const [formData, setFormData] = useState({
    propertyName: "",
    facilities: {
      ac: false,
      singleRoom: false,
      sharingRoom: false,
      parking: false,
      water: false,
      electricity: false,
      swimmingPool: false,
      balcony: false,
      gas: false,
      food: false,
    },
    location: "",
    description: "",
    rent: "",
    propertyAge: "",
    propertyType: "",
    photos: null,
    videos: null,
  });

  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    description: "",
    sellPrice: 0,
    rentPrice: 0,
    area: 0,
  });

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
        { name: "swimming pool", label: "Swimming pool" },
        { name: "gym", label: "Gym" },
      ];
    }

    return facilities;
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: checked,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  const handleNext = () => {
    if (activeTab === "tab1") setActiveTab("tab2");
    else if (activeTab === "tab2") setActiveTab("tab3");
  };

  const handlePrevious = () => {
    if (activeTab === "tab2") setActiveTab("tab1");
    else if (activeTab === "tab3") setActiveTab("tab2");
  };

  const { roadmapVisible } = useSelector((store) => store.globalEvent);
  return (
    <section
      className={` ${
        roadmapVisible ? "hidden" : ""
      } width bg-white max-w-md my-3 rounded-md`}
    >
      <Tabs value={activeTab}>
        <TabsList className="mb-6 w-full mx-auto">
          <TabsTrigger value="tab1" onClick={() => setActiveTab("tab1")}>
            Basic Details
          </TabsTrigger>
          <TabsTrigger value="tab2" onClick={() => setActiveTab("tab2")}>
            Rent & Age
          </TabsTrigger>
          <TabsTrigger value="tab3" onClick={() => setActiveTab("tab3")}>
            Media Upload
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Details */}
        <TabsContent value="tab1">
          <div className="space-y-4">
            <Input
              placeholder="Property Name"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              className="w-full"
            />

            <Input
              placeholder="Property area in sqf"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              className="w-full"
              type="number"
            />

            <Input
              placeholder="Property age"
              name="propertyName"
              type="number"
              value={formData.propertyName}
              onChange={handleInputChange}
              className="w-full"
            />

            {/* Selection for properties */}
            {/* <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, propertyType: value }))
              }
            >
              <SelectTrigger className="w-full">
                <span>Select Property Type</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="House">House</SelectItem>
              </SelectContent>
            </Select> */}

            <div className="space-y-2">
              <label className="block font-medium">Facilities:</label>
              <div className="grid grid-cols-2 gap-4">
                {facilitiesList().map((facility) => (
                  <div
                    key={facility.name}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={facility.name}
                      name={facility.name}
                      checked={formData.facilities[facility.name]}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={facility.name}>{facility.label}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* <Input
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full"
            /> */}
            <Textarea
              placeholder="Description"
              name="description"
              value={formData.description}
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
              placeholder={propertyDetails.listingType}
              name={propertyDetails.listingType}
              value={formData.rent}
              onChange={handleInputChange}
              type="number"
              className="w-full"
            />
            {/* <Input
              placeholder="Age of Property (in Years)"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleInputChange}
              type="number"
              className="w-full"
            /> */}
            {/* House Number */}
            <div>
              <Input
                id="houseNumber"
                name="houseNumber"
                // value={addressDetails.houseNumber}
                // onChange={handleChange}
                placeholder="Enter house number"
                required
              />
            </div>

            {/* City */}
            <div>
              <Input
                id="city"
                name="city"
                // value={addressDetails.city}
                // onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            {/* State */}
            <div>
              <Input
                id="state"
                name="state"
                // value={addressDetails.state}
                // onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <Input
                id="pincode"
                name="pincode"
                // value={addressDetails.pincode}
                // onChange={handleChange}
                placeholder="Enter pincode"
                required
              />
            </div>

            <Textarea
              placeholder="Additional Property Details (e.g., nearby landmarks)"
              name="additionalDetails"
              onChange={handleInputChange}
              rows={4}
              className="w-full"
            />
          </div>
        </TabsContent>

        {/* Tab 3: Media Upload */}
        <TabsContent value="tab3">
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Upload Photos:</label>
              <Input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Upload Videos:</label>
              <Input
                type="file"
                name="videos"
                multiple
                accept="video/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6 pb-6">
        <Button
          onClick={handlePrevious}
          disabled={activeTab === "tab1"}
          className="mr-2"
        >
          Previous
        </Button>
        {activeTab !== "tab3" ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </section>
  );
};

export default PropertyForm;
