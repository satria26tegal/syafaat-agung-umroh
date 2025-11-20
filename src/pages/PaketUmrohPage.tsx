import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";
import { useUmrohPackages } from "@/integrations/supabase/hooks/useUmrohPackages";

const PaketUmrohPage = () => {
  const { data: settings } = useSiteSettings();
  const { data: packages, isLoading } = useUmrohPackages();

  const handleContactAdmin = () => {
    if (settings?.whatsapp_number) {
      window.open(`https://wa.me/${settings.whatsapp_number}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingWhatsApp />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-cairo font-bold text-gold mb-6">
            Paket Umroh
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            Pilih paket umroh yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center">
              <p className="text-muted-foreground">Memuat paket...</p>
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-gold transition-smooth border-gold/20">
                  {pkg.image_url ? (
                    <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image_url})` }}></div>
                  ) : (
                    <div className="h-56 bg-gradient-islamic"></div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-cairo font-bold text-gold mb-3">
                      {pkg.name}
                    </h3>
                    
                    {pkg.description && (
                      <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    )}

                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex justify-between border-b border-border pb-2">
                        <span className="font-semibold">Durasi:</span>
                        <span>{pkg.duration_days} Hari</span>
                      </div>
                      
                      {pkg.airline && (
                        <div className="flex justify-between border-b border-border pb-2">
                          <span className="font-semibold">Maskapai:</span>
                          <span>{pkg.airline}</span>
                        </div>
                      )}
                      
                      {pkg.hotel_makkah && (
                        <div className="flex justify-between border-b border-border pb-2">
                          <span className="font-semibold">Hotel Makkah:</span>
                          <span className="text-right">{pkg.hotel_makkah}</span>
                        </div>
                      )}
                      
                      {pkg.hotel_madinah && (
                        <div className="flex justify-between border-b border-border pb-2">
                          <span className="font-semibold">Hotel Madinah:</span>
                          <span className="text-right">{pkg.hotel_madinah}</span>
                        </div>
                      )}
                    </div>

                    {pkg.facilities && pkg.facilities.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-gold">Fasilitas:</h4>
                        <ul className="text-sm space-y-1">
                          {pkg.facilities.slice(0, 5).map((facility, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-gold mr-2">✓</span>
                              <span>{facility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.price && (
                      <div className="mb-6">
                        <div className="bg-gold/10 rounded-lg p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Mulai dari</p>
                          <p className="text-3xl font-bold text-gold">
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleContactAdmin}
                      className="w-full bg-gradient-gold hover:opacity-90 transition-smooth"
                    >
                      <Phone className="mr-2" size={18} />
                      Hubungi Admin
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Belum ada paket tersedia saat ini. Silakan hubungi admin untuk informasi lebih lanjut.
              </p>
              <Button
                onClick={handleContactAdmin}
                className="mt-6 bg-gradient-gold hover:opacity-90"
              >
                <Phone className="mr-2" size={18} />
                Hubungi Admin
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaketUmrohPage;