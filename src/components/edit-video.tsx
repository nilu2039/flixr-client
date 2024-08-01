import useVideo from "@/hooks/useVideo";
import { useEditVideoMutation } from "@/mutations/video.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";
import { z } from "zod";
import { Button } from "./ui/button";
import VideoForm from "./video-form";

type Props = {
  videoId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const EditVideo = ({ videoId }: Props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { video, isLoading: isVideoLoading } = useVideo(videoId);

  const { editVideoMutation } = useEditVideoMutation({
    onSuccess: (videoData) => {
      setOpenEditDialog(false);
      if (!plainFiles || plainFiles.length <= 0) {
        toast.success("Video updated successfully", {
          richColors: true,
        });
      }
      if (plainFiles.length > 0 && videoData?.data) {
        toast.promise(
          fetch(videoData.data.data.uploadUrl, {
            method: "PUT",
            body: plainFiles[0],
          }),
          {
            loading: "Uploading video, don't refresh or close the tab.",
            success: () => {
              queryClient.invalidateQueries(["all_videos"]);
              return "Video uploaded successfully";
            },
            //   error: () => {
            //     updateVideoUploadStatus.mutate({
            //       videoId,
            //       status: "failed",
            //     });
            //     return "Failed to upload video";
            //   },
            richColors: true,
          }
        );
      }
      queryClient.invalidateQueries(["all_videos"]);
    },
  });
  const queryClient = useQueryClient();
  const { openFilePicker, plainFiles, clear } = useFilePicker({
    accept: "video/*",
    multiple: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: video?.data?.data.title,
      description: video?.data?.data.description,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!video || !video.data) return;
    editVideoMutation.mutate({
      videoId: video.data.data.videoId,
      title: values.title,
      description: values.description,
    });
  };
  if (isVideoLoading) return <Loader2 className="animate-spin" />;
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
        openFilePicker={openFilePicker}
        plainFiles={plainFiles}
        clear={clear}
        onSubmit={onSubmit}
        form={form}
        isLoading={editVideoMutation.isLoading}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        defaultTitle={video?.data?.data.title}
        defaultDescription={video?.data?.data.description}
      />
    </>
  );
};

export default EditVideo;
