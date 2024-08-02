import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BaseUserType } from "@/hooks/useAuth";
import { useLogout } from "@/mutations/auth.mutations";
import { getInitials } from "@/utils/generic";
import { cn } from "@/utils/ui";
import { startCase } from "lodash";
import { Upload } from "lucide-react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import TeamList from "../team-list";
import { ThemeToggle } from "../theme-toggle";
const UploadDialog = dynamic(() => import("@/components/upload-dialog"), {
  ssr: false,
});

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type Props = {
  profileUrlImage?: string;
  editors?: BaseUserType[];
  ytChannelName?: string;
} & Omit<BaseUserType, "verified">;

const Navbar: FC<Props> = ({
  id,
  name,
  role,
  profileUrlImage,
  editors,
  ytChannelName,
}) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const { logoutMutation } = useLogout();
  return (
    <div className="border-b overflow-hidden">
      <nav
        className={cn(
          "flex flex-row items-center gap-4 lg:gap-0 justify-between py-4 px-6"
        )}
      >
        {role === "admin" ? (
          <div className="flex flex-col md:flex-row items-center gap-2 justify-between md:justify-start">
            <TeamList
              id={id}
              name={name}
              role={role}
              profileUrlImage={profileUrlImage}
              editors={editors}
            />
            <p className="text-2xl hidden md:block">•</p>
            <p className="text-sm text-gray-400">{ytChannelName}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-2 justify-between md:justify-start">
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-2xl hidden md:block">•</p>
            <p className="text-base text-gray-400">{ytChannelName}</p>
          </div>
        )}
        <div className="flex flex-row gap-6 md:gap-7 items-center">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenUploadDialog(true)}
          >
            <Upload className="w-6 h-6 text-foreground" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={profileUrlImage} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {startCase(role)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="cursor-pointer">
                <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UploadDialog
          open={openUploadDialog}
          onSuccessfulCreate={() => setOpenUploadDialog(false)}
          onOpenChange={setOpenUploadDialog}
        />
      </nav>
    </div>
  );
};

export default Navbar;
