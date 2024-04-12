import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResult";
import { JobFilterValue } from "@/lib/validation";
import { Metadata } from "next";

// interface for data that transfer in the page from FORM
interface PageProps {
  searchParams: {
    searchInput?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

// generate dynamic header
const getTitle = ({ searchInput, type, location, remote }: JobFilterValue) => {
  const titleJob = searchInput
    ? `${searchInput} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleLocation = location ? ` in ${location}` : "";

  return `${titleJob}${titleLocation}`;
};
// to export Metadata
export function generateMetadata({
  searchParams: { searchInput, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      searchInput,
      type,
      location,
      remote: remote === "true",
    })} |  Job Blog`,
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
        <h1 className="H1">{getTitle(filterValues)}</h1>
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
