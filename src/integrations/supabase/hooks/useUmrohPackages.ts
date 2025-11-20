import { useQuery } from "@tanstack/react-query";
import { supabase } from "../client";

export const useUmrohPackages = () => {
  return useQuery({
    queryKey: ["umroh-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umroh_packages")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};