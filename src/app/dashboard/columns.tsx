"use client";

import {
  RoleBadge,
  UploadStatusBadge,
  VideoStatusBadge,
  YoutubeUploadStatusBadge,
} from "@/components/upload-badge";
import VideoActions from "@/components/video-actions";
import { Video } from "@/hooks/useAllVideos";
import { byteToMb } from "@/utils/file-size";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "uploader",
    header: "Uploader",
    cell: ({ row }) => {
      const uploader = row.original.uploader;
      return (
        <div className="flex flex-row gap-2">
          <p>{uploader.name}</p>
          <RoleBadge role={uploader.role} />
        </div>
      );
    },
  },
  {
    accessorKey: "fileSize",
    header: "File Size",
    cell: ({ row }) => {
      const video = row.original;
      return (
        <span>{video.fileSize ? `${byteToMb(video.fileSize)}MB` : "NA"}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Accepted",
    cell: ({ row }) => {
      const video = row.original;
      return <VideoStatusBadge status={video.status} />;
    },
  },
  {
    accessorKey: "uploadStatus",
    header: "Upload Status",
    cell: ({ row }) => {
      const video = row.original;
      return <UploadStatusBadge status={video.uploadStatus} />;
    },
  },
  {
    accessorKey: "uploadedToYoutube",
    header: "Youtube Upload Status",
    cell: ({ row }) => {
      const video = row.original;
      return <YoutubeUploadStatusBadge status={video.youtubeUploadStatus} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <VideoActions row={row.original} />;
    },
  },
];
