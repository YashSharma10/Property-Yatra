import { Route, Routes } from "react-router-dom";
import Footer from "./components/ui/common/Footer";
import Navbar from "./components/ui/common/Navbar";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PropertyListingPage from "./pages/PropertyListPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyListing from "./pages/PropertyListing";

const App = () => {
  return (
    <div className="bg-muted/10">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/property-listing" element={<PropertyListingPage />} />
        <Route path="/property-listing2" element={<PropertyListing />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
