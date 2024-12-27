import React from "react";
import Navbar from "./components/Navbar";
import Searchbox from "./components/Searchbox";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className=" bg-base-100 min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
