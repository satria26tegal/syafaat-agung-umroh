import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PaketUmrohPage from "./pages/PaketUmrohPage";
import DokumentasiPage from "./pages/DokumentasiPage";
import ProfilPage from "./pages/ProfilPage";
import KontakPage from "./pages/KontakPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
