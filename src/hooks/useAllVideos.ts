import { useQuery } from "react-query";
import api from "@/lib/api";
import { z } from "zod";
import { error } from "console";
import { errorSchema } from "@/schema/global";

const videoSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      videoId: z.string(),
      title: z.string(),
      description: z.string(),
      contentType: z.string(),
      fileSize: z.number().nullable(),
      editorId: z.number().nullable(),
      uploadStatus: z.enum(["idle", "pending", "completed", "failed"]),
      status: z.enum(["draft", "accepted", "rejected"]),
      youtubeUploadStatus: z.enum(["draft", "pending", "completed", "failed"]),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    })
  ),
  error: errorSchema.optional(),
});

export type Video = z.infer<typeof videoSchema>["data"][0];

const useAllVideos = () => {
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_videos"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/get-all-videos");
        const res = videoSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    videos,
    isLoading,
    isError,
    error,
  };
};

export default useAllVideos;
