"use client";

import { Button } from "@/components/ui/button";
import {
  RoleBadge,
  UploadStatusBadge,
  VideoStatusBadge,
  YoutubeUploadStatusBadge,
} from "@/components/upload-badge";
import VideoActions from "@/components/video-actions";
import { Video } from "@/hooks/useVideo";
import { byteToMb } from "@/utils/file-size";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

export const dashboardColumns: ColumnDef<Video>[] = [
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
    id: "view",
    enableHiding: false,
    cell: ({ row }) => {
      const videoId = row.original.videoId;
      return (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/video/${videoId}`}>
            <Eye className="w-5 h-5" />
          </Link>
        </Button>
      );
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
