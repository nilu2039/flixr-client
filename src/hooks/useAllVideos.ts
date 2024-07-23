import { useQuery } from "react-query";
import api from "@/lib/api";
import { z } from "zod";
import { error } from "console";
import { errorSchema } from "@/schema/global";
import useEditorStore from "@/store/useEditorStore";
import { baseVideoSchema } from "./useVideo";

const videoSchema = z.object({
  success: z.boolean(),
  data: z.array(baseVideoSchema),
  error: errorSchema.optional(),
});

const useAllVideos = () => {
  const { editor } = useEditorStore();
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all_videos", editor?.id],
    queryFn: async () => {
      try {
        const { data } = await api.get(
          `/get-all-videos?editorId=${editor?.id ?? ""}`
        );
        const res = videoSchema.safeParse(data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    videos,
    isLoading,
    isError,
    error,
  };
};

export default useAllVideos;
