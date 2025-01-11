import { Route, Routes } from "react-router-dom";
import Footer from "./components/ui/common/Footer";
import Navbar from "./components/ui/common/Navbar";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyListingPage from "./pages/PropertyListPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddProperty from "./pages/AddProperty";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutUsPage";
import NotFound from "./components/ui/common/NotFound";
import Dashboard from "./pages/Agent/Dashboard";
import FacilitiesPage from "./pages/FacilitiesPage";
import AgentProfilePage from "./pages/AgentProfilePage";
import SubscriptionPlans from "./pages/Agent/SubscriptionPlans";
import PropertyAnalyticsDashboard from "./pages/Agent/PropertyAnalyticsData";
import FacilityPage from "./pages/FacilityManagement";

const App = () => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
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
          <Route
            path="/agent-profile"
            element={
              <ProtectedRoute>
                <AgentProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route path="/property-listing" element={<PropertyListingPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/property/analytics/:id" element={<PropertyAnalyticsDashboard />} />
          <Route path="/facilitymanage" element={<FacilityPage/>} />
          <Route
            path="/facilities
          "
            element={<FacilitiesPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
