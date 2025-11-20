import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const quickLinks = [
    { name: "Beranda", path: "/" },
    { name: "Paket Umroh", path: "/paket-umroh" },
    { name: "Dokumentasi", path: "/dokumentasi" },
    { name: "Profil Perusahaan", path: "/profil" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <footer className="bg-dark-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Syafaat Agung Logo" className="h-12 w-12" />
              <div>
                <h3 className="text-gold font-cairo font-bold text-lg">SYAFAAT AGUNG</h3>
                <p className="text-gold/70 text-xs">Tour & Travel Umroh</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Travel umroh terpercaya dengan pelayanan profesional dan amanah
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-cairo font-bold mb-4">Menu Cepat</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-gold transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-cairo font-bold mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span>{settings?.address || "Loading..."}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone size={16} className="text-gold" />
                <span>+{settings?.whatsapp_number || "Loading..."}</span>
              </li>
              {settings?.email && (
                <li className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail size={16} className="text-gold" />
                  <span>{settings.email}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gold font-cairo font-bold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition-smooth"
                >
                  <Instagram size={20} className="text-gold" />
                </a>
              )}
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition-smooth"
                >
                  <Facebook size={20} className="text-gold" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/20 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Syafaat Agung Tour & Travel Umroh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;