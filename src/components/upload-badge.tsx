import { Video } from "@/hooks/useVideo";
import { Badge, BadgeProps } from "./ui/badge";
import { cn } from "@/utils/ui";

const UploadStatusBadge = ({ status }: { status: Video["uploadStatus"] }) => {
  let badgeColor = null;
  let badgeText = null;
  switch (status) {
    case "idle":
      badgeColor = "bg-gray-500";
      badgeText = "Idle";
      break;
    case "pending":
      badgeColor = "bg-yellow-500";
      badgeText = "Pending";
      break;
    case "completed":
      badgeColor = "bg-green-500";
      badgeText = "Completed";
      break;

    case "failed":
      badgeColor = "bg-red-500";
      badgeText = "Failed";
      break;

    default:
      badgeColor = "bg-gray-500";
      badgeText = "Idle";
      break;
  }
  return <Badge className={`${badgeColor}`}>{badgeText}</Badge>;
};

const VideoStatusBadge = ({ status }: { status: Video["status"] }) => {
  let badgeColor = null;
  let badgeText = null;
  switch (status) {
    case "draft":
      badgeColor = "bg-gray-500";
      badgeText = "No Action";
      break;
    case "accepted":
      badgeColor = "bg-green-500";
      badgeText = "Accepted";
      break;
    case "rejected":
      badgeColor = "bg-red-500";
      badgeText = "Rejected";
      break;
    default:
      badgeColor = "bg-gray-500";
      badgeText = "Idle";
      break;
  }
  return <Badge className={`${badgeColor}`}>{badgeText}</Badge>;
};

const YoutubeUploadStatusBadge = ({
  status,
}: {
  status: Video["youtubeUploadStatus"];
}) => {
  let badgeColor = null;
  let badgeText = null;
  switch (status) {
    case "draft":
      badgeColor = "bg-gray-500";
      badgeText = "Not Uploaded";
      break;
    case "pending":
      badgeColor = "bg-yellow-500";
      badgeText = "Uploading";
      break;
    case "completed":
      badgeColor = "bg-green-500";
      badgeText = "Uploaded";
      break;
    case "failed":
      badgeColor = "bg-red-500";
      badgeText = "Failed";
      break;
    default:
      badgeColor = "bg-gray-500";
      badgeText = "Idle";
      break;
  }
  return <Badge className={`${badgeColor}`}>{badgeText}</Badge>;
};

const RoleBadge = ({
  role,
  className,
  ...props
}: { role: Video["uploader"]["role"] } & BadgeProps) => {
  switch (role) {
    case "admin":
      return (
        <Badge className={cn("bg-green-500", className)} {...props}>
          Admin
        </Badge>
      );
    case "editor":
      return (
        <Badge className={cn("bg-blue-500", className)} {...props}>
          Editor
        </Badge>
      );
    default:
      return (
        <Badge className={cn("bg-gray-500", className)} {...props}>
          Unknown
        </Badge>
      );
  }
};

export {
  UploadStatusBadge,
  YoutubeUploadStatusBadge,
  VideoStatusBadge,
  RoleBadge,
};
