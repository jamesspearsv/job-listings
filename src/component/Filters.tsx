import Filter from './Filter';
import styles from './Filters.module.css';

// todo: add filter clearing functionality

export default function Filters() {
  const filters = ['react', 'frontend', 'JavaScript'];

  return (
    <div className={styles.filtersContainer}>
      {filters.map((filter, index) => {
        return <Filter key={index} filter={filter} />;
      })}
      <button>Clear</button>
    </div>
  );
}
