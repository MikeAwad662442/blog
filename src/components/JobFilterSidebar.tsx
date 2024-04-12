import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { Button } from "./ui/button";
import { jobFilterSchema, JobFilterValue } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
interface JobFilterSidebarProps {
  defaultValue: JobFilterValue;
}

// Post database
const FilterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries()); // transfer FormatData to Object
  const { searchInput, type, location, remote } = jobFilterSchema.parse(values); // to check entry data with Zod
  const searchParams = new URLSearchParams({
    // ...( if defined then send data )
    ...(searchInput && { searchInput: searchInput.trim() }), // .trim() To remove whitespace from both ends
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  // to send post in url link
  redirect(`/?${searchParams.toString()}`);
};
// Post database
// *************
// Import Data from database
const JobFilterSidebar = async ({ defaultValue }: JobFilterSidebarProps) => {
  const haveLocation = (await prisma?.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then(
      (location) => location.map(({ location }) => location).filter(Boolean), // .filter(Boolean) to remove NULL value
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={FilterJobs} key={JSON.stringify(defaultValue)}>
        {/* key={JSON.stringify(defaultValue)} to restart the value in the form if link is change or go to another link  */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="searchInput">Search</Label>
            <Input
              id="searchInput"
              name="searchInput"
              placeholder="Title, Company, etc..."
              defaultValue={defaultValue.searchInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValue.type || ""}
            >
              <option value="">type fo work</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValue.location || ""}
            >
              <option value="">All Location</option>
              {haveLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValue.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
          {/* <Button type="submit" className="w-full">
            find my jobs
          </Button> */}
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;

/*****************
 * Notes To make Sidebar moving with the page we use
 * className="sticky top-0 h-fit" 💥
 */
