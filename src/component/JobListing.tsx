import { filterUpdater } from '../types/filters';
import { JobListingType } from '../types/jobs';
import styles from './JobListing.module.css';

type JobListingProps = {
  job: JobListingType;
  updateFilter: filterUpdater;
};

export default function JobListing({ job, updateFilter }: JobListingProps) {
  return (
    <div
      className={`${styles.listingContainer} ${
        job.new || job.featured ? styles.accented : ''
      }`}
    >
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
      <div className={styles.filters}>
        <div onClick={() => updateFilter('add', 'role', job.role)}>
          {job.role}
        </div>
        <div onClick={() => updateFilter('add', 'level', job.level)}>
          {job.level}
        </div>
        {job.languages.map((language, index) => (
          <div
            key={index}
            onClick={() => updateFilter('add', 'languages', language)}
          >
            {language}
          </div>
        ))}
        {job.tools.map((tool, index) => (
          <div key={index} onClick={() => updateFilter('add', 'tools', tool)}>
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}
