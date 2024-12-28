// import React from "react";
// import Navbar from "./components/Navbar";
// import Searchbox from "./components/Searchbox";
// import HomePage from "./pages/HomePage";
// import Footer from "./components/Footer";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropertyListing from "./pages/PropertyListings";
// import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <div className=" bg-base-100 min-h-screen">
      {/* <Navbar />
      <HomePage />
      <Footer /> */}
      <PropertyListing />
    </div>
  );
};

export default App;
