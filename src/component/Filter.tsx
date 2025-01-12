import RemoveIcon from '../assets/icon-remove.svg?react';
import styles from './Filter.module.css';

type FilterProps = {
  filter: string;
};

// todo: add filter removing functionality

export default function Filter({ filter }: FilterProps) {
  return (
    <div className={styles.filterContainer}>
      <p>{filter}</p>
      <button className={styles.button} aria-label="Remove filter">
        <RemoveIcon />
      </button>
    </div>
  );
}
