import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  UploadStatusBadge,
  VideoStatusBadge,
  YoutubeUploadStatusBadge,
} from "@/components/upload-badge";
import { Video } from "@/hooks/useVideo";
import { byteToMb } from "@/utils/file-size";
import { Eye } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import VideoActions from "./video-actions";
const EditVideo = dynamic(() => import("@/components/edit-video"), {
  ssr: false,
});

type Props = {
  video: Video;
};

const VideoCard = ({ video }: Props) => {
  return (
    <Card>
      <CardHeader>
        <Image
          src={video.thumbnailUrl ?? "/images/card-placeholder.png"}
          alt={video.title}
          width={320}
          height={180}
          className="border-b"
        />
        <CardDescription
          title={video.title}
          className="text-foreground text-base max-w-[320px] line-clamp-2"
        >
          {video.title}
        </CardDescription>
        <div className="flex flex-row gap-2">
          <CardDescription>{video.uploader.name}</CardDescription>
          <CardDescription>
            {video.fileSize ? `${byteToMb(video.fileSize)}MB` : null}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <p>Accepted: </p>
              <VideoStatusBadge status={video.status} />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p>Upload Status: </p>
              <UploadStatusBadge status={video.uploadStatus} />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p>Youtube Upload Status: </p>
              <YoutubeUploadStatusBadge status={video.youtubeUploadStatus} />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/video/${video.videoId}`}>
                <Eye className="w-5 h-5" />
              </Link>
            </Button>
            <EditVideo videoId={video.videoId} />
          </div>
          <div>
            <VideoActions video={video} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
