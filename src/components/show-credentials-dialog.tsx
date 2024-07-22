"use client";

import { Check, Clipboard } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { FC, useState } from "react";

const CopyInput = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <Label htmlFor="username">{label}</Label>
      <div className="bg-secondary p-2 rounded-md flex flex-row items-center justify-between">
        <p id="username" className="text-muted-foreground">
          {value}
        </p>
        {!copied ? (
          <Clipboard
            onClick={async () => {
              navigator.clipboard.writeText(value).then(() => setCopied(true));
            }}
            className="text-muted-foreground w-4 h-4 cursor-pointer"
          />
        ) : (
          <Check className="text-muted-foreground w-4 h-4 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

type Props = {
  username: string;
  password: string;
};

const ShowCredentialsDialog: FC<Props> = ({ username, password }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editor credentials</DialogTitle>
        <DialogDescription>
          Save and share the credentials with your editor.
        </DialogDescription>
        <div className="flex gap-2 flex-col">
          <CopyInput label="Username" value={username} />
          <CopyInput label="Password" value={password} />
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default ShowCredentialsDialog;
