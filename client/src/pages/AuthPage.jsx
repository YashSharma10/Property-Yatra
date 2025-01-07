import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/auth";
import { BACKEND_URL } from "@/constants";

const AuthPage = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));

    const endpoint = isSignup
      ? `${BACKEND_URL}/api/signup`
      : `${BACKEND_URL}/api/login`;
    const payload = isSignup
      ? {
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          number: userDetails.number,
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
        console.log(response.data.newUser);

        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <Card className="shadow-lg ">
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
                  <Label htmlFor="email">Phone</Label>
                  <Input
                    id="number"
                    type="number"
                    value={userDetails.number}
                    onChange={handleFormData}
                    placeholder="798765XXXXX"
                    required
                  />
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
            <Button className="w-full mt-5">
              <img
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt="Google logo"
                className="w-6 h-6"
              />
              <span className="text-xs">Login with Google</span>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
