import React, { useState } from "react";
import { CheckCircle, Camera, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setRoadmapVisible } from "@/redux/slices/globalEvent";
import { DialogFooter } from "@/components/ui/dialog"; // Add this line if it's missing


const steps = [
  {
    title: "Add Property Details",
    description:
      "Provide all the necessary details about the property, including location, type (house, apartment, etc.), size, and any other important information to make your listing stand out.",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "bg-green-500",
  },
  {
    title: "Upload Pictures and Videos",
    description:
      "Upload high-quality images and videos of your property to give potential buyers and renters a virtual tour. This helps create a lasting impression and increases interest.",
    icon: <Camera className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    title: "Add Pricing and Ownership",
    description:
      "Define the price of your property and specify whether it is for sale, rent, or lease. Additionally, mention the ownership details, including if you are the owner or an authorized agent.",
    icon: <DollarSign className="w-8 h-8" />,
    color: "bg-yellow-500",
  },
];

const Roadmap = () => {
  const [selectRadio, setSelectRadio] = useState("residential");
  const [selectType, setSelectType] = useState({ i: 0, v: "" });
  const [selectTypeSub, setSelectTypeSub] = useState({ i: 0, v: "" });
  const [isVisible, setIsVisible] = useState(true);

  const { roadmapVisible } = useSelector((store) => store.globalEvent);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setIsVisible(false);
    dispatch(setRoadmapVisible(false));
  };

  return (
    <section
      className={`py-24 ${roadmapVisible ? "" : " hidden"}`}
      style={{ height: "calc(100vh - 32vh)" }}
    >
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-xl sm:text-4xl font-semibold mb-10 text-gray-900">
          List your Property / Pg / Commercial Land/Plot Listing in simple 3
          steps
        </h2>
        <div className="flex gap-4 flex-col sm:flex-row">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div
                  className={`w-10 h-10 flex items-center justify-center ${step.color} rounded-full text-white`}
                >
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent className="text-left">
                <h3 className="text-base font-semibold text-gray-800">
                  <span className="text-brand">0{index + 1}.</span> {step.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* PropertySelector Dialog */}
        <Dialog>
          <DialogTrigger>
            <Button className="mt-10">Begin to Post your Property</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"font-semibold"}>
                Start posting your property
              </DialogTitle>
              <DialogDescription>Add Basic Details</DialogDescription>
            </DialogHeader>
            <div>
              <p className="mb-2 font-medium text-sm">You're looking to ..</p>
              {["Sell", "Rent / Lease", "Pg"].map((item, index) => (
                <Button
                  key={item}
                  variant="outline"
                  className={`rounded-full mx-1 font-thin ${
                    selectType.i === index
                      ? "border-black font-bold duration-200 transition-all"
                      : ""
                  }`}
                  onClick={() => setSelectType({ i: index, v: item })}
                  aria-label={`Select ${item}`}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div>
              <p className="mb-2 font-medium text-sm">And it's a..</p>
              <RadioGroup
                className="flex items-center gap-4 my-3"
                defaultValue="residential"
                onValueChange={(value) => setSelectRadio(value)}
                aria-label="Property Type"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="residential" id="residential" />
                  <Label htmlFor="residential">Residential</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="commercial" id="commercial" />
                  <Label htmlFor="commercial">Commercial</Label>
                </div>
              </RadioGroup>
              {/* Residential  */}
              {selectRadio === "residential" ? (
                <div>
                  {[
                    "Independent House / Villa",
                    "Plot / Land",
                    "Flat / Apartment",
                    "Property",
                  ].map((item, index) => (
                    <Button
                      key={item}
                      variant="outline"
                      className={`rounded-full mx-1 font-thin ${
                        selectTypeSub.i === index
                          ? "border-black font-bold duration-200 transition-all"
                          : ""
                      }`}
                      onClick={() => setSelectTypeSub({ i: index, v: item })}
                      aria-label={`Select ${item}`}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              ) : (
                <div>
                  {/* Commercial */}
                  {["Pg", "Commercial", "Plot", "Property"].map((item, index) => (
                    <Button
                      key={item}
                      variant="outline"
                      className={`rounded-full mx-1 font-thin ${
                        selectTypeSub.i === index
                          ? "border-black font-bold duration-200 transition-all"
                          : ""
                      }`}
                      onClick={() => setSelectTypeSub({ i: index, v: item })}
                      aria-label={`Select ${item}`}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose>
                <Button className="w-full" type="submit" onClick={handleSubmit}>
                  Start now
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Roadmap;
