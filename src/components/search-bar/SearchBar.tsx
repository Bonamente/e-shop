/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { updateFilter } from '../../store/filters/slice';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  // For demo version
  type?: 'stub';
  size?: 'small' | 'middle' | 'large';
};

const SearchBar: React.FC<SearchBarProps> = ({ type, size = 'middle' }) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const [searchValue, setSearchValue] = useState(filters.searchValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchValue(filters.searchValue);
  }, [filters]);

  const handleSearch = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    setSearchValue(value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(updateFilter({ name: 'searchValue', value: searchValue }));
    setIsLoading(false);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    // Used the div tag instead of the form tag, because this component is used inside another form.
    <div
      className={`${styles.searchForm} ${size}`}
      // used inline styles because there is some problem with dynamic styles in css modules (or it's just me)
      style={{
        width: `${
          size === 'small' ? '238px' : size === 'middle' ? '263px' : '290px'
        }`,
      }}
    >
      <label className="visually-hidden" htmlFor="search-input">
        Введите искомое значение
      </label>
      <input
        id="search-input"
        className={styles.searchInput}
        // used inline styles because there is some problem with dynamic styles in css modules (or it's just me)
        style={{
          width: `${
            size === 'small' ? '174px' : size === 'middle' ? '190px' : '225px'
          }`,
        }}
        type="text"
        name="search"
        value={type ? '' : searchValue}
        onChange={type ? undefined : handleSearch}
        onKeyDown={type ? undefined : handleEnter}
        placeholder="Поиск..."
        readOnly={type ? true : false}
      />

      <button
        className={`${styles.searchBtn} button`}
        type="submit"
        onClick={type ? undefined : handleSubmit}
        disabled={isLoading}
      >
        <span className="visually-hidden">Найти</span>
      </button>
    </div>
  );
};

export default SearchBar;
