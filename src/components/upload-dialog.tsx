import api from "@/lib/api";
import { errorSchema } from "@/schema/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clapperboard, Upload, X } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const getPresignedUrlResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      uploadUrl: z.string(),
      videoId: z.string(),
    })
    .optional(),
  error: errorSchema.optional(),
});

const getPresignedUrlPayloadSchema = formSchema.extend({
  contentType: z.string(),
});

type Props = {
  open: boolean;
  onSuccessfulCreate?: () => void;
  onOpenChange?: (open: boolean) => void;
};

const UploadDialog: FC<Props> = ({
  onSuccessfulCreate = () => {},
  open,
  onOpenChange = () => {},
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const updateVideoUploadStatus = useMutation({
    mutationKey: ["updateVideoUploadStatus"],
    mutationFn: async (values: {
      videoId: string;
      status: "pending" | "failed";
    }) => {
      try {
        const { data } = await api.post("/update-video-upload-status", values);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all_videos"]);
    },
  });

  const getPresignedUrlMutation = useMutation({
    mutationKey: ["getPresignedUrl"],
    mutationFn: async (
      values: z.infer<typeof getPresignedUrlPayloadSchema>
    ) => {
      try {
        const { data } = await api.post("/get-upload-presigned-url", values);
        const res = getPresignedUrlResponseSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (values) => {
      const uploadUrl = values.data?.data?.uploadUrl;
      if (!uploadUrl) {
        toast.error("Failed to get upload", { richColors: true });
        return;
      }
      const videoId = values.data?.data?.videoId;

      if (!videoId) {
        toast.error("Failed to get upload", { richColors: true });
        return;
      }

      await updateVideoUploadStatus.mutateAsync({
        videoId,
        status: "pending",
      });

      onSuccessfulCreate();

      toast.promise(
        fetch(uploadUrl, {
          method: "PUT",
          body: plainFiles[0],
        }),
        {
          loading: "Uploading video, don't refresh or close the tab.",
          success: () => {
            queryClient.invalidateQueries(["all_videos"]);
            return "Video uploaded successfully";
          },
          error: () => {
            updateVideoUploadStatus.mutate({
              videoId,
              status: "failed",
            });
            return "Failed to upload video";
          },
          richColors: true,
        }
      );
    },
    onError: (error) => {
      toast.error("Failed to get upload", { richColors: true });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (plainFiles.length === 0) {
      toast.error("Please upload video file.", { richColors: true });
      return;
    }
    getPresignedUrlMutation.mutate({
      title: values.title,
      description: values.description,
      contentType: plainFiles[0].type,
    });
  }
  const { openFilePicker, plainFiles, clear } = useFilePicker({
    accept: "video/*",
    multiple: false,
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">Upload video</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Top 10 projects.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Video description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={openFilePicker}
              className="flex border-dashed border-4 p-10 rounded-xl items-center justify-center cursor-pointer relative"
            >
              {plainFiles.length === 0 ? (
                <Upload className="w-20 h-20 text-foreground" />
              ) : (
                <div className="flex flex-row gap-4 items-center">
                  <X
                    className="w-6 h-6 text-foreground absolute top-2 right-2"
                    onClick={clear}
                  />
                  <Clapperboard className="w-20 h-20 text-foreground" />
                  {plainFiles.map((file, index) => (
                    <div key={index}>
                      <p className="text-foreground font-semibold">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div></div>
            <Button
              type="submit"
              className="mx-auto flex"
              disabled={getPresignedUrlMutation.isLoading}
              loading={getPresignedUrlMutation.isLoading}
            >
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
