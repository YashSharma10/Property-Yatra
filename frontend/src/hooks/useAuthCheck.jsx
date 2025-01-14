import { BACKEND_URL } from "@/constants";
import { setUser } from "@/redux/slices/auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        // if (!token) {
        //   throw new Error("No token found");
        // }
        console.log("Token", token);

        const { data } = await axios.get(`${BACKEND_URL}/api/auth/check`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(data));
        console.log("Data", data);
      } catch (error) {
        if (
          error.response?.status === 401 ||
          error.message === "No token found"
        ) {
          navigate("/auth");
          toast.error("Session expired!");
        } else {
          console.error("Auth check failed:", error);
        }
      }
    };

    authCheck();
  }, []);
};

export default useAuthCheck;
