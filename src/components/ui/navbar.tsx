import React from "react";
import { cn } from "@/utils/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "./dialog";
import TeamList from "./team-list";

const Navbar = () => {
  return (
    <div className="border-b overflow-hidden">
      <nav
        className={cn("flex items-center justify-between py-4 px-6")}
        // {...props}
      >
        <TeamList />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </nav>
    </div>
  );
};

export default Navbar;
