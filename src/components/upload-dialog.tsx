"use client";

import api from "@/lib/api";
import { errorSchema } from "@/schema/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import VideoForm from "./video-form";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  video: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "Video is required."),
  thumbnail: z.instanceof(FileList).optional(),
});

const getPresignedUrlResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      videoUploadUrl: z.string(),
      thumbnailUploadUrl: z.string().nullable(),
      videoId: z.string(),
    })
    .optional(),
  error: errorSchema.optional(),
});

type Props = {
  open: boolean;
  onSuccessfulCreate?: () => void;
  onOpenChange?: (open: boolean) => void;
};

const UploadDialog: FC<Props> = ({
  onSuccessfulCreate = () => {},
  open,
  onOpenChange = () => {},
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const updateVideoUploadStatus = useMutation({
    mutationKey: ["updateVideoUploadStatus"],
    mutationFn: async (values: {
      videoId: string;
      status: "pending" | "failed";
    }) => {
      try {
        const { data } = await api.post("/update-video-upload-status", values);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all_videos"]);
    },
  });

  const getPresignedUrlMutation = useMutation({
    mutationKey: ["getPresignedUrl"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const { data } = await api.post("/get-upload-presigned-url", {
          title: values.title,
          description: values.description,
          videoContentType: values.video?.[0]?.type,
          thumbnailContentType: values.thumbnail?.[0]?.type,
        });
        const res = getPresignedUrlResponseSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (values, variable) => {
      const video = variable.video?.[0];
      const videoUploadUrl = values.data?.data?.videoUploadUrl;
      const thumbnailUploadUrl = values.data?.data?.thumbnailUploadUrl;
      if (!videoUploadUrl) {
        toast.error("Failed to get upload", { richColors: true });
        return;
      }
      const videoId = values.data?.data?.videoId;

      if (!videoId) {
        toast.error("Failed to get upload", { richColors: true });
        return;
      }

      await updateVideoUploadStatus.mutateAsync({
        videoId,
        status: "pending",
      });

      onSuccessfulCreate();

      const uploadVideoAndThumbnail = async () => {
        if (thumbnailUploadUrl) {
          await fetch(thumbnailUploadUrl, {
            method: "PUT",
            body: variable.thumbnail?.[0],
          });
        }
        await fetch(videoUploadUrl, {
          method: "PUT",
          body: video,
        });
      };

      toast.promise(
        // fetch(updateVideoUploadStatus, {
        //   method: "PUT",
        //   body: video,
        // }),
        uploadVideoAndThumbnail,
        {
          loading: "Uploading video, don't refresh or close the tab.",
          success: () => {
            queryClient.invalidateQueries(["all_videos"]);
            return "Video uploaded successfully";
          },
          error: () => {
            updateVideoUploadStatus.mutate({
              videoId,
              status: "failed",
            });
            return "Failed to upload video";
          },
          richColors: true,
        }
      );
    },
    onError: (error) => {
      toast.error("Failed to get upload", { richColors: true });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // if (videoPlainFiles.length === 0) {
    //   toast.error("Please upload video file.", { richColors: true });
    //   return;
    // }
    getPresignedUrlMutation.mutate({
      title: values.title,
      description: values.description,
      video: values.video,
      thumbnail: values.thumbnail,
      // videoContentType: values.video?.[0]?.type,
      // thumbnailContentType: values.thumbnail?.[0]?.type,
    });
  }

  return (
    <VideoForm
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
      isLoading={getPresignedUrlMutation.isLoading}
    />
  );
};

export default UploadDialog;
