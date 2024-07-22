import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/ui";
import TeamList from "../team-list";
import { FC, useState } from "react";
import { getInitials } from "@/utils/generic";
import { BaseUserType } from "@/hooks/useAuth";
import { Upload } from "lucide-react";
import { Button } from "./button";
import UploadDialog from "../upload-dialog";

type Props = {
  profileUrlImage?: string;
  editors?: BaseUserType[];
} & Omit<BaseUserType, "verified">;

const Navbar: FC<Props> = ({ id, name, role, profileUrlImage, editors }) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
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
          <Avatar>
            <AvatarImage src={profileUrlImage} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
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
