import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  text-center h-full px-4 my-20">
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="mt-6">
        <Button onClick={() => navigate("/")} variant="destructive">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
