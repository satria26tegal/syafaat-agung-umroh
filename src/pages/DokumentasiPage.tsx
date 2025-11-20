import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useGallery } from "@/integrations/supabase/hooks/useGallery";

const DokumentasiPage = () => {
  const { data: gallery, isLoading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "2024", "2023", "Ka'bah", "Masjid Nabawi", "City Tour"];

  const filteredGallery = selectedCategory === "all"
    ? gallery
    : gallery?.filter(item => item.category?.toLowerCase().includes(selectedCategory.toLowerCase()));

  const photos = filteredGallery?.filter(item => item.type === "photo") || [];
  const videos = filteredGallery?.filter(item => item.type === "video") || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingWhatsApp />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-cairo font-bold text-gold mb-6">
            Dokumentasi Perjalanan
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            Lihat dokumentasi foto dan video perjalanan umroh kami
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-poppins transition-smooth ${
                  selectedCategory === category
                    ? "bg-gradient-gold text-white shadow-gold"
                    : "bg-white text-foreground hover:bg-gold/10 border border-gold/20"
                }`}
              >
                {category === "all" ? "Semua" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="photos" className="text-lg">
                Foto ({photos.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-lg">
                Video ({videos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Memuat foto...</p>
                </div>
              ) : photos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {photos.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-gold transition-smooth border-gold/20 group">
                      <div className="relative aspect-square">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
                          <div className="p-4 text-white w-full">
                            <h3 className="font-cairo font-bold text-gold">{item.title}</h3>
                            {item.description && (
                              <p className="text-sm text-gray-200 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Belum ada foto untuk kategori ini
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Memuat video...</p>
                </div>
              ) : videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-gold transition-smooth border-gold/20">
                      <div className="aspect-video">
                        <iframe
                          src={item.url}
                          title={item.title}
                          className="w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-cairo font-bold text-gold mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Belum ada video untuk kategori ini
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DokumentasiPage;