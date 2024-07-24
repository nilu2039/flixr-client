"use client";

import Navbar from "@/components/ui/navbar";
import useAuth from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user?.data?.user) return <div>Error...</div>;
  const { id, name, role, profileUrlImage, editors } = user.data.user;

  return (
    <section>
      <Navbar
        id={id}
        name={name}
        role={role}
        profileUrlImage={profileUrlImage}
        editors={editors}
      />
      {children}
    </section>
  );
}
