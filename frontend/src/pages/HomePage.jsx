import React from "react";
import HorizontalCardSlider from "../components/HorizontalCardSlider";
import Searchbox from "../components/Searchbox";
const HomePage = () => {
  return (
    <div className="min-h-full">
      <Searchbox />
      <hr />
      <section className=" w-screen p-3">
        <h1 className="font-bold text-xl p-1">Apartments, Villas and more</h1>
        <h6 className="p-1 pb-4">in Delhi South West</h6>
      <HorizontalCardSlider/>
      </section>
      <section className=" w-screen p-3">
        <h1 className="font-bold text-xl p-1">Handpicked Projects</h1>
        <h6 className="p-1 pb-4">in Delhi South West</h6>
      <HorizontalCardSlider/>
      </section>
    </div>
  );
};

export default HomePage;
