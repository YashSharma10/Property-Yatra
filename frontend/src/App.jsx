import Navbar from "./components/Navbar";
// import Searchbox from "./components/Searchbox";
// import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PropertyListing from "./pages/PropertyListings";
import HomePage from "./pages/HomePage";
// import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <div className=" bg-base-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
      {/* <PropertyListing /> */}
    </div>
  );
};

export default App;
