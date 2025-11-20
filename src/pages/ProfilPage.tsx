import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useCompanyProfile } from "@/integrations/supabase/hooks/useCompanyProfile";

const ProfilPage = () => {
  const { data: profile, isLoading } = useCompanyProfile();

  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingWhatsApp />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-cairo font-bold text-gold mb-6">
            {profile?.name || "Syafaat Agung Tour and Travel Umroh"}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            Travel Umroh Terpercaya dengan Pelayanan Profesional
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="text-center">
              <p className="text-muted-foreground">Memuat profil...</p>
            </div>
          ) : (
            <>
              <Card className="p-8 mb-12 border-gold/20">
                <h2 className="text-3xl font-cairo font-bold text-gold mb-6 text-center">
                  Tentang Kami
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  {profile?.description || "Travel umroh terpercaya dengan pelayanan profesional, bimbingan ibadah, fasilitas nyaman, serta pendampingan ustadz berpengalaman."}
                </p>
              </Card>

              {/* Vision & Mission */}
              {(profile?.vision || profile?.mission) && (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {profile.vision && (
                    <Card className="p-8 border-gold/20">
                      <h3 className="text-2xl font-cairo font-bold text-gold mb-4 text-center">
                        Visi
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.vision}
                      </p>
                    </Card>
                  )}
                  {profile.mission && (
                    <Card className="p-8 border-gold/20">
                      <h3 className="text-2xl font-cairo font-bold text-gold mb-4 text-center">
                        Misi
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.mission}
                      </p>
                    </Card>
                  )}
                </div>
              )}

              {/* Values/Keunggulan */}
              {profile?.values && profile.values.length > 0 && (
                <Card className="p-8 border-gold/20">
                  <h2 className="text-3xl font-cairo font-bold text-gold mb-8 text-center">
                    Keunggulan Kami
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {profile.values.map((value, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-gold flex-shrink-0 mt-1" size={24} />
                        <p className="text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dark-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-cairo font-bold text-gold mb-12 text-center">
            Komitmen Kami
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gold">🕌</span>
              </div>
              <h3 className="text-xl font-cairo font-bold text-gold mb-3">
                Pengalaman Spiritual
              </h3>
              <p className="text-gray-300">
                Memberikan pengalaman ibadah yang khusyuk dengan bimbingan spiritual yang mendalam
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gold">🤝</span>
              </div>
              <h3 className="text-xl font-cairo font-bold text-gold mb-3">
                Pelayanan Terbaik
              </h3>
              <p className="text-gray-300">
                Mengutamakan kenyamanan dan kepuasan jamaah dengan pelayanan prima
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gold">💎</span>
              </div>
              <h3 className="text-xl font-cairo font-bold text-gold mb-3">
                Amanah & Terpercaya
              </h3>
              <p className="text-gray-300">
                Menjalankan bisnis dengan penuh amanah dan transparansi kepada semua jamaah
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfilPage;