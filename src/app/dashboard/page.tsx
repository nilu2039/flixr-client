"use client";

import Navbar from "@/components/ui/navbar";
import useAuth from "@/hooks/useAuth";
import React from "react";

const Dashboard = () => {
  const { user, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user?.data?.user) return <div>Error...</div>;
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
    </div>
  );
};

export default Dashboard;
