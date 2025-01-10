import { propertyTypeImg } from "@/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setFilters } from "@/redux/slices/globalEvent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropertyTypeSection = () => {
  const { filters, isVisible } = useSelector((store) => store.globalEvent);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePropertyTypeSearch = async (target) => {
    navigate("/property-listing");
    dispatch(setFilters({ type: target }));
  };

  return (
    <section className="width mt-[250px] sm:mt-[300px]">
      {/* Section Title */}
      <h1 className="heading">Apartments, Villas and more</h1>
      <h6 className="subHeading">in Delhi South West</h6>

      {/* Carousel */}
      <div className="mt-3">
        <Carousel>
          <div className="relative">
            <div className="absolute sm:top-32 top-20  z-10 left-14">
              <CarouselPrevious />
            </div>
            <div className="absolute sm:top-32 top-20 z-10 right-14">
              <CarouselNext />
            </div>
          </div>
          <CarouselContent>
            {propertyTypeImg.map((prop) => (
              <CarouselItem
                className="hover:scale-105 transition-all duration-300 cursor-pointer basis-1/3 sm:basis-1/4"
                key={prop.alt}
                onClick={() => handlePropertyTypeSearch(prop.alt)}
              >
                <div className="relative">
                  <img
                    src={prop.src}
                    alt={prop.alt}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-72 object-cover rounded-md"
                  />
                  <div className="absolute top-5 left-5 backdrop-blur-md bg-white/80 p-2 rounded-md">
                    <h2 className="text-sm sm:text-lg md:text-xl font-medium text-slate-700">
                      {prop.alt}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {Math.floor(Math.random() * 1000)}+ Properties
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default PropertyTypeSection;
