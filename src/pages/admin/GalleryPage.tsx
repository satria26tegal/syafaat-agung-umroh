import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const GalleryPage = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: gallery, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Item berhasil dihapus!");
    },
  });

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Gallery</h1>
          <p className="text-muted-foreground">Kelola foto dan video dokumentasi</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold">
              <Plus className="mr-2" size={20} />
              Tambah Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <GalleryForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery?.map((item) => (
            <Card key={item.id} className="overflow-hidden border-gold/20 group">
              <div className="relative aspect-square">
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-blue flex items-center justify-center">
                    <span className="text-gold text-4xl">▶</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-dark-blue/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Yakin ingin menghapus item ini?")) {
                        deleteMutation.mutate(item.id);
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

const GalleryForm = ({ onClose }: any) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    type: "photo",
    url: "",
    category: "",
    description: "",
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("gallery")
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Item berhasil ditambahkan!");
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
          Tambah Item Gallery
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Judul"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="photo">Foto</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="URL (untuk foto: link gambar, untuk video: YouTube embed URL)"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
        <Input
          placeholder="Kategori (contoh: 2024, Ka'bah, City Tour)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <Textarea
          placeholder="Deskripsi (opsional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <Button type="submit" disabled={saveMutation.isPending} className="w-full bg-gradient-gold">
          {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </>
  );
};

export default GalleryPage;