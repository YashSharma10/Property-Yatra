import Navbar from "./components/Navbar";
// import Searchbox from "./components/Searchbox";
// import HomePage from "./pages/HomePage";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AddPropertyPage from "./pages/AddPropertyPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyListingPage from "./pages/PropertyListingPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <div className=" bg-base-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/property-listing" element={<PropertyListingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

export default App;
