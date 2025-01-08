import { BACKEND_URL } from "@/constants";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/auth/check`, {
          withCredentials: true,
        });
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/auth");
          toast.error("Session expired !");
        }
      }
    };
    authCheck();
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
