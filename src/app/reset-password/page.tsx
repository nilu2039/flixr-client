"use client";

import FullPageLoader from "@/components/full-page-loader";
import ResetPassword from "@/components/reset-password";
import useAuth from "@/hooks/useAuth";

const Page = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <FullPageLoader />;
  if (user?.data?.user.role === "admin")
    return <div>Admins cannot reset password</div>;
  return (
    <div className="container flex justify-center items-center w-screen h-dvh">
      <ResetPassword />
    </div>
  );
};

export default Page;
