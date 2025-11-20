import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PaketUmrohPage from "./pages/PaketUmrohPage";
import DokumentasiPage from "./pages/DokumentasiPage";
import ProfilPage from "./pages/ProfilPage";
import KontakPage from "./pages/KontakPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import SettingsPage from "./pages/admin/SettingsPage";
import PackagesPage from "./pages/admin/PackagesPage";
import GalleryPage from "./pages/admin/GalleryPage";
import CompanyPage from "./pages/admin/CompanyPage";
import InquiriesPage from "./pages/admin/InquiriesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/paket-umroh" element={<PaketUmrohPage />} />
            <Route path="/dokumentasi" element={<DokumentasiPage />} />
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/kontak" element={<KontakPage />} />
            
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/admin/packages" element={<ProtectedRoute><PackagesPage /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
            <Route path="/admin/company" element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute><InquiriesPage /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
