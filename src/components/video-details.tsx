import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Video } from "@/hooks/useVideo";
import { Ban } from "lucide-react";
import Link from "next/link";
import { RoleBadge } from "./upload-badge";

type Props = {
  video: Video | null;
};

const VideoDetails = ({ video }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center container p-4">
      <Breadcrumb className="flex w-full pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{video?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
        <div className="w-full lg:w-9/12 flex flex-col gap-4">
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
          <h1 className="text-foreground text-lg font-normal">
            {video?.description}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
