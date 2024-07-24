"use client";

import FullPageLoader from "@/components/full-page-loader";
import VideoDetails from "@/components/video-details";
import useVideo from "@/hooks/useVideo";
import { FileWarning } from "lucide-react";

const Page = ({ params }: { params: { videoId: string } }) => {
  const { video, isError, isLoading } = useVideo(params.videoId);

  if (isLoading) return <FullPageLoader />;
  if (isError) {
    return (
      <div className="h-dvh w-screen flex flex-col gap-4 items-center justify-center">
        <FileWarning className="w-32 h-32 text-destructive" />
        <p className="text-5xl font-bold text-destructive">
          Something went wrong!
        </p>
      </div>
    );
  }
  if (!video || !video.data) return <div>No video found...</div>;
  return (
    <div>
      <VideoDetails video={video.data?.data} />
    </div>
  );
};

export default Page;
