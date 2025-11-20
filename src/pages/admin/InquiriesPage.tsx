import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const InquiriesPage = () => {
  const queryClient = useQueryClient();

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ is_read: true })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      toast.success("Ditandai sebagai sudah dibaca");
    },
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-cairo font-bold text-gold mb-2">Pesan Masuk</h1>
        <p className="text-muted-foreground">
          Kelola pesan dari calon jamaah ({inquiries?.filter(i => !i.is_read).length || 0} belum dibaca)
        </p>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : inquiries && inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card
              key={inquiry.id}
              className={`p-6 border-gold/20 ${!inquiry.is_read ? "bg-gold/5" : ""}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-cairo font-bold text-gold mb-1">
                    {inquiry.name}
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {inquiry.email && <p>Email: {inquiry.email}</p>}
                    {inquiry.phone && <p>Telepon: {inquiry.phone}</p>}
                    <p>
                      Dikirim: {new Date(inquiry.created_at).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {inquiry.is_read ? (
                    <Badge variant="secondary">Sudah dibaca</Badge>
                  ) : (
                    <Badge className="bg-gold">Belum dibaca</Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Pesan:</p>
                <p className="text-muted-foreground whitespace-pre-wrap">{inquiry.message}</p>
              </div>

              {!inquiry.is_read && (
                <Button
                  size="sm"
                  onClick={() => markAsReadMutation.mutate(inquiry.id)}
                  disabled={markAsReadMutation.isPending}
                  className="bg-gradient-gold"
                >
                  <CheckCircle className="mr-2" size={16} />
                  Tandai Sudah Dibaca
                </Button>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-gold/20">
          <p className="text-muted-foreground">Belum ada pesan masuk</p>
        </Card>
      )}
    </AdminLayout>
  );
};

export default InquiriesPage;