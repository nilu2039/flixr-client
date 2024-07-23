import { useQuery } from "react-query";
import api from "@/lib/api";
import { z } from "zod";
import { error } from "console";
import { errorSchema } from "@/schema/global";
import useEditorStore from "@/store/useEditorStore";

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
      s3ObjectKey: z.string(),
      adminId: z.number(),
      videoUrl: z.string().optional().nullable(),
      uploadStatus: z.enum(["idle", "pending", "completed", "failed"]),
      status: z.enum(["draft", "accepted", "rejected"]),
      youtubeUploadStatus: z.enum(["draft", "pending", "completed", "failed"]),
      uploader: z.object({
        id: z.number(),
        name: z.string(),
        role: z.enum(["admin", "editor"]),
      }),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    })
  ),
  error: errorSchema.optional(),
});

export type Video = z.infer<typeof videoSchema>["data"][0];

const useAllVideos = () => {
  const { editor } = useEditorStore();
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_videos", editor?.id],
    queryFn: async () => {
      try {
        const { data } = await api.get(
          `/get-all-videos?editorId=${editor?.id ?? ""}`
        );
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
