"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation } from "react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const EditorLogin = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const editorLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        return await api.post("/auth/login-editor", values);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.data.success) {
        router.push("/dashboard");
        router.refresh();
      }
    },
    onError: (error) => {
      //@ts-ignore
      const errorMessage = error?.response?.data?.error?.message;
      toast.error(errorMessage, { richColors: true });
      router.push("/login");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    editorLoginMutation.mutate(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <KeyRound className="mr-2 h-4 w-4 text-primary-foreground" />
          Login as Editor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[65%] md:max-w-[55%] lg:max-w-[35%]">
        <DialogHeader>
          <DialogTitle>Login as an editor</DialogTitle>
          <DialogDescription>
            Enter username and password to login as an editor.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username or email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={editorLoginMutation.isLoading}
              loading={editorLoginMutation.isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditorLogin;
