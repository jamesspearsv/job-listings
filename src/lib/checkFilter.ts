import { filterType } from '../types/filters';
import { JobListingType } from '../types/jobs';

export function checkFilter(filters: filterType, job: JobListingType) {
  const { role, level, languages, tools } = filters;

  let passes = true;

  // check filtering conditions and update passes if needed
  // hack : there should be a better way to check this
  if (role.length > 0) {
    if (!role.includes(job.role)) passes = false;
  }

  if (level.length > 0) {
    if (!level.includes(job.level)) passes = false;
  }

  if (languages.length > 0) {
    if (!job.languages.some((value) => languages.includes(value)))
      passes = false;
  }

  if (tools.length > 0) {
    if (!job.tools.some((value) => tools.includes(value))) passes = false;
  }

  return passes;
}
