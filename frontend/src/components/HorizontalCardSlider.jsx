import React, { useRef } from "react";
import { propertyList } from "../constants/property";
function HorizontalCardSlider() {
  const scrollContainerRef = useRef(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 260, // Scroll distance (you can adjust as needed)
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -260, // Scroll distance
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  return (
    <div className="relative w-full ">
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
      >
        &#10094;
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide"
      >
        {propertyList.map((item) => (
          <div
            key={item}
            className="w-90 h-80 text-white rounded-lg shadow-lg flex-shrink-0"
            style={{backgroundImage: `url(${item.imgurl})`, backgroundSize: "cover"}}
          >
            <div className="text-slate-700 p-6  ">
              <span className="text-3xl font-bold">{item.name}</span>
              <p>{item.number} properties</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
      >
        &#10095;
      </button>
    </div>
  );
}

export default HorizontalCardSlider;
