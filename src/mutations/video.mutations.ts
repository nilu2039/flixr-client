import { Video } from "@/hooks/useVideo";
import api from "@/lib/api";
import { errorSchema } from "@/schema/global";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useUploadYoutubeMutation = (videoId: string) => {
  const queryClient = useQueryClient();
  const uploadYoutubeMutation = useMutation({
    mutationKey: ["upload_youtube", videoId],
    mutationFn: async ({ videoId }: { videoId: string }) => {
      try {
        return await api.post("/upload-youtube", { videoId });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Upload started, please check back later.", {
        richColors: true,
        duration: 10000,
      });
    },

    onError: (error: AxiosError) => {
      //@ts-ignore
      const errorMessage = error?.response?.data?.error?.message;
      toast.error(
        errorMessage ? errorMessage : "Failed to upload video to youtube",
        { richColors: true }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries("all_videos");
    },
  });
  return { uploadYoutubeMutation };
};

export const useUpdateStatusMutation = (videoId: string) => {
  const { uploadYoutubeMutation } = useUploadYoutubeMutation(videoId);
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationKey: ["update_status", videoId],
    mutationFn: async ({
      status,
      uploadYT = false,
    }: {
      status: Video["status"];
      uploadYT?: boolean;
    }) => {
      try {
        return await api.post("/update-video-status", { videoId, status });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (_, { uploadYT }) => {
      if (!videoId || !uploadYT) return;
      uploadYoutubeMutation.mutate({ videoId });
    },
    onError: (error: AxiosError) => {
      //@ts-ignore
      const errorMessage = error?.response?.data?.error?.message;
      toast.error(errorMessage ? errorMessage : "Failed to update status", {
        richColors: true,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("all_videos");
    },
  });

  return { updateStatusMutation };
};

export const useEditVideoMutation = ({
  onSuccess = () => {},
}: {
  onSuccess?: (
    data: typeof editVideoMutation.data,
    {
      video,
      thumbnail,
    }: {
      video?: FileList;
      thumbnail?: FileList;
    }
  ) => void;
}) => {
  const payloadSchema = z.object({
    videoId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    video: z.instanceof(FileList).optional(),
    thumbnail: z.instanceof(FileList).optional(),
  });

  const returnSchema = z.object({
    success: z.boolean(),
    data: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      videoUploadUrl: z.string(),
      thumbnailUploadUrl: z.string().nullable(),
    }),
    error: errorSchema.optional(),
  });
  const editVideoMutation = useMutation({
    mutationKey: ["edit_video"],
    mutationFn: async (values: z.infer<typeof payloadSchema>) => {
      try {
        const { data } = await api.post("/edit-video-details", {
          videoId: values.videoId,
          title: values.title,
          description: values.description,
          thumbnailContentType: values.thumbnail?.[0]?.type,
        });
        return returnSchema.safeParse(data);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      onSuccess(data, {
        video: variables.video,
        thumbnail: variables.thumbnail,
      });
    },
  });
  return { editVideoMutation, payloadSchema };
};
