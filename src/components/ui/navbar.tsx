import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/ui";
import TeamList from "../team-list";
import { FC } from "react";
import { getInitials } from "@/utils/generic";
import { BaseUserType } from "@/hooks/useAuth";

type Props = {
  profileUrlImage?: string;
  editors?: BaseUserType[];
} & Omit<BaseUserType, "verified">;

const Navbar: FC<Props> = ({ id, name, role, profileUrlImage, editors }) => {
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

        <Avatar>
          <AvatarImage src={profileUrlImage} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </nav>
    </div>
  );
};

export default Navbar;
