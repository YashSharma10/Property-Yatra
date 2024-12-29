import Navbar from "./components/Navbar";
// import Searchbox from "./components/Searchbox";
// import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PropertyListing from "./pages/PropertyListings";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ProfilePage from "./pages/ProfilePage";
// import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <div className=" bg-base-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/property-listing" element={<PropertyListingPage />} />
      </Routes>
      {/* <Footer /> */}
      {/* <PropertyListing /> */}
    </div>
  );
};

export default App;
