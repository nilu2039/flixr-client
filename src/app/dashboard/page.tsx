"use client";

import FullPageLoader from "@/components/full-page-loader";

import VideoCard from "@/components/video-card";
import useAllVideos from "@/hooks/useAllVideos";

const Dashboard = () => {
  const { videos, isLoading: isVideoLoading } = useAllVideos();
  if (isVideoLoading) return <FullPageLoader />;
  if (!videos?.data?.data) return <div>Error...</div>;

  return (
    <div>
      <div className="flex flex-row justify-center gap-10 flex-wrap py-4 overflow-auto">
        {videos.data.data.length > 0 ? (
          videos.data.data.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))
        ) : (
          <div className="min-h-[calc(100dvh-10rem)] w-screen flex items-center text-center justify-center p-4 text-3xl md:text-4xl text-muted-foreground">
            No videos found. Please upload a video.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
