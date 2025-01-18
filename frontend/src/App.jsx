import { Route, Routes } from "react-router-dom";
import Footer from "./components/ui/common/Footer";
import Navbar from "./components/ui/common/Navbar";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyListingPage from "./pages/PropertyListPage";
// import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./components/ui/common/NotFound";
import AboutPage from "./pages/AboutUsPage";
import AddProperty from "./pages/AddProperty";
import PropertyAnalyticsDashboard from "./pages/Agent/PropertyAnalyticsData";
import SubscriptionPlans from "./pages/Agent/SubscriptionPlans";
import AgentProfilePage from "./pages/AgentProfilePage";
import ComingSoon from "./pages/comingsoon";
import ContactPage from "./pages/ContactPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import Emicalculator from "./pages/Tools/EmiCalculator";
import RentAgreement from "./pages/Tools/RentAgreement";

const App = () => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* User and Agent Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/agent-profile" element={<AgentProfilePage />} />
          <Route
            path="/property/analytics/:id"
            element={<PropertyAnalyticsDashboard />}
          />

          {/* Tools Routes */}
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/emicalculator" element={<Emicalculator />} />
          <Route path="/rent-agreement" element={<RentAgreement />} />

          <Route path="/add" element={<AddProperty />} />
          <Route path="/property-listing" element={<PropertyListingPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />

          {/* Basic Site Pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          <Route path="*" element={<NotFound />} />

          {/* Facilites Routes */}
          <Route path="/facilities" element={<FacilitiesPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
