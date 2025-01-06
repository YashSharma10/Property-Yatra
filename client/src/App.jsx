import { Route, Routes } from "react-router-dom";
import Footer from "./components/ui/common/Footer";
import Navbar from "./components/ui/common/Navbar";
import AddPropertyPage from "./pages/AddPropertyPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyListingPage from "./pages/PropertyListPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddProperty from "./pages/AddProperty";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutUsPage";

const App = () => {
  return (
    <div className="bg-muted/10 relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/add" element={<AddProperty />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/property-listing" element={<PropertyListingPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
