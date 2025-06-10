import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../features/products/productsSlice';
import styles from './CategoryFilter.module.css';

export const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(state => state.products);

  return (
    <div className={styles.filterContainer}>
      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className={styles.select}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};