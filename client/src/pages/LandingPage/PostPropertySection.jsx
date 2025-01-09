import { Button } from "@/components/ui/button";
import helping from "../../assets/helping.jpg";
import { useNavigate } from "react-router-dom";

const PostPropertySection = () => {
  const navigate = useNavigate();

  return (
    <div className="width bg-white rounded-lg my-5 flex flex-col-reverse sm:flex-row items-center justify-around gap-6">
      {/* Text Content */}
      <div className="text-center sm:text-left">
        <p className="text-gray-600 font-bold uppercase tracking-wide">
          Sell or Rent Your Property
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug mt-3">
          Register to post your property for
          <span className="bg-green-500 ml-2 px-2 py-1 rounded-md text-white text-sm">
            Free
          </span>
        </h1>
        <h4 className="text-gray-500 mt-3">
          Post your residential or commercial property
        </h4>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <div className="text-xl sm:text-2xl font-bold">10L+</div>
            <div className="text-sm text-gray-600">Property Listings</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">45L+</div>
            <div className="text-sm text-gray-600">Monthly Searches</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">2L+</div>
            <div className="text-sm text-gray-600">Owners Advertise</div>
          </div>
        </div>

        {/* Call to Action */}
        <Button
          className="mt-6 bg-brand text-white font-medium py-2 px-4 rounded-md"
          onClick={() => navigate("/add")}
        >
          Post Your Property for Free
        </Button>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={helping}
          alt="Helping"
          className="w-full max-w-sm rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default PostPropertySection;
