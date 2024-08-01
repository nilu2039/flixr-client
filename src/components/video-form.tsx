import { Clapperboard, Upload, X } from "lucide-react";
import { FC } from "react";
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
import { Textarea } from "./ui/textarea";

type Props<T> = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  form: any;
  onSubmit: (values: T) => void;
  openFilePicker: () => void;
  plainFiles: File[];
  isLoading: boolean;
  clear: () => void;
  defaultTitle?: string;
  defaultDescription?: string;
};

const VideoForm = <T extends {}>({
  open,
  onOpenChange = () => {},
  form,
  onSubmit = () => {},
  openFilePicker = () => {},
  plainFiles,
  isLoading = false,
  clear = () => {},
  defaultTitle,
  defaultDescription,
}: Props<T>) => {
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
              defaultValue={defaultTitle}
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
              defaultValue={defaultDescription}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Video description..." {...field} />
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
              disabled={isLoading}
              loading={isLoading}
            >
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VideoForm;