"use client";

import FullPageLoader from "@/components/full-page-loader";
import Navbar from "@/components/ui/navbar";
import useAuth from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isError } = useAuth();
  if (isLoading) return <FullPageLoader />;
  if (isError || !user?.data?.user) return <div>Error...</div>;
  const { id, name, role, profileUrlImage, editors, ytChannelName } =
    user.data.user;

  return (
    <section>
      <Navbar
        id={id}
        name={name}
        role={role}
        profileUrlImage={profileUrlImage}
        editors={editors}
        ytChannelName={ytChannelName}
      />
      {children}
    </section>
  );
}
