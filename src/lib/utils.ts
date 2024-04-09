import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns"; // style Date

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

export { FormatMony, relativeDate };
