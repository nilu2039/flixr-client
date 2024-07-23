import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BaseUserType } from "@/hooks/useAuth";
import { getInitials } from "@/utils/generic";
import { cn } from "@/utils/ui";
import { startCase } from "lodash";
import { Upload } from "lucide-react";
import { FC, useState } from "react";
import TeamList from "../team-list";
import UploadDialog from "../upload-dialog";
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
import { useLogout } from "@/mutations/auth.mutations";

type Props = {
  profileUrlImage?: string;
  editors?: BaseUserType[];
} & Omit<BaseUserType, "verified">;

const Navbar: FC<Props> = ({ id, name, role, profileUrlImage, editors }) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const { logoutMutation } = useLogout();
  return (
    <div className="border-b overflow-hidden">
      <nav className={cn("flex items-center justify-between py-4 px-6")}>
        {role === "admin" ? (
          <>
            <TeamList
              id={id}
              name={name}
              role={role}
              profileUrlImage={profileUrlImage}
              editors={editors}
            />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-lg">{name}</p>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        )}
        <div className="flex flex-row gap-10 items-center">
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
