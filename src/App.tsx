import { useEffect, useState } from 'react';
import { JobsResponseType } from './types/jobs';
import styles from './App.module.css';
import JobListing from './component/JobListing';
import Filters from './component/Filters';
import { filterUpdater } from './types/filters';

function App() {
  const [jobs, setJobs] = useState<JobsResponseType | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

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

  const updateFilters: filterUpdater = (action, value) => {
    if (action === 'add') {
      const newFilter = [...filters];
      if (value && !filters.includes(value)) {
        newFilter.push(value);
        setFilters(newFilter);
      }
    }

    if (action === 'remove') {
      if (value && filters.includes(value)) {
        const newFilter = filters.filter((filter) => filter !== value);
        setFilters(newFilter);
      }
    }

    if (action === 'clear') {
      setFilters([]);
    }
  };

  return (
    <>
      <header className={styles.header}></header>
      {filters.length > 0 && (
        <Filters filters={filters} updateFilters={updateFilters} />
      )}
      {/* todo: dynamically adjust main margin based on if filters are rendered */}
      <main className={styles.main}>
        {jobs &&
          jobs.map((job, index) => (
            <JobListing key={index} job={job} updateFilter={updateFilters} />
          ))}
      </main>
    </>
  );
}

export default App;
