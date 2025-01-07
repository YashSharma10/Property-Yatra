import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/auth";
import { BACKEND_URL } from "@/constants";

const AuthPage = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setRole("user"); // Reset role to 'user' when toggling mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));

    const endpoint = isSignup
      ? `${BACKEND_URL}/api/signup`
      : `${BACKEND_URL}/api/login`;
    const payload = isSignup
      ? { name, email, password, role }
      : { email, password };

    try {
      const response = await axios.post(endpoint, payload, { withCredentials: true });
      dispatch(setLoading(false));
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        dispatch(setUser(response.data.token));
        toast.success(response.data.message);
        navigate("/"); // Redirect to homepage after successful login/signup
      }
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
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
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {isSignup && (
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            )}
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
      </Card>
    </div>
  );
};

export default AuthPage;
