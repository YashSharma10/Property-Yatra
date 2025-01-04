import { setIsVisible } from "@/redux/slices/globalEvent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExclusiveSection from "./LandingPage/ExclusiveSection";
import HeaderSection from "./LandingPage/HeaderSection";
import NewLaunchPropertiesSection from "./LandingPage/NewLaunchPropertiesSection";
import PropertyTypeSection from "./LandingPage/PropertyTypeSection";
import SearchBoxSection from "./LandingPage/SearchBoxSection";
import StatisticsSection from "./LandingPage/StatisticsSection";
import PostPropertySection from "./LandingPage/PostPropertySection";
const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll Y Position:", window.scrollY);
      if (window.scrollY > 360) {
        dispatch(setIsVisible(true));
      } else {
        dispatch(setIsVisible(false));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto scroll-smooth ">
      <HeaderSection />
      <SearchBoxSection />
      <PropertyTypeSection />
      <NewLaunchPropertiesSection />
      <ExclusiveSection />
      <PostPropertySection />
      <StatisticsSection />
    </main>
  );
};

export default LandingPage;
