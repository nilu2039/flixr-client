"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DEVELOPER_NAME } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { getInitials } from "@/utils/generic";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Home() {
  const { user, isLoading } = useAuth();
  const renderSignInButton = () => {
    if (isLoading) {
      return (
        <div>
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }
    const selectedUser = user?.data?.user;
    if (user?.success) {
      return (
        <Link href="/dashboard" className="flex flex-row gap-2 items-center">
          <p className="font-medium text-base md:text-lg">Dashboard</p>
          <Avatar className="h-8 w-8 p-1">
            <AvatarImage
              src={selectedUser?.profileUrlImage}
              alt={selectedUser?.name ?? ""}
              className="grayscale"
            />
            <AvatarFallback>{getInitials(selectedUser?.name)}</AvatarFallback>
          </Avatar>
        </Link>
      );
    }
    return (
      <Button variant="outline" className="border-red-600">
        <Link href="/login">Sign In</Link>
      </Button>
    );
  };
  return (
    <div className="grid grid-rows-[auto_1fr_auto] p-10 min-h-dvh">
      <nav className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={"/logo.png"}
            alt="Flixr Logo"
            className="w-12 h-12"
            width={1000}
            height={1000}
          />
          <p className="text-2xl font-bold">
            Fli<span className="text-red-600">xr</span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-6">
          {renderSignInButton()}
          <ThemeToggle />
        </div>
      </nav>
      <div className="flex flex-col justify-center gap-8">
        <div className="flex md:grid grid-cols-2 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-4xl md:text-5xl lg:text-6xl text-left font-semibold">
              Better upload experience
              <span className="text-red-600"> for Youtubers.</span>
            </p>
            <p className="text-md text-muted-foreground">
              Content creators deserve a hassle-free YouTube experience.
              That&apos;s why i made Flixr, the smarter way to automate your
              uploads. From approval to publication, we&apos;ve got you covered.
            </p>
            <div className="flex justify-center md:justify-start items-center">
              <Button className="w-full md:w-1/4" asChild>
                <Link href="/dashboard">Try it out</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <FaYoutube className="w-4/6 h-4/6 dark:text-primary text-red-500" />
          </div>
        </div>
      </div>
      <footer className="flex flex-col items-center gap-4 text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} {DEVELOPER_NAME}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm hover:underline text-muted-foreground text-center"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-row gap-8">
          <Link href={"https://github.com/nilu2039/"} target="_blank">
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/nilanjan-mandal-a825961bb/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
        </div>
      </footer>
    </div>
  );
}
