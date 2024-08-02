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
        {videos.data.data.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
