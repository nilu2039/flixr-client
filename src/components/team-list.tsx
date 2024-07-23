"use client";

import { BaseUserType } from "@/hooks/useAuth";
import useEditorStore from "@/store/useEditorStore";
import { getInitials } from "@/utils/generic";
import { cn } from "@/utils/ui";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import React, { FC, useState } from "react";
import CreateEditorDialog from "./create-editor-dialog";
import ShowCredentialsDialog from "./show-credentials-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  profileUrlImage?: string;
  editors?: BaseUserType[];
} & Omit<BaseUserType, "verified">;

const TeamList: FC<Props> = ({ id, name, role, profileUrlImage, editors }) => {
  const [open, setOpen] = React.useState(false);
  const { setEditor } = useEditorStore();

  const [editorCredentials, setEditorCredentials] = useState<{
    username: string;
    password: string;
  } | null>();
  const [showCreateEditorDialog, setShowCreateEditorDialog] =
    React.useState(false);
  const [showEditorCredentials, setShowEditorCredentials] = useState(false);

  const groups = {
    admin: {
      id,
      name,
      role,
      profileUrlImage,
    },
    editors: editors && editors?.length > 0 ? editors : [],
  };

  type SelectedUser = {
    id: number;
    name: string;
    role: string;
    profileUrlImage?: string;
    verified?: boolean;
  };

  const [selectedUser, setSelectedUser] = React.useState<SelectedUser>(
    groups.admin
  );

  return (
    <>
      <Dialog
        open={showCreateEditorDialog}
        onOpenChange={setShowCreateEditorDialog}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select editors"
              className={cn("gap-2 justify-between")}
            >
              <Avatar className="h-8 w-8 p-1">
                <AvatarImage
                  src={profileUrlImage}
                  alt={name ?? ""}
                  className="grayscale"
                />
                <AvatarFallback>
                  {getInitials(selectedUser.name)}
                </AvatarFallback>
              </Avatar>
              {selectedUser.name}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 text-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="base:w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[16vw] p-0">
            <Command>
              <CommandList>
                <CommandGroup heading={"Admin"}>
                  <CommandItem
                    className="text-sm"
                    onSelect={() => {
                      setSelectedUser(groups.admin);
                      setEditor(null);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex fle-row items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage
                            alt={groups.admin.name}
                            className="grayscale"
                          />
                          <AvatarFallback>
                            {getInitials(groups.admin.name)}
                          </AvatarFallback>
                        </Avatar>
                        {groups.admin.name}
                      </div>
                      {selectedUser.id === groups.admin.id ? (
                        <Check className="w-4 h-4 text-muted-foreground" />
                      ) : null}
                    </div>
                  </CommandItem>
                </CommandGroup>
                <CommandEmpty>No editors found.</CommandEmpty>
                <CommandGroup heading={"Editors"}>
                  {groups.editors.map((editor) => (
                    <CommandItem
                      key={editor.id}
                      className="text-sm"
                      onSelect={() => {
                        setSelectedUser(editor);
                        setEditor(editor);
                        setOpen(false);
                      }}
                    >
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex fle-row items-center">
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage
                              alt={editor.name}
                              className="grayscale"
                            />
                            <AvatarFallback>
                              {getInitials(editor.name)}
                            </AvatarFallback>
                          </Avatar>
                          {editor.name}
                        </div>
                        {selectedUser.id === editor.id ? (
                          <Check className="w-4 h-4 text-muted-foreground" />
                        ) : null}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        setShowCreateEditorDialog(true);
                      }}
                    >
                      <CirclePlus className="mr-2 w-5 h-5 text-foreground" />
                      Create Editor
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <CreateEditorDialog
          onSuccessfulCreate={(editor) => {
            setShowCreateEditorDialog(false);
            setOpen(false);
            setEditorCredentials(editor);
            setShowEditorCredentials(true);
          }}
          onCancel={() => setShowCreateEditorDialog(false)}
        />
      </Dialog>
      {editorCredentials ? (
        <Dialog
          open={showEditorCredentials}
          onOpenChange={setShowEditorCredentials}
        >
          <ShowCredentialsDialog {...editorCredentials} />
        </Dialog>
      ) : null}
    </>
  );
};

export default TeamList;
