import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

// ================= //
// Form insert Value Schema //
// ================= //
// All column tables in the database that we will work with in the Form
// slug             String
// companyLogo      ?????????? not included yet in database
// companyLogoUrl   String?
// approved         Boolean  @default(false)
const requiredString = z.string().min(2, "Required"); // For string Filed
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number"); // for Number
// ***********************
// checked if Email || URL for application are used
const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine(
    // we use the refine her not in the end of z.object because we want to receive message error after check this Schema not all the z.object is checked
    (data) => data.applicationEmail || data.applicationUrl,
    {
      message: "Email or url is required",
      path: ["applicationEmail"],
    },
  );
// ***********************
// checked if locationType location are used
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    // we use the refine her not in the end of z.object because we want to receive message error after check this Schema not all the z.object is checked
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );
// ***********************
// for checked file insert
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    // check if the upload & the File type is Image
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image file")
  .refine((file) => {
    // check the File size not biggest than 2MB
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");
// for checked file insert
// ***********************
export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);
// zod help to make type from schema to typescript 😄 🏆
export type CreateJobValues = z.infer<typeof createJobSchema>;
// ================= //
// Form insert Value Schema //
// ================= //
// Job Filter Schema for Search //
// ================= //
export const jobFilterSchema = z.object({
  searchInput: z.string().optional(), // .optional() = it could be undefined
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
// zod help to make type from schema to typescript 😄 🏆
export type JobFilterValue = z.infer<typeof jobFilterSchema>;
// ================= //
// Job Filter Schema for Search //
// ================= //
