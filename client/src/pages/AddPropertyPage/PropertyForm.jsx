import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useSelector } from "react-redux";


const PropertyForm = () => {
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
    <section className={`${roadmapVisible?"hidden":"mt-14 mx-auto max-w-md py-5 h-full"}`} style={{height: "calc(100vh - 32vh"}}>
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
            <Select
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
            </Select>
            <div className="space-y-2">
              <label className="block font-medium">Facilities:</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "ac", label: "AC" },
                  { name: "singleRoom", label: "Single Room" },
                  { name: "sharingRoom", label: "Sharing Room" },
                  { name: "parking", label: "Parking" },
                  { name: "water", label: "Water" },
                  { name: "electricity", label: "Electricity" },
                  { name: "swimmingPool", label: "Swimming Pool" },
                  { name: "balcony", label: "Balcony" },
                  { name: "gas", label: "Gas" },
                  { name: "food", label: "Food" },
                ].map((facility) => (
                  <div key={facility.name} className="flex items-center space-x-2">
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
            <Input
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full"
            />
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
              placeholder="Rent / Price"
              name="rent"
              value={formData.rent}
              onChange={handleInputChange}
              type="number"
              className="w-full"
            />
            <Input
              placeholder="Age of Property (in Years)"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleInputChange}
              type="number"
              className="w-full"
            />
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

      <div className="flex justify-between mt-6">
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