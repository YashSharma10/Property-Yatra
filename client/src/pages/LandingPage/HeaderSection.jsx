import React from "react";
import header from "../../assets/header.png";
import sky from "../../assets/sky.jpg";
import { useSelector } from "react-redux";

const HeaderSection = () => {
  const { isVisible } = useSelector((store) => store.globalEvent);

  return (
    <section
      className={`fixed top-0 right-0 left-0 z-[-100] transition-opacity duration-500 ${
        !isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img src={sky} alt="header" className="w-full max-h-96" />
    </section>
  );
};

export default HeaderSection;
