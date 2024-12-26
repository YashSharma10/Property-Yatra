import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/ui/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
