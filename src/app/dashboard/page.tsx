"use client";

import useAllVideos from "@/hooks/useAllVideos";
import { dashboardColumns } from "./columns";
import { DataTable } from "./data-table";

const Dashboard = () => {
  const { videos, isLoading: isVideoLoading } = useAllVideos();
  if (isVideoLoading) return <div>Loading...</div>;
  if (!videos?.data?.data) return <div>Error...</div>;

  return (
    <div>
      <DataTable columns={dashboardColumns} data={videos.data.data} />
    </div>
  );
};

export default Dashboard;
