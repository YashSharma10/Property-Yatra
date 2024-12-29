import { jwtDecode } from "jwt-decode";
const checkAuthentication = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if the token is expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      console.log("Token has expired");
      return { isAuthenticated: false, user: null };
    }

    return { isAuthenticated: true, user: decodedToken };
  } catch (error) {
    console.error("Invalid token", error);
    return { isAuthenticated: false, user: null };
  }
};

export const authStatus = checkAuthentication();
