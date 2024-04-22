// create dynamic page
import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// interface for Props in this page
interface PageProps {
  params: { slug: string };
}
// We use const to get the value from the database once even if we use it in two different places
const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });
  if (!job) notFound(); // if the name of job (slug) not found it will be return 404 page
  return job;
});
// generate page Metadata dynamically
export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
};
const page = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        {/* <Button asChild>
            <a href={applicationLink} className="w-40 md:w-fit">
              Apply now
            </a>
          </Button> */}
      </aside>
    </main>
  );
};
export default page;
