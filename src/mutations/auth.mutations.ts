import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

const useLogout = () => {
  const router = useRouter();
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
      router.push("/login");
    },
  });

  return { logoutMutation };
};

export { useLogout };
