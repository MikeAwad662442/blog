import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResult";
import { JobFilterValue } from "@/lib/validation";

// interface for data that transfer in the page from FORM
interface PageProps {
  searchParams: {
    searchInput?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}
const Home = async ({
  searchParams: { searchInput, type, location, remote },
}: PageProps) => {
  const filterValues: JobFilterValue = {
    searchInput,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="H1">Developer Job</h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValue={filterValues} />
        <JobResult filterValues={filterValues} />
      </section>
    </main>
  );
};

export default Home;
