import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Package, Image, MessageSquare, Users } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [packages, gallery, inquiries, unread] = await Promise.all([
        supabase.from("umroh_packages").select("id", { count: "exact" }),
        supabase.from("gallery").select("id", { count: "exact" }),
        supabase.from("contact_inquiries").select("id", { count: "exact" }),
        supabase.from("contact_inquiries").select("id", { count: "exact" }).eq("is_read", false),
      ]);

      return {
        packages: packages.count || 0,
        gallery: gallery.count || 0,
        inquiries: inquiries.count || 0,
        unreadInquiries: unread.count || 0,
      };
    },
  });

  const statCards = [
    {
      title: "Total Paket Umroh",
      value: stats?.packages || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Gallery",
      value: stats?.gallery || 0,
      icon: Image,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pesan Masuk",
      value: stats?.inquiries || 0,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pesan Belum Dibaca",
      value: stats?.unreadInquiries || 0,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang di Admin Panel Syafaat Agung</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 border-gold/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6">
        <Card className="p-6 border-gold/20">
          <h2 className="text-2xl font-cairo font-bold text-gold mb-4">Petunjuk Penggunaan</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <strong>Site Settings:</strong> Kelola informasi umum website (hero text, kontak, social media)</li>
            <li>• <strong>Paket Umroh:</strong> Tambah, edit, atau hapus paket umroh</li>
            <li>• <strong>Gallery:</strong> Upload dan kelola foto/video dokumentasi</li>
            <li>• <strong>Company Profile:</strong> Edit profil perusahaan, visi, misi, dan keunggulan</li>
            <li>• <strong>Pesan Masuk:</strong> Lihat dan balas pesan dari calon jamaah</li>
          </ul>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;