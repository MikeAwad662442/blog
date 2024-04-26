import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import Link from "next/link";

const DashboardPage = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <h1 className="H1 text-center">Admin Dashboard</h1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link
            key={job.id}
            href={`/dashboard/jobs/${job.slug}`}
            className="block"
          >
            <JobListItem job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
