import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const PackagesPage = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const { data: packages, isLoading } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umroh_packages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("umroh_packages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      toast.success("Paket berhasil dihapus!");
    },
  });

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Paket Umroh</h1>
          <p className="text-muted-foreground">Kelola paket umroh</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="bg-gradient-gold">
              <Plus className="mr-2" size={20} />
              Tambah Paket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <PackageForm
              package={editingPackage}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingPackage(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6">
          {packages?.map((pkg) => (
            <Card key={pkg.id} className="p-6 border-gold/20">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-cairo font-bold text-gold mb-2">
                    {pkg.name} {pkg.season_type && `(${pkg.season_type})`}
                  </h3>
                  {pkg.tagline && (
                    <p className="text-gold/80 italic text-sm mb-2">"{pkg.tagline}"</p>
                  )}
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Durasi:</strong> {pkg.duration_days} Hari</div>
                    {pkg.departure_month && (
                      <div><strong>Keberangkatan:</strong> {pkg.departure_month}</div>
                    )}
                    {pkg.price_quads && (
                      <div><strong>Harga Quads:</strong> Rp {pkg.price_quads?.toLocaleString('id-ID')}</div>
                    )}
                    {pkg.price_triple && (
                      <div><strong>Harga Triple:</strong> Rp {pkg.price_triple?.toLocaleString('id-ID')}</div>
                    )}
                    {pkg.price_double && (
                      <div><strong>Harga Double:</strong> Rp {pkg.price_double?.toLocaleString('id-ID')}</div>
                    )}
                    <div><strong>Maskapai:</strong> {pkg.airline || "-"}</div>
                    <div><strong>Status:</strong> {pkg.is_active ? "Aktif" : "Non-aktif"}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(pkg)}
                    className="border-gold text-gold"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Yakin ingin menghapus paket ini?")) {
                        deleteMutation.mutate(pkg.id);
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

const PackageForm = ({ package: pkg, onClose }: any) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(pkg || {
    name: "",
    description: "",
    duration_days: 9,
    price_quads: "",
    price_triple: "",
    price_double: "",
    airline: "",
    hotel_makkah: "",
    hotel_madinah: "",
    facilities: "",
    included_items: "",
    not_included_items: "",
    season_type: "",
    tagline: "",
    departure_month: "",
    is_active: true,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        facilities: data.facilities ? data.facilities.split('\n').filter(Boolean) : [],
        included_items: data.included_items ? data.included_items.split('\n').filter(Boolean) : [],
        not_included_items: data.not_included_items ? data.not_included_items.split('\n').filter(Boolean) : [],
      };

      if (pkg?.id) {
        const { error } = await supabase
          .from("umroh_packages")
          .update(payload)
          .eq("id", pkg.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("umroh_packages")
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      queryClient.invalidateQueries({ queryKey: ["umroh-packages"] });
      toast.success(`Paket berhasil ${pkg ? "diupdate" : "ditambahkan"}!`);
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-gold font-cairo text-2xl">
          {pkg ? "Edit Paket" : "Tambah Paket Baru"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nama Paket (contoh: Paket Umroh 10 Hari)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
        <Input
          placeholder="Tagline (contoh: Melayani dengan segenap hati layaknya keluarga)"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Tipe Season (contoh: HIGH-SEASON)"
            value={formData.season_type}
            onChange={(e) => setFormData({ ...formData, season_type: e.target.value })}
          />
          <Input
            placeholder="Bulan Keberangkatan (contoh: Januari 2026)"
            value={formData.departure_month}
            onChange={(e) => setFormData({ ...formData, departure_month: e.target.value })}
          />
        </div>
        
        <Textarea
          placeholder="Deskripsi"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        
        <Input
          type="number"
          placeholder="Durasi (hari)"
          value={formData.duration_days}
          onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
          required
        />

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gold">Harga per Tipe Kamar:</p>
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="Harga Quads"
              value={formData.price_quads}
              onChange={(e) => setFormData({ ...formData, price_quads: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Harga Triple"
              value={formData.price_triple}
              onChange={(e) => setFormData({ ...formData, price_triple: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Harga Double"
              value={formData.price_double}
              onChange={(e) => setFormData({ ...formData, price_double: e.target.value })}
            />
          </div>
        </div>
        
        <Input
          placeholder="Maskapai"
          value={formData.airline}
          onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Hotel Makkah"
            value={formData.hotel_makkah}
            onChange={(e) => setFormData({ ...formData, hotel_makkah: e.target.value })}
          />
          <Input
            placeholder="Hotel Madinah"
            value={formData.hotel_madinah}
            onChange={(e) => setFormData({ ...formData, hotel_madinah: e.target.value })}
          />
        </div>
        
        <Textarea
          placeholder="Fasilitas (satu per baris)"
          value={Array.isArray(formData.facilities) ? formData.facilities.join('\n') : formData.facilities}
          onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
          rows={4}
        />

        <Textarea
          placeholder="Sudah Termasuk (satu per baris, contoh: Tiket pesawat PP)"
          value={Array.isArray(formData.included_items) ? formData.included_items.join('\n') : formData.included_items}
          onChange={(e) => setFormData({ ...formData, included_items: e.target.value })}
          rows={5}
        />

        <Textarea
          placeholder="Belum Termasuk (satu per baris, contoh: Paspor)"
          value={Array.isArray(formData.not_included_items) ? formData.not_included_items.join('\n') : formData.not_included_items}
          onChange={(e) => setFormData({ ...formData, not_included_items: e.target.value })}
          rows={4}
        />
        
        <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-gradient-gold">
          {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </>
  );
};

export default PackagesPage;