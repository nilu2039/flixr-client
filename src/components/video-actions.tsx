import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Video } from "@/hooks/useVideo";
import api from "@/lib/api";
import { useUpdateStatusMutation } from "@/mutations/video.mutations";
import { AxiosError } from "axios";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

type Props = {
  row: Video;
};

const VideoActions: FC<Props> = ({ row }) => {
  const { videoId } = row;

  const { updateStatusMutation } = useUpdateStatusMutation(videoId);

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
