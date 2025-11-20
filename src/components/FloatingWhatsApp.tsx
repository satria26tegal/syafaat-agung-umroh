import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/integrations/supabase/hooks/useSiteSettings";

const FloatingWhatsApp = () => {
  const { data: settings } = useSiteSettings();

  const handleClick = () => {
    if (settings?.whatsapp_number) {
      window.open(`https://wa.me/${settings.whatsapp_number}`, "_blank");
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-40 rounded-full h-16 w-16 p-0 shadow-elegant bg-[#25D366] hover:bg-[#20BD5A] animate-float"
    >
      <MessageCircle size={28} className="text-white" />
    </Button>
  );
};

export default FloatingWhatsApp;