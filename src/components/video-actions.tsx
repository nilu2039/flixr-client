import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Video } from "@/hooks/useVideo";
import { useUpdateStatusMutation } from "@/mutations/video.mutations";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";

type Props = {
  video: Video;
};

const VideoActions: FC<Props> = ({ video }) => {
  const { videoId } = video;
  const { user } = useAuth();

  const { updateStatusMutation } = useUpdateStatusMutation(videoId);

  if (user?.data?.user.role !== "admin") {
    return null;
  }

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" className="h-8 w-8 p-0">
    //       <span className="sr-only">Open menu</span>
    //       <MoreHorizontal className="h-4 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem
    //       onClick={() => {
    //         updateStatusMutation.mutate({
    //           status: "accepted",
    //           uploadYT: true,
    //         });
    //       }}
    //     >
    //       Accept and Upload
    //     </DropdownMenuItem>
    //     <DropdownMenuItem
    //       onClick={() => {
    //         updateStatusMutation.mutate({
    //           status: "rejected",
    //         });
    //       }}
    //     >
    //       Reject
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <>
      <div className="flex flex-row gap-2 items-center justify-center">
        <Button
          size="sm"
          className=""
          onClick={() => {
            updateStatusMutation.mutate({
              status: "accepted",
              uploadYT: true,
            });
          }}
        >
          Upload
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            updateStatusMutation.mutate({
              status: "rejected",
            });
          }}
        >
          Reject
        </Button>
      </div>
    </>
  );
};

export default VideoActions;
