import { JobListingType } from '../types/jobs';
import styles from './JobListing.module.css';

type JobListingProps = {
  job: JobListingType;
};

export default function JobListing({ job }: JobListingProps) {
  return (
    <div className={styles.listingContainer}>
      <div className={styles.logo}>
        <img src={job.logo} alt={`${job.company} logo`} />
      </div>
      <div className={styles.jobInfo}>
        <div className={styles.flairs}>
          <p className={styles.company}>{job.company}</p>
          {job.new && (
            <div className={`${styles.flair} ${styles.newFlair}`}>
              <p>NEW!</p>
            </div>
          )}
          {job.featured && (
            <div className={`${styles.flair} ${styles.featuredFlair}`}>
              <p>FEATURED</p>
            </div>
          )}
        </div>
        <div>
          <h2 className={styles.position}>{job.position}</h2>
        </div>
        <div className={styles.details}>
          <p>{job.postedAt}</p>
          <p>{job.contract}</p>
          <p>{job.location}</p>
        </div>
      </div>
      {/* todo: add filtering functions */}
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
