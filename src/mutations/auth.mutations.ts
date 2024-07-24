import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries();
      router.push("/login");
    },
  });

  return { logoutMutation };
};

const useResetPassword = (zodSchema: z.ZodObject<any, any>) => {
  const passwordResetMutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (values: { password: string }) => {
      try {
        const { data } = await api.post("/reset-editor-password", values);
        const res = zodSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    onError: () => {
      toast.error("Error resetting password!", { richColors: true });
    },
  });
  return { passwordResetMutation };
};

export { useLogout, useResetPassword };
