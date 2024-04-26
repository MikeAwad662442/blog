import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns"; // style Date
// clerk
import { User } from "@clerk/nextjs/server"; // fetch user in frontend
import { UserResource } from "@clerk/types"; // fetch user in backend

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// To style Mony Format
const FormatMony = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// to style Time info
const relativeDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};

// For link of the job
const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-") // to remove all spaces from link
    .replace(/[^\w-]+/g, "");
};
// add row to clerk for be now work on Dashboard except admin
const isAdmin = (user: UserResource | User) => {
  return user.publicMetadata?.role === "admin";
};
export { FormatMony, relativeDate, toSlug, isAdmin };
