"use server";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { fileDB } from "@/middleware/UploadFile/UpFiles";
import { redirect } from "next/navigation";
export interface Logo {
  size: number;
  type: string;
  name: string;
  lastModified?: any;
}
// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing, multer will handle it
//   },
// };
export const createJobPosting = async (formData: FormData) => {
  //  to return data from FormData to Object
  const values = Object.fromEntries(formData.entries());
  // to check if all Values Are Valid
  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);
  // the Link to the Job
  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;
  // ========================= //
  // to Upload Images to Local storage
  const ImageFullType = companyLogo?.type.split("/"); // get image type
  const ImageType = ImageFullType?.shift();
  // upload image
  await fileDB(companyLogo?.name, companyLogo, ImageType)
    .then((result) => {
      companyLogoUrl = result;
    })
    .catch((err) => {});
  // ========================= //
  // Create a new row in the job table
  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      // approved: true, // in the project, the approval for new jobs comes from the admin
    },
  });

  redirect("/job-submitted");
};
