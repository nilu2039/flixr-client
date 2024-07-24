"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useResetPassword } from "@/mutations/auth.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(8),
});

const ResetPassword = () => {
  const { passwordResetMutation } = useResetPassword(formSchema);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    passwordResetMutation.mutate(values);
    console.log(values);
  };
  if (passwordResetMutation.isSuccess) {
    router.replace("/dashboard");
  }
  return (
    <Card className="w-[100%] sm:w-[80%] md:w-[50%] lg:w-[33%]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Please reset your password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button type="submit">Reset Password</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
