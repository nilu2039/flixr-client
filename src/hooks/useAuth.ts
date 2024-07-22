"use client";

import api from "@/lib/api";
import { errorSchema } from "@/schema/global";
import { useQuery } from "react-query";
import { z } from "zod";

const baseSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.enum(["admin", "editor"]),
  verified: z.boolean(),
});

const userSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      user: baseSchema.extend({
        profileUrlImage: z.string().optional(),
        editors: z.array(baseSchema).optional(),
      }),
    })
    .optional(),
  error: errorSchema.optional(),
});

export type BaseUserType = z.infer<typeof baseSchema>;

const fetchUsers = async (): Promise<z.infer<typeof userSchema>> => {
  try {
    const { data } = await api.get("/auth/me");
    const res = userSchema.safeParse(data);
    if (!res.success) throw new Error(res.error.message);
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: "auth_users",
    queryFn: fetchUsers,
  });
  return {
    user: data,
    isLoading,
    isError,
  };
};

export default useAuth;
