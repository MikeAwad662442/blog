import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";

const Home = async () => {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="H1">Developer Job</h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <div className="grow space-y-4">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
