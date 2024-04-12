import React from "react";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { JobFilterValue } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filterValues: JobFilterValue;
}

const JobResult = async ({
  filterValues: { searchInput, type, location, remote },
}: JobResultProps) => {
  // to control Search result
  const searchString = searchInput
    ?.split(" ")
    .filter((e) => e.length > 0)
    .join(" & ");

  // to make that search in multiple fields
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { companyName: { contains: searchString } },
          { type: { contains: searchString } },
          { locationType: { contains: searchString } },
          { location: { contains: searchString } },
        ],
      }
    : {};
  // The values to be searched for
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
};

export default JobResult;

/**************
 * Notes
 * search?.split(" ").filter( e => e.length > 0).join(" & ")
 * search?  if value not empty
 * .split(" ") to split all words in Search input
 * .filter( e => e.length > 0) to remove all extra spaces
 * .join(" & ") build new array value split with &
 */
