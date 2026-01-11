import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Audit from "./pages/Audit";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReportsProvider } from "./context/ReportsContext";
import { authApi } from "./services/api";

function AppContent() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 overflow-x-hidden flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={logout} />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/dashboard" element={<Navigate to="/audit" replace />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// OAuth Callback Handler
function OAuthCallback() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      navigate('/login?error=oauth_failed');
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      // Fetch user data
      authApi.getCurrentUser().then((userData) => {
        updateUser(userData);
        // Users start with free plan, go directly to audit
        navigate('/audit');
      }).catch(() => {
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4" size={48} />
        <p className="text-slate-600">Completing sign in...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ReportsProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ReportsProvider>
    </AuthProvider>
  );
}

export default App;
