import { propertyTypeImg } from "@/assets";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
const PropertyTypeSection = () => {
  return (
    <section className="py-4">
      <h1 className="px-3 text-2xl font-semibold">
        Apartments, Villas and more
      </h1>
      <h6 className="px-3 text-sm text-slate-600">in Delhi South West</h6>
      <div className="flex mt-3">
      <Carousel className="max-w-7xl mx-auto">
        <CarouselContent>
          {propertyTypeImg.map((prop) => (
            <CarouselItem className={"basis-1/4 "}>
              <div className="relative">
                <img
                  src={prop.src}
                  alt={prop.alt}
                  className="w-[450px] h-[300px] object-cover rounded-md"
                />
                <div className="absolute top-5 backdrop-blur-md p-1 rounded-md">
                  <h2 className="text-3xl  text-slate-700 w-full">
                    {prop.alt}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {Math.floor(Math.random() * 1000)}+ Properties
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </section>
  );
};

export default PropertyTypeSection;
