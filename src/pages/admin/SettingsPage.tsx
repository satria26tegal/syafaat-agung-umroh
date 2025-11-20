import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useSiteSettings();
  const [formData, setFormData] = useState<any>({});

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("site_settings")
        .update(data)
        .eq("id", settings?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Settings berhasil diupdate!");
    },
    onError: () => {
      toast.error("Gagal mengupdate settings");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  const currentData = { ...settings, ...formData };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Kelola informasi umum website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <Input
                value={currentData.hero_title || ""}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <Textarea
                value={currentData.hero_subtitle || ""}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Kontak</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
              <Input
                value={currentData.whatsapp_number || ""}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                placeholder="62895341574293"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={currentData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alamat</label>
              <Textarea
                value={currentData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jam Operasional</label>
              <Input
                value={currentData.office_hours || ""}
                onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps Embed URL</label>
              <Input
                value={currentData.google_maps_embed || ""}
                onChange={(e) => setFormData({ ...formData, google_maps_embed: e.target.value })}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <Input
                value={currentData.instagram_url || ""}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Facebook URL</label>
              <Input
                value={currentData.facebook_url || ""}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">TikTok URL</label>
              <Input
                value={currentData.tiktok_url || ""}
                onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-gradient-gold hover:opacity-90"
        >
          {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </AdminLayout>
  );
};

export default SettingsPage;