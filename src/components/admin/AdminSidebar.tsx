import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Package,
  Image,
  Building2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Settings, label: "Site Settings", path: "/admin/settings" },
    { icon: Package, label: "Paket Umroh", path: "/admin/packages" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
    { icon: Building2, label: "Company Profile", path: "/admin/company" },
    { icon: MessageSquare, label: "Pesan Masuk", path: "/admin/inquiries" },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success("Berhasil logout");
  };

  return (
    <div className="w-64 bg-dark-blue min-h-screen p-6 flex flex-col">
      <div className="flex items-center space-x-3 mb-8">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <div>
          <h1 className="text-gold font-cairo font-bold text-lg">Admin Panel</h1>
          <p className="text-gold/70 text-xs">Syafaat Agung</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive
                  ? "bg-gold text-dark-blue font-semibold"
                  : "text-white hover:bg-gold/10"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-gold text-gold hover:bg-gold hover:text-dark-blue"
      >
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default AdminSidebar;