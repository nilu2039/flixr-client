"use client";

import ResetPassword from "@/components/reset-password";
import useAuth from "@/hooks/useAuth";

const Page = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (user?.data?.user.role === "admin")
    return <div>Admins cannot reset password</div>;
  return (
    <div className="container flex justify-center items-center w-screen h-dvh">
      <ResetPassword />
    </div>
  );
};

export default Page;
