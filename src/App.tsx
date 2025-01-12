import { useEffect, useState } from 'react';
import { JobsResponseType } from './types/jobs';
import styles from './App.module.css';
import JobListing from './component/JobListing';

function App() {
  const [jobs, setJobs] = useState<JobsResponseType | null>(null);

  // simulate fetching job listing data from an api
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchJobs() {
      // simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));

      // get json data using fetch
      try {
        const res = await fetch('/data.json', { signal });
        if (!res.ok) throw new Error('Response not ok');

        const json = await res.json();
        setJobs(json);
      } catch (error) {
        console.error('Error fetching jobs: ', error);
      }
    }

    fetchJobs();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <header className={styles.header}></header>
      <main>{jobs && jobs.map((job, index) => <JobListing job={job} />)}</main>
    </>
  );
}

export default App;
