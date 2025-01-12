import { JobListingType } from '../types/jobs';
import styles from './JobListing.module.css';

type JobListingProps = {
  job: JobListingType;
};

export default function JobListing({ job }: JobListingProps) {
  return (
    <div className={styles.listingContainer}>
      <img src={job.logo} alt={`${job.company} logo`} />
      <div className={styles.jobInfo}>
        <div>
          <p>{job.company}</p>
          {job.new && <p>new</p>}
          {job.featured && <p>featured</p>}
        </div>
        <div>
          <h3>{job.position}</h3>
        </div>
        <div>
          <p>{job.postedAt}</p>
          <p>{job.contract}</p>
          <p>{job.location}</p>
        </div>
      </div>
      <div className={styles.filters}>
        <div>{job.role}</div>
        <div>{job.level}</div>
        {job.languages.map((language, index) => (
          <div key={index}>{language}</div>
        ))}
        {job.tools.map((tool, index) => (
          <div key={index}>{tool}</div>
        ))}
      </div>
    </div>
  );
}
