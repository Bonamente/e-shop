/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux-hooks';
import useResize from '../../../hooks/useResize';
import { updateFilter, clearFilters } from '../../../store/filters/slice';
import SearchBar from '../../search-bar/SearchBar';
import styles from './MainFilter.module.css';

const MainFilter = () => {
  const dispatch = useDispatch();
  const [isSmallScreen] = useResize();
  const { allProducts, initMinPrice, initMaxPrice, filters } = useAppSelector(
    (state) => state.filters
  );

  const [minPrice, setMinPrice] = useState(initMinPrice);
  const [maxPrice, setMaxPrice] = useState(initMaxPrice);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (filters.manufacturers.length < 1) {
      setManufacturers([]);
    }
  }, [filters.manufacturers]);

  useEffect(() => {
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setManufacturers(filters.manufacturers);
  }, [filters]);

  const numberOfProductsByManufacturer = useMemo(() => {
    const map = new Map(
      allProducts.map(({ manufacturer }) => [
        manufacturer,
        { [manufacturer]: { num: 0, isChecked: false } },
      ])
    );

    allProducts.forEach(({ manufacturer }) => {
      const obj = map.get(manufacturer);

      if (obj) {
        obj[manufacturer].num += 1;
        obj[manufacturer].isChecked = manufacturers.includes(manufacturer);
      }
    });

    return Array.from(map.values());
  }, [allProducts, manufacturers]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMinPrice = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    setMinPrice(+value);
  };

  const handleMaxPrice = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    setMaxPrice(+value);
  };

  const handleManufacturer = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const manufacturer = target.value;
    const isChecked = target.checked;

    if (isChecked) {
      setManufacturers([...manufacturers, manufacturer]);
    } else {
      setManufacturers(manufacturers.filter((name) => name !== manufacturer));
    }
  };

  const handleClear = () => {
    setMinPrice(filters.minPrice);
    setMaxPrice(initMaxPrice);
    dispatch(clearFilters());
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateFilter({ name: 'minPrice', value: minPrice }));
    dispatch(updateFilter({ name: 'maxPrice', value: maxPrice }));
    dispatch(updateFilter({ name: 'manufacturers', value: manufacturers }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isSmallScreen ? null : (
        <h2 className={styles.formTitle}>Подбор по параметрам</h2>
      )}

      <fieldset className={styles.priceInputs}>
        <legend className={styles.priceInputsTitle}>
          Цена <span>₸</span>
        </legend>
        <label className="visually-hidden" htmlFor="min-price">
          Минимальная цена
        </label>
        <input
          className={styles.minPriceInput}
          type="number"
          id="min-price"
          value={minPrice}
          onChange={handleMinPrice}
        />

        <span>-</span>

        <label className="visually-hidden" htmlFor="max-price">
          Максимальная цена
        </label>
        <input
          className={styles.maxPriceInput}
          type="number"
          id="max-price"
          value={maxPrice}
          onChange={handleMaxPrice}
        />
      </fieldset>

      <fieldset className={styles.manufacturer}>
        <legend className={styles.manufacturerTitle}>Производитель</legend>

        {isSmallScreen ? (
          <SearchBar size="large" />
        ) : (
          <SearchBar size="small" />
        )}

        <div className={styles.checkboxesWrapper}>
          <ul
            className={`${styles.checkboxes} ${
              isExpanded ? styles.expanded : ''
            }`}
          >
            {numberOfProductsByManufacturer.map((obj) => {
              const [key] = Object.keys(obj);

              return (
                <li className={styles.checkboxItem} key={key}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={key}
                    name={key}
                    value={key}
                    onChange={handleManufacturer}
                    checked={obj[key].isChecked}
                  />
                  <label className={styles.checkboxLabel} htmlFor={key}>
                    {key} <span>({obj[key].num})</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <button
            className={styles.toggler}
            type="button"
            onClick={handleExpand}
          >
            {isExpanded ? 'Свернуть' : 'Показать все'}
            <span
              className="checkboxTogglerIcon"
              style={{
                width: '7px',
                height: '7px',
                marginLeft: '6px',
                transform: `${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}`,
              }}
            >
              <img src="icons/arrow-down.svg" role="presentation" alt="" />
            </span>
          </button>
        </div>
      </fieldset>

      <div className={styles.buttonsWrapper}>
        <button className={styles.submitBtn} type="submit">
          Показать
        </button>

        <button className={styles.clearBtn} type="button" onClick={handleClear}>
          <span className="visually-hidden">Сбросить фильтры</span>
        </button>
      </div>
    </form>
  );
};

export default MainFilter;
