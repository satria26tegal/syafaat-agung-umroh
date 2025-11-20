import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const CompanyPage = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["admin-company-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_profile")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const [formData, setFormData] = useState<any>({});

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        values: data.values ? data.values.split('\n').filter(Boolean) : [],
      };

      const { error } = await supabase
        .from("company_profile")
        .update(payload)
        .eq("id", profile?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-company-profile"] });
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast.success("Profil perusahaan berhasil diupdate!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  const currentData = { ...profile, ...formData };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Company Profile</h1>
        <p className="text-muted-foreground">Kelola profil perusahaan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Informasi Dasar</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Perusahaan</label>
              <Input
                value={currentData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <Textarea
                value={currentData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Visi & Misi</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Visi</label>
              <Textarea
                value={currentData.vision || ""}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Misi</label>
              <Textarea
                value={currentData.mission || ""}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Keunggulan / Values</h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              Keunggulan (satu per baris)
            </label>
            <Textarea
              value={Array.isArray(currentData.values) ? currentData.values.join('\n') : currentData.values || ""}
              onChange={(e) => setFormData({ ...formData, values: e.target.value })}
              rows={8}
              placeholder="Legal dan berizin resmi&#10;Pembimbing berpengalaman&#10;Hotel dekat Masjidil Haram & Nabawi"
            />
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

export default CompanyPage;