import { setIsVisible } from "@/redux/slices/globalEvent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExclusiveSection from "./LandingPage/ExclusiveSection";
import HeaderSection from "./LandingPage/HeaderSection";
import NewLaunchPropertiesSection from "./LandingPage/NewLaunchPropertiesSection";
import PostPropertySection from "./LandingPage/PostPropertySection";
import PropertyTypeSection from "./LandingPage/PropertyTypeSection";
import StatisticsSection from "./LandingPage/StatisticsSection";
const LandingPage = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 300) {
  //       dispatch(setIsVisible(true));
  //     } else {
  //       dispatch(setIsVisible(false));
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <main className="width ">
      <HeaderSection />
      <PropertyTypeSection />
      <NewLaunchPropertiesSection />
      <ExclusiveSection />
      <PostPropertySection />
      <StatisticsSection />
    </main>
  );
};

export default LandingPage;
