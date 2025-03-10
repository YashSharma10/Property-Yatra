import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken, setUser } from "@/redux/slices/auth";
import { BACKEND_URL } from "@/constants";

const AuthPage = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    role: "user", // Default role
  });

  const handleFormData = (data) => {
    setUserDetails((prevData) => ({
      ...prevData,
      [data.target.id]: data.target.value,
    }));
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setUserDetails({
      name: "",
      email: "",
      number: "",
      password: "",
      role: "user",
    });
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|ncuindia\.edu|icloud\.com)$/;
    return emailRegex.test(email);
  };
  const validNumber = (number) => {
    const numberRegix = /^(?:\+91|91)?[789]\d{9}$/;
    return numberRegix.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(userDetails.email) && !validNumber(userDetails.number)) {
      setError("Please enter a valid email/Phone Number address.");
    } else {
      setError("");
      // dispatch(setLoading(true));

      const endpoint = isSignup
        ? `${BACKEND_URL}/api/signup`
        : `${BACKEND_URL}/api/login`;
      const payload = isSignup
        ? {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            number: userDetails.number,
            role: userDetails.role, // Include role in signup
          }
        : {
            email: userDetails.email,
            password: userDetails.password,
          };

      try {
        const response = await axios.post(endpoint, payload, {
          withCredentials: true,
        });
        dispatch(setLoading(false));
        if (response.data) {
          dispatch(setUser(response.data.newUser));
          dispatch(setToken(response.data.token));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.newUser));
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (err) {
        dispatch(setLoading(false));
        setError(err.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <div className="width">
      <Card className="shadow-lg max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {isSignup ? "Sign Up" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={userDetails.name}
                    onChange={handleFormData}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number">Phone</Label>
                  <Input
                    id="number"
                    type="text"
                    value={userDetails.number}
                    onChange={handleFormData}
                    placeholder="798765XXXXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={userDetails.role}
                    onChange={handleFormData}
                    className="w-full p-2 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userDetails.email}
                onChange={handleFormData}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userDetails.password}
                onChange={handleFormData}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? `${isSignup ? "Signing Up..." : "Logging In..."}`
                : `${isSignup ? "Sign Up" : "Login"}`}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </CardContent>
        <CardFooter>
          {/* <Button className="w-full mt-5" >
            <img
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google logo"
              className="w-6 h-6"
            />
            <span className="text-xs">Login with Google</span>
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
