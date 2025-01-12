import { filterType, filterUpdater } from '../types/filters';
import FilterTab from './FilterTab';
import styles from './Filters.module.css';

type FiltersProps = {
  filters: filterType;
  updateFilters: filterUpdater;
};

export default function Filters({ filters, updateFilters }: FiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      {Object.keys(filters).map((key) => {
        if (key === 'active') {
          return null;
        } else {
          return filters[key as keyof Omit<filterType, 'active'>].map(
            (value: string, index: number) => {
              return (
                <FilterTab
                  key={index}
                  filterValue={value}
                  filterRole={key as keyof Omit<filterType, 'active'>}
                  updateFilter={updateFilters}
                />
              );
            }
          );
        }
      })}
      <button className={styles.clear} onClick={() => updateFilters('clear')}>
        Clear
      </button>
    </div>
  );
}
