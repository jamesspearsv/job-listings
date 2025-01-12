export type JobListingType = {
  id: number;
  company: string;
  logo: string; // image url string
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

export type JobsResponseType = JobListingType[];
