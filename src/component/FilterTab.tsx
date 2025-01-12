import RemoveIcon from '../assets/icon-remove.svg?react';
import { filterUpdater } from '../types/filters';
import styles from './FilterTab.module.css';

type FilterTabProps = {
  filter: string;
  updateFilter: filterUpdater;
};

// todo: add filter removing functionality

export default function FilterTab({ filter, updateFilter }: FilterTabProps) {
  return (
    <div className={styles.filterContainer}>
      <p>{filter}</p>
      <button
        className={styles.button}
        aria-label="Remove filter"
        onClick={() => updateFilter('remove', filter)}
      >
        <RemoveIcon />
      </button>
    </div>
  );
}
