import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Video } from "@/hooks/useAllVideos";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

type Props = {
  row: Video;
};

const VideoActions: FC<Props> = ({ row }) => {
  const queryClient = useQueryClient();
  const { videoId } = row;

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            updateStatusMutation.mutate({
              status: "accepted",
              uploadYT: true,
            });
          }}
        >
          Accept and Upload
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateStatusMutation.mutate({
              status: "rejected",
            });
          }}
        >
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VideoActions;
