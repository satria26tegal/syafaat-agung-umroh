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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
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
        <div className="text-center py-8">Loading packages...</div>
      ) : packages && packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="relative overflow-hidden border-2 border-[#D4AF37]">
              {/* Islamic Decorative Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#0A3D2E] to-[#D4AF37]"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#0A3D2E] to-[#D4AF37]"></div>

              <CardHeader className="text-center bg-gradient-to-br from-[#0A3D2E] to-[#0A1A2F] text-white pb-4">
                {/* Logo Placeholder */}
                <div className="mx-auto w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[#0A3D2E]">SA</span>
                </div>
                <p className="text-xs text-[#D4AF37] mb-1">SYAFAAT AGUNG TOUR AND TRAVEL</p>
                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                {pkg.tagline && <p className="text-sm italic text-[#D4AF37]">"{pkg.tagline}"</p>}
              </CardHeader>

              <CardContent className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                {/* Season & Month */}
                <div className="text-center space-y-1">
                  {pkg.season_type && (
                    <div className="inline-block px-4 py-1 bg-[#D4AF37] text-[#0A3D2E] rounded-full text-sm font-bold">
                      {pkg.season_type}
                    </div>
                  )}
                  {pkg.departure_month && (
                    <p className="text-sm text-gray-600 mt-2">Keberangkatan: <span className="font-semibold">{pkg.departure_month}</span></p>
                  )}
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-br from-[#0A3D2E] to-[#0A1A2F] text-white p-4 rounded-lg space-y-2">
                  <p className="text-center text-xs text-[#D4AF37] mb-2">HARGA PAKET</p>
                  {pkg.price_quads && (
                    <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-1">
                      <span className="text-sm">Quads</span>
                      <span className="font-bold text-[#D4AF37]">Rp {pkg.price_quads.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {pkg.price_triple && (
                    <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-1">
                      <span className="text-sm">Triple</span>
                      <span className="font-bold text-[#D4AF37]">Rp {pkg.price_triple.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {pkg.price_double && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Double</span>
                      <span className="font-bold text-[#D4AF37]">Rp {pkg.price_double.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-[#0A3D2E] text-[#D4AF37] rounded-md text-sm font-semibold">
                    {pkg.duration_days} Hari
                  </span>
                </div>

                {/* Status */}
                <div className="text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pkg.is_active ? "Aktif" : "Non-aktif"}
                  </span>
                </div>

                {/* Description */}
                {pkg.description && (
                  <p className="text-sm text-gray-600 text-center line-clamp-3">{pkg.description}</p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 border-[#0A3D2E] text-[#0A3D2E] hover:bg-[#0A3D2E] hover:text-white"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Paket?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Paket akan dihapus secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(pkg.id)}>
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">Belum ada paket</div>
      )}
    </AdminLayout>
  );
};

const PackageForm = ({ package: pkg, onClose }: any) => {
  const queryClient = useQueryClient();
  
  // Initialize form data properly, handling array fields
  const getInitialFormData = () => {
    if (pkg) {
      return {
        ...pkg,
        facilities: Array.isArray(pkg.facilities) ? pkg.facilities.join('\n') : (pkg.facilities || ""),
        included_items: Array.isArray(pkg.included_items) ? pkg.included_items.join('\n') : (pkg.included_items || ""),
        not_included_items: Array.isArray(pkg.not_included_items) ? pkg.not_included_items.join('\n') : (pkg.not_included_items || ""),
        price_quads: pkg.price_quads || "",
        price_triple: pkg.price_triple || "",
        price_double: pkg.price_double || "",
      };
    }
    return {
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
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      // Convert string prices to numbers and prepare arrays
      const payload = {
        name: data.name,
        description: data.description || null,
        duration_days: parseInt(data.duration_days),
        price_quads: data.price_quads ? parseFloat(data.price_quads) : null,
        price_triple: data.price_triple ? parseFloat(data.price_triple) : null,
        price_double: data.price_double ? parseFloat(data.price_double) : null,
        airline: data.airline || null,
        hotel_makkah: data.hotel_makkah || null,
        hotel_madinah: data.hotel_madinah || null,
        facilities: data.facilities ? data.facilities.split('\n').filter((item: string) => item.trim()) : [],
        included_items: data.included_items ? data.included_items.split('\n').filter((item: string) => item.trim()) : [],
        not_included_items: data.not_included_items ? data.not_included_items.split('\n').filter((item: string) => item.trim()) : [],
        season_type: data.season_type || null,
        tagline: data.tagline || null,
        departure_month: data.departure_month || null,
        is_active: data.is_active !== undefined ? data.is_active : true,
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
    onError: (error: any) => {
      toast.error(`Gagal menyimpan paket: ${error.message}`);
      console.error("Error saving package:", error);
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