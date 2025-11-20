import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";

const KontakPage = () => {
  const { data: settings } = useSiteSettings();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("contact_inquiries").insert([formData]);
    
    if (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } else {
      toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingWhatsApp />

      <section className="pt-32 pb-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-cairo font-bold text-gold mb-6">Hubungi Kami</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 border-gold/20">
              <h2 className="text-3xl font-cairo font-bold text-gold mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Alamat</h3>
                    <p className="text-muted-foreground">{settings?.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-gold flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Telepon / WhatsApp</h3>
                    <p className="text-muted-foreground">+{settings?.whatsapp_number}</p>
                  </div>
                </div>
                {settings?.email && (
                  <div className="flex items-start space-x-4">
                    <Mail className="text-gold flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">{settings.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <Clock className="text-gold flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Jam Operasional</h3>
                    <p className="text-muted-foreground">{settings?.office_hours}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-gold/20">
              <h2 className="text-3xl font-cairo font-bold text-gold mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Nama Lengkap" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input placeholder="No. Telepon" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <Textarea placeholder="Pesan Anda" rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-gold">{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KontakPage;