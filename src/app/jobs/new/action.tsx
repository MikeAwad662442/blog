"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { fileDB } from "@/middleware/UploadFile/UpFiles";
import { number } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

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

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;
  // stander Console.log
  // console.log("formData:", formData);
  // console.log("logo:", logo);
  // console.log("values:", values);
  const ImageFullType = companyLogo?.type.split("/");
  const ImageType = ImageFullType?.shift();
  // console.log(ImageType);
  const IMG = await fileDB(companyLogo?.name, companyLogo, ImageType);
  // const file: File | null = values.companyLogo as unknown as File;
  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);
  // console.log(buffer);
  // const path = `./public/gallery/${file.name}`;
  // await writeFile(path, buffer);
};
