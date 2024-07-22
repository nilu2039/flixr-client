"use client";

import Navbar from "@/components/ui/navbar";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useAllVideos from "@/hooks/useAllVideos";

const Dashboard = () => {
  const { user, isLoading, isError } = useAuth();
  const { videos, isLoading: isVideoLoading } = useAllVideos();
  if (isLoading || isVideoLoading) return <div>Loading...</div>;
  if (isError || !user?.data?.user || !videos?.data?.data)
    return <div>Error...</div>;

  const { id, name, role, profileUrlImage, editors } = user.data.user;

  return (
    <div>
      <Navbar
        id={id}
        name={name}
        role={role}
        profileUrlImage={profileUrlImage}
        editors={editors}
      />
      <DataTable columns={columns} data={videos.data.data} />
    </div>
  );
};

export default Dashboard;
