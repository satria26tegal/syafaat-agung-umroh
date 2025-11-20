import { useQuery } from "@tanstack/react-query";
import { supabase } from "../client";

export const useCompanyProfile = () => {
  return useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_profile")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};