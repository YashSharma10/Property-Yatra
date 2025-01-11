import React from "react";
import { motion } from "framer-motion";
import CategorySection from "../components/ui/CategorySectionFacility";

const FacilityPage = () => {
  return (
    <div className="bg-black">
      {/* Main Heading Section */}
      <div className="h-[30rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
        <h1 className="md:text-5xl text-2xl lg:text-7xl font-bold text-center text-white relative z-20">
          Choose a Category
        </h1>
        <div className="w-[35rem] h-32 relative">
          {/* Gradients */}
          <div className="absolute inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-48 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[4px] w-1/4 blur-sm" />
          <div className="absolute inset-x-48 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      {/* Category Section */}
      <div className="bg-black flex justify-center gap-4 p-3 flex-wrap">
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=aEkEE8aNMUvT&format=png&color=000000"
          }
          categoryTitle={"'Plumbing'"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=7188&format=png&color=000000"
          }
          categoryTitle={"Cleaning"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=EvmKTdQmsDL5&format=png&color=000000"
          }
          categoryTitle={"Electrical"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=jZyBAWVmVUrT&format=png&color=000000"
          }
          categoryTitle={"Security"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=fPdH9eGtDqfH&format=png&color=000000"
          }
          categoryTitle={"Pest Control"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=rVFkCOkaCd03&format=png&color=000000"
          }
          categoryTitle={"Gardening"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=YdgP5OnDHAX6&format=png&color=000000"
          }
          categoryTitle={"HVAC"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=9zoe75ZxjBmG&format=png&color=000000"
          }
          categoryTitle={"Painting"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=tWBwNAhLUrtj&format=png&color=000000"
          }
          categoryTitle={"Carpentry"}
        />
        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=gE7mqr5m453P&format=png&color=000000"
          }
          categoryTitle={"Parking"}
        />

        <CategorySection
          imgUrl={
            "https://img.icons8.com/?size=100&id=33951&format=png&color=000000"
          }
          categoryTitle={"Other"}
        />
      </div>
    </div>
  );
};

export default FacilityPage;
