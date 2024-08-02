"use client";

import { Video } from "@/hooks/useVideo";
import { useEditVideoMutation } from "@/mutations/video.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import VideoForm from "./video-form";

type Props = {
  video: Video;
};

const formSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(5000).optional(),
  video: z.instanceof(FileList),
  thumbnail: z.instanceof(FileList).optional(),
});

const EditVideo = ({ video }: Props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const queryClient = useQueryClient();

  const { editVideoMutation } = useEditVideoMutation({
    onSuccess: (videoData, { video, thumbnail }) => {
      setOpenEditDialog(false);
      if (!video?.[0]?.type && !thumbnail?.[0]?.type) {
        toast.success("Video updated successfully", {
          richColors: true,
        });
      }
      if (!videoData?.data?.data) return;
      const { thumbnailUploadUrl, videoUploadUrl } = videoData.data.data;
      const uploadThumbnail = async () => {
        if (thumbnailUploadUrl) {
          await fetch(thumbnailUploadUrl, {
            method: "PUT",
            body: thumbnail?.[0],
          });
        }
      };
      const uploadVideo = async () => {
        await fetch(videoUploadUrl, {
          method: "PUT",
          body: video?.[0],
        });
      };

      const uploadVideoAndThumbnail = async () => {
        await uploadThumbnail();
        await uploadVideo();
      };

      const uploadToast = (promise: () => Promise<unknown>) => {
        toast.promise(promise, {
          loading: "Uploading video, don't refresh or close the tab.",
          success: async () => {
            await queryClient.invalidateQueries(["all_videos"]);
            return "Video edited successfully";
          },
          //   error: () => {
          //     updateVideoUploadStatus.mutate({
          //       videoId,
          //       status: "failed",
          //     });
          //     return "Failed to upload video";
          //   },
          richColors: true,
        });
      };

      if (thumbnail && thumbnail?.[0]?.type) {
        uploadToast(uploadThumbnail);
      }
      if (video && video?.[0]?.type) {
        uploadToast(uploadVideo);
      }
      if (video && video?.[0]?.type && thumbnail && thumbnail?.[0]?.type) {
        uploadToast(uploadVideoAndThumbnail);
      }
      queryClient.invalidateQueries(["all_videos"]);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: video?.title,
      description: video?.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!video) return;
    await editVideoMutation.mutateAsync({
      videoId: video.videoId,
      title: values.title,
      description: values.description,
      video: values.video,
      thumbnail: values.thumbnail,
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenEditDialog(true)}
      >
        <Pencil className="w-5 h-5" />
      </Button>
      <VideoForm
        onSubmit={onSubmit}
        form={form}
        isLoading={editVideoMutation.isLoading}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        defaultTitle={video?.title}
        defaultDescription={video?.description}
      />
    </>
  );
};

export default EditVideo;
