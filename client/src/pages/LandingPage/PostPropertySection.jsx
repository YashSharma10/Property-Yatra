import { Button } from "@/components/ui/button";
import helping from "../../assets/helping.jpg";
const PostPropertySection = () => {
  return (
    <div className="bg-white py-3 shadow-md px-5 flex gap-4 justify-between rounded-md my-7 flex-col-reverse sm:flex-row">
      <div>
        <p className="text-slate-600 font-bold">SELL OR RENT YOUR PROPERTY</p>
        <h1 className="text-3xl font-extrabold w-72 py-3 leading-normal">
          Register to post your property for
          <span className="bg-green-400 ml-2 px-1 rounded-md text-white text-sm">
            Free
          </span>
        </h1>
        <h4 className="pb-4">Post your residential / commercial property</h4>
        <div className="grid grid-cols-3">
          <div>
            <div className="text-2xl font-bold">10L+</div>
            <div className="text-sm text-slate-600 font-thin">
              Property Listings
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">45L+</div>
            <div className="text-sm text-slate-600 font-thin">
              Monthly Searches
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">2L+</div>
            <div className="text-sm text-slate-600 font-thin">
              Owners advertise
            </div>
          </div>
        </div>
        <Button className="my-5 ">Post your property for Free</Button>
      </div>
      <div>
        <img src={helping} alt="helping" className="max-w-md"/>
      </div>
    </div>
  );
};

export default PostPropertySection;
