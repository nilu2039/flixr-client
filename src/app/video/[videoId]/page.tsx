"use client";

import VideoDetailsDialog from "@/components/video-details";
import useVideo from "@/hooks/useVideo";
import React from "react";

const Page = ({ params }: { params: { videoId: string } }) => {
  const { video, isError, isLoading } = useVideo(params.videoId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!video || !video.data) return <div>No video found...</div>;
  return (
    <div>
      <VideoDetailsDialog video={video.data?.data} />
    </div>
  );
};

export default Page;
