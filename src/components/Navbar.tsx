import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Paket Umroh", path: "/paket-umroh" },
    { name: "Dokumentasi", path: "/dokumentasi" },
    { name: "Profil Perusahaan", path: "/profil" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-blue/95 backdrop-blur-md shadow-elegant border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Syafaat Agung Logo" className="h-12 w-12" />
            <div className="hidden sm:block">
              <h1 className="text-gold font-cairo font-bold text-xl">SYAFAAT AGUNG</h1>
              <p className="text-gold/70 text-xs">Tour & Travel Umroh</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white hover:text-gold transition-smooth font-poppins text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default" className="bg-gradient-gold hover:opacity-90 transition-smooth">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gold p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gold transition-smooth font-poppins py-2 px-4"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="default" className="bg-gradient-gold w-full">
                Hubungi Kami
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;