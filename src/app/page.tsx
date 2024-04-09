import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";

const Home = async () => {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </main>
  );
};

export default Home;
