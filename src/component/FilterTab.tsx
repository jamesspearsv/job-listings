import RemoveIcon from '../assets/icon-remove.svg?react';
import { filterType, filterUpdater } from '../types/filters';
import styles from './FilterTab.module.css';

type FilterTabProps = {
  filterValue: string;
  filterRole: keyof Omit<filterType, 'active'>;
  updateFilter: filterUpdater;
};

export default function FilterTab({
  filterValue,
  filterRole,
  updateFilter,
}: FilterTabProps) {
  return (
    <div className={styles.filterContainer}>
      <p>{filterValue}</p>
      <button
        className={styles.button}
        aria-label="Remove filter"
        onClick={() =>
          updateFilter(
            'remove',
            filterRole as keyof Omit<filterType, 'active'>,
            filterValue
          )
        }
      >
        <RemoveIcon />
      </button>
    </div>
  );
}
