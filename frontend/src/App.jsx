import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
