import { first } from "lodash";

export const getInitials = (name?: string | null) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => first(word.toUpperCase()))
    .join("");
};
