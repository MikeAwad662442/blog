"use server";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteIMG } from "@/middleware/UploadFile/UpFiles";

type FormState = { error?: string } | undefined;
// to approve New Job
export const approveSubmission = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    // ************** //
    // If User not admin
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }
    // ************** //
    // Update Job data by approved || Not
    await prisma.job.update({
      where: { id: jobId },
      data: { approved: true },
    });
    revalidatePath("/"); // to refresh the Page
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
// to Delete Job & not have approve
export const deleteJob = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    // ************** //
    // If User not admin
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }
    // ************** //
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogoUrl) {
      await DeleteIMG(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/dashboard");
};
