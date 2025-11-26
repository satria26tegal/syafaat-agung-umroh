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
                <Card key={pkg.id} className="relative overflow-hidden hover:shadow-gold transition-smooth border-2 border-gold/30 bg-gradient-to-br from-[#0A3D2E] to-[#0A1A2F]">
                  {/* Decorative Islamic corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/50"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/50"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/50"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/50"></div>
                  
                  <div className="p-8 text-white relative z-10">
                    {/* Company Logo/Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-gold flex items-center justify-center bg-gradient-to-br from-gold/20 to-transparent">
                        <span className="text-4xl text-gold font-cairo font-bold">SA</span>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="text-center mb-4">
                      <h2 className="text-3xl font-cairo font-bold text-white mb-2">SYAFAAT AGUNG</h2>
                      <p className="text-gold text-lg">Tour and Travel Umroh</p>
                    </div>

                    {/* Tagline */}
                    {pkg.tagline && (
                      <p className="text-center text-gold/90 italic text-sm mb-6">"{pkg.tagline}"</p>
                    )}

                    {/* Package Name */}
                    <h3 className="text-2xl font-cairo font-bold text-white text-center mb-2">
                      {pkg.name} {pkg.season_type && `(${pkg.season_type})`}
                    </h3>

                    {/* Departure Month */}
                    {pkg.departure_month && (
                      <p className="text-gold text-center text-lg mb-6">
                        Keberangkatan {pkg.departure_month}
                      </p>
                    )}

                    {/* Pricing Section */}
                    {(pkg.price_quads || pkg.price_triple || pkg.price_double) && (
                      <div className="mb-6 border-t border-b border-gold/30 py-4">
                        <p className="text-gold font-semibold text-lg mb-3">Biaya:</p>
                        <div className="space-y-2">
                          {pkg.price_quads && (
                            <div className="flex justify-between">
                              <span className="text-gold">Rp {pkg.price_quads.toLocaleString('id-ID')}</span>
                              <span className="text-white">/ Quads</span>
                            </div>
                          )}
                          {pkg.price_triple && (
                            <div className="flex justify-between">
                              <span className="text-gold">Rp {pkg.price_triple.toLocaleString('id-ID')}</span>
                              <span className="text-white">/ Triple</span>
                            </div>
                          )}
                          {pkg.price_double && (
                            <div className="flex justify-between">
                              <span className="text-gold">Rp {pkg.price_double.toLocaleString('id-ID')}</span>
                              <span className="text-white">/ Double</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Two Column Layout for Included/Not Included */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      {/* Sudah Termasuk */}
                      <div>
                        <h4 className="font-semibold text-gold mb-2">Sudah Termasuk:</h4>
                        {pkg.included_items && pkg.included_items.length > 0 ? (
                          <ul className="space-y-1">
                            {pkg.included_items.map((item, index) => (
                              <li key={index} className="flex items-start text-xs">
                                <span className="mr-1">{index + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground text-xs">-</p>
                        )}
                      </div>

                      {/* Belum Termasuk */}
                      <div>
                        <h4 className="font-semibold text-gold mb-2">Belum Termasuk:</h4>
                        {pkg.not_included_items && pkg.not_included_items.length > 0 ? (
                          <ul className="space-y-1">
                            {pkg.not_included_items.map((item, index) => (
                              <li key={index} className="flex items-start text-xs">
                                <span className="mr-1">{index + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground text-xs">-</p>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t border-gold/30 pt-4">
                      <h4 className="font-semibold text-gold mb-2 text-center">Kontak & Alamat:</h4>
                      {settings?.whatsapp_number && (
                        <p className="text-sm text-center mb-1">📞 {settings.whatsapp_number}</p>
                      )}
                      {settings?.address && (
                        <p className="text-xs text-center text-gray-300">{settings.address}</p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={handleContactAdmin}
                      className="w-full mt-6 bg-gradient-gold hover:opacity-90 transition-smooth font-semibold"
                    >
                      <Phone className="mr-2" size={18} />
                      Segera Daftar, Tempat Terbatas!
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