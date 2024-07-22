"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditorLogin from "@/components/editor-login";
import { googleLogin } from "@/utils/auth";

const Login = () => {
  return (
    <div className="container flex justify-center items-center w-screen h-dvh">
      <Card className="w-[100%] sm:w-[80%] md:w-[50%] lg:w-[33%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login either as an admin or an editor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={googleLogin}>
              <FcGoogle className="mr-2 h-4 w-4" /> Login as Admin
            </Button>

            <EditorLogin />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
