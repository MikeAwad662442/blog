import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

// Post database
const FilterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries()); // transfer FormatData to Object
  const { search, type, location, remote } = jobFilterSchema.parse(values); // to check entry data with Zod
  const searchParams = new URLSearchParams({
    // ...( if defined then send data )
    ...(search && { search: search.trim() }), // .trim() To remove whitespace from both ends
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  // to send post in url link
  redirect(`/?${searchParams.toString()}`);
  // console.log(formData);
};
// Post database
// *************
// Import Data from database
const JobFilterSidebar = async (formData: FormData) => {
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
      <form action={FilterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              name="search"
              placeholder="Title, Company, etc..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">type</Label>
            <Select id="type" name="type" defaultValue="">
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
            <Select id="location" name="location" defaultValue="">
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
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            find my jobs
          </Button>
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
