import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { updateSort } from '../../store/filters/slice';
import type { Sort as SortType } from '../../store/filters/types';
import styles from './Sort.module.css';

const Sort = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.filters);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as SortType;

    dispatch(updateSort(value));
  };

  return (
    <form className={styles.form}>
      <legend className={styles.title}>Сортировка:</legend>
      <select
        className={styles.name}
        id="sort"
        name="sort"
        value={sort}
        onChange={handleChange}
      >
        <option value="name-a">Название (А - Я)</option>
        <option value="name-z">Название (Я - А)</option>
        <option value="price-lowest">Цена (по возрастанию)</option>
        <option value="price-highest">Цена (по убыванию)</option>
      </select>
    </form>
  );
};

export default Sort;
