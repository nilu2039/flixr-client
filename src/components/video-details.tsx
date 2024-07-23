import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { Video } from "@/hooks/useVideo";
import { RoleBadge } from "./upload-badge";
import { Ban } from "lucide-react";

type Props = {
  video: Video | null;
};

const VideoDetailsDialog = ({ video }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center container p-10 gap-10">
      <div className="flex flex-col gap-4 w-full h-full">
        {video?.videoUrl ? (
          <div className="w-full lg:w-9/12">
            <MediaPlayer title={video.title} src={video.videoUrl}>
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </div>
        ) : (
          <div className="w-full lg:w-9/12 h-[60dvh] bg-primary-foreground flex flex-col items-center justify-center gap-4">
            <p className="text-4xl text-foreground text-center">
              Video not found
            </p>
            <Ban className="w-20 h-20 text-foreground" />
          </div>
        )}
        <h1 className="text-foreground text-3xl font-medium text-left">
          {video?.title}
        </h1>
        {video?.uploader ? (
          <div className="flex flex-row gap-2">
            <p className="text-muted-foreground text-base">
              {video?.uploader.name}
            </p>
            <RoleBadge role={video?.uploader.role} />
          </div>
        ) : null}
        <h1 className="text-foreground text-xl font-normal text-left">
          {video?.description}
        </h1>
      </div>
    </div>
  );
};

export default VideoDetailsDialog;
