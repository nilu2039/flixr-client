"use client";

import api from "@/lib/api";
import { useQuery } from "react-query";
import { z } from "zod";
import { errorSchema } from "@/schema/global";

export const baseVideoSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  description: z.string(),
  contentType: z.string(),
  fileSize: z.number().nullable(),
  editorId: z.number().nullable(),
  adminId: z.number(),
  uploadStatus: z.enum(["idle", "pending", "completed", "failed"]),
  thumbnailUrl: z.string().nullable().optional(),
  status: z.enum(["draft", "accepted", "rejected"]),
  youtubeUploadStatus: z.enum(["draft", "pending", "completed", "failed"]),
  uploader: z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum(["admin", "editor"]),
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const videoSchema = z.object({
  success: z.boolean(),
  data: baseVideoSchema.extend({
    videoUrl: z.string().optional().nullable(),
  }),
  error: errorSchema.optional(),
});

export type Video = z.infer<typeof videoSchema>["data"];

const useVideo = (videoId: string) => {
  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["video-details", videoId],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/get-video-details?videoId=${videoId}`);
        const res = videoSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  });
  return {
    video,
    isLoading,
    isError,
    error,
  };
};

export default useVideo;
