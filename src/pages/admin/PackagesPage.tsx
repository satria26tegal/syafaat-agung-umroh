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
                  <h3 className="text-2xl font-cairo font-bold text-gold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Durasi:</strong> {pkg.duration_days} Hari</div>
                    <div><strong>Harga:</strong> Rp {pkg.price?.toLocaleString('id-ID')}</div>
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
    price: "",
    airline: "",
    hotel_makkah: "",
    hotel_madinah: "",
    facilities: "",
    is_active: true,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        facilities: data.facilities ? data.facilities.split('\n').filter(Boolean) : [],
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
          placeholder="Nama Paket"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Textarea
          placeholder="Deskripsi"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Durasi (hari)"
            value={formData.duration_days}
            onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
            required
          />
          <Input
            type="number"
            placeholder="Harga"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <Input
          placeholder="Maskapai"
          value={formData.airline}
          onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
        />
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
        <Textarea
          placeholder="Fasilitas (satu per baris)"
          value={Array.isArray(formData.facilities) ? formData.facilities.join('\n') : formData.facilities}
          onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
          rows={5}
        />
        <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-gradient-gold">
          {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </>
  );
};

export default PackagesPage;