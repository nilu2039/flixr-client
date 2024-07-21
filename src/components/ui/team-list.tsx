"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/utils/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { ArrowDownUp, ChevronsUpDown } from "lucide-react";

const EDITORS: {
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: "John Doe",
  },
];

const TeamList = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("gap-2 justify-between")}
        >
          <Avatar className="h-8 w-8 p-1">
            <AvatarImage
              // src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              alt={"selectedTeam.label"}
              className="grayscale"
            />
            <AvatarFallback>NM</AvatarFallback>
          </Avatar>
          {"Nilanjan Mandal"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No editors found.</CommandEmpty>
            {EDITORS.map((editor) => (
              <CommandGroup key={editor.id} heading={"Editors"}>
                <CommandItem key={editor.name} className="text-sm">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage alt={editor.name} className="grayscale" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {editor.name}
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TeamList;
