import { filterUpdater } from '../types/filters';
import FilterTab from './FilterTab';
import styles from './Filters.module.css';

// todo: add filter clearing functionality

type FiltersProps = {
  filters: string[];
  updateFilters: filterUpdater;
};

export default function Filters({ filters, updateFilters }: FiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      {filters.map((filter, index) => {
        return (
          <FilterTab key={index} filter={filter} updateFilter={updateFilters} />
        );
      })}
      <button className={styles.clear} onClick={() => updateFilters('clear')}>
        Clear
      </button>
    </div>
  );
}
