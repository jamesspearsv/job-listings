import { useEffect, useState } from 'react';
import { JobsResponseType } from './types/jobs';
import styles from './App.module.css';
import JobListing from './component/JobListing';
import Filters from './component/Filters';
import { filterUpdater, filterType } from './types/filters';
import { checkFilter } from './lib/checkFilter';

function App() {
  const [jobs, setJobs] = useState<JobsResponseType | null>(null);

  const [filters, setFilters] = useState<filterType>({
    active: false,
    role: [],
    level: [],
    languages: [],
    tools: [],
  });

  // simulate fetching job listing data from an api
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchJobs() {
      // simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));

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

  const updateFilters: filterUpdater = (action, filter, value) => {
    const newFilters = { ...filters };

    if (action === 'add' && value && filter) {
      // prevent duplicate filters
      if (filters[filter].includes(value)) return;

      newFilters[filter].push(value);
      newFilters.active = true;
      setFilters(newFilters);
    }

    if (action === 'remove' && filter && value) {
      const validFilters = Object.keys(filters);
      if (validFilters.includes(filter)) {
        // remove given filter value from respective filter
        newFilters[filter] = newFilters[filter].filter(
          (element) => element !== value
        );

        // hack: there has to be a better way to do this
        if (
          newFilters.languages.length === 0 &&
          newFilters.level.length === 0 &&
          newFilters.role.length === 0 &&
          newFilters.tools.length === 0
        ) {
          setFilters({
            active: false,
            role: [],
            level: [],
            languages: [],
            tools: [],
          });
        } else {
          setFilters(newFilters);
        }
      }
    }

    if (action === 'clear') {
      setFilters({
        active: false,
        role: [],
        level: [],
        languages: [],
        tools: [],
      });
    }
  };

  return (
    <>
      <header className={styles.header}></header>
      {filters.active && (
        <Filters filters={filters} updateFilters={updateFilters} />
      )}
      <main
        className={styles.main}
        style={filters.active ? { transform: 'translateY(3.5rem)' } : {}}
      >
        {!jobs ? (
          <div className={styles.loaderContainer}>
            <h3>Finding some awesome jobs for you...</h3>
            <div className={styles.loader}></div>
          </div>
        ) : (
          jobs.map((job, index) => {
            // early return if job does not match any of the filters
            if (filters.active && !checkFilter(filters, job)) return null;

            return (
              <JobListing key={index} job={job} updateFilter={updateFilters} />
            );
          })
        )}
      </main>
      <footer className={styles.footer}>
        <span>
          <a href="http://jspears.me">James Spears, V</a>
        </span>
        <span>|</span>
        <span>
          <a href="https://github.com/jamesspearsv/job-listings">Github</a>
        </span>
      </footer>
    </>
  );
}

export default App;
