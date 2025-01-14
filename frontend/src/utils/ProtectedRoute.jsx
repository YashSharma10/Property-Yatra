import { BACKEND_URL } from "@/constants";
import { setUser } from "@/redux/slices/auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const data = await axios.post(
          `${BACKEND_URL}/api/auth/check`,
          {token}
        );
        dispatch(setUser(data.data));
        console.log("Data", data.data);
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
