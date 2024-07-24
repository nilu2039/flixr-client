import { first } from "lodash";

export const getInitials = (name?: string | null, length = 2) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => first(word.toUpperCase()))
    .join("")
    .slice(0, length);
};
