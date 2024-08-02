import { FC } from "react";
import { z } from "zod";

import api from "@/lib/api";
import { errorSchema } from "@/schema/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const createEditorSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      username: z.string(),
      password: z.string(),
      status: z.string(),
    })
    .optional(),
  error: errorSchema.optional(),
});

type Props = {
  onSuccessfulCreate?: (
    data: z.infer<typeof createEditorSchema>["data"]
  ) => void;
  onCancel?: () => void;
};

const CreateEditorDialog: FC<Props> = ({
  onSuccessfulCreate = () => {},
  onCancel = () => {},
}) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createEditorMutation = useMutation({
    mutationKey: ["createEditor"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const { data } = await api.post("/create-editor", values);
        const res = createEditorSchema.safeParse(data);
        if (!res.success) throw new Error(res.error.message);
        return res;
      } catch (error) {
        //@ts-ignore
        const msg = error?.response?.data?.error?.message;
        if (msg === "Email already exists") {
          toast.error("Email already exists", { richColors: true });
        }
        throw error;
      }
    },
    onSuccess: (values) => {
      onSuccessfulCreate(values.data.data);
      queryClient.invalidateQueries(["auth_users"]);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createEditorMutation.mutate(values);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new editor</DialogTitle>
        <DialogDescription>Enter editor name</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-4 py-2 pb-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createEditorMutation.isLoading}
              loading={createEditorMutation.isLoading}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateEditorDialog;
