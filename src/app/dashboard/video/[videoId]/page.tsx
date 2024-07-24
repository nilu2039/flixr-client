"use client";

import FullPageLoader from "@/components/full-page-loader";
import VideoDetails from "@/components/video-details";
import useVideo from "@/hooks/useVideo";

const Page = ({ params }: { params: { videoId: string } }) => {
  const { video, isError, isLoading } = useVideo(params.videoId);

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Error...</div>;
  if (!video || !video.data) return <div>No video found...</div>;
  return (
    <div>
      <VideoDetails video={video.data?.data} />
    </div>
  );
};

export default Page;
