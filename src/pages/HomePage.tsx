import { ArrowRight, Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";
import { useUmrohPackages } from "@/integrations/supabase/hooks/useUmrohPackages";
import heroImage from "@/assets/hero-masjid-nabawi.jpg";

const HomePage = () => {
  const { data: settings } = useSiteSettings();
  const { data: packages } = useUmrohPackages();

  const featuredPackages = packages?.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/80 via-dark-blue/70 to-dark-blue/90"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-cairo font-bold text-gold mb-6 drop-shadow-lg">
              {settings?.hero_title || "Teman Perjalanan Menuju Tanah Suci"}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-poppins">
              {settings?.hero_subtitle || "Travel Umroh Terpercaya dengan Pelayanan Profesional dan Amanah"}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/paket-umroh">
                <Button size="lg" className="bg-gradient-gold hover:opacity-90 transition-smooth text-lg px-8 py-6">
                  Lihat Paket Umroh
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/dokumentasi">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark-blue transition-smooth text-lg px-8 py-6">
                  Dokumentasi Perjalanan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* CTA Shortcuts */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a
              href={`https://wa.me/${settings?.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-8 text-center hover:shadow-gold transition-smooth cursor-pointer border-gold/20 hover:border-gold">
                <div className="bg-[#25D366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <Phone className="text-[#25D366]" size={32} />
                </div>
                <h3 className="font-cairo font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Hubungi Admin</p>
              </Card>
            </a>

            {settings?.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="p-8 text-center hover:shadow-gold transition-smooth cursor-pointer border-gold/20 hover:border-gold">
                  <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <Instagram className="text-pink-500" size={32} />
                  </div>
                  <h3 className="font-cairo font-bold text-lg mb-2">Instagram</h3>
                  <p className="text-sm text-muted-foreground">Follow Us</p>
                </Card>
              </a>
            )}

            {settings?.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="p-8 text-center hover:shadow-gold transition-smooth cursor-pointer border-gold/20 hover:border-gold">
                  <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <Facebook className="text-blue-600" size={32} />
                  </div>
                  <h3 className="font-cairo font-bold text-lg mb-2">Facebook</h3>
                  <p className="text-sm text-muted-foreground">Like Page</p>
                </Card>
              </a>
            )}

            <Link to="/kontak" className="group">
              <Card className="p-8 text-center hover:shadow-gold transition-smooth cursor-pointer border-gold/20 hover:border-gold">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <MapPin className="text-gold" size={32} />
                </div>
                <h3 className="font-cairo font-bold text-lg mb-2">Lokasi Kantor</h3>
                <p className="text-sm text-muted-foreground">Kunjungi Kami</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      {featuredPackages && featuredPackages.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cairo font-bold text-gradient mb-4">
                Paket Umroh Pilihan
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pilih paket umroh yang sesuai dengan kebutuhan dan budget Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-gold transition-smooth border-gold/20">
                  {pkg.image_url && (
                    <div className="h-48 bg-gradient-islamic"></div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-cairo font-bold text-gold mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <p><strong>Durasi:</strong> {pkg.duration_days} Hari</p>
                      {pkg.airline && <p><strong>Maskapai:</strong> {pkg.airline}</p>}
                      {pkg.price && (
                        <p className="text-2xl font-bold text-gold">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                    <Link to="/paket-umroh">
                      <Button className="w-full bg-gradient-gold hover:opacity-90">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/paket-umroh">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark-blue">
                  Lihat Semua Paket
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-dark-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cairo font-bold text-gold mb-4">
              Mengapa Memilih Kami?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Legal & Berizin Resmi",
                description: "Terdaftar dan berizin resmi dari pemerintah",
              },
              {
                title: "Pembimbing Berpengalaman",
                description: "Didampingi ustadz dan pembimbing berpengalaman",
              },
              {
                title: "Hotel Strategis",
                description: "Hotel dekat Masjidil Haram & Nabawi",
              },
              {
                title: "Jadwal Fleksibel",
                description: "Berbagai pilihan jadwal keberangkatan",
              },
              {
                title: "Layanan Amanah",
                description: "Pelayanan ramah dan penuh amanah",
              },
              {
                title: "Dokumentasi Lengkap",
                description: "Dokumentasi foto dan video perjalanan",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl font-bold text-gold">{index + 1}</div>
                </div>
                <h3 className="text-xl font-cairo font-bold text-gold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;