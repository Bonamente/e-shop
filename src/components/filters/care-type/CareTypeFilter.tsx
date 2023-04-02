/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { updateFilter } from '../../../store/filters/slice';
import { Filters } from '../../../store/filters/types';
import { careTypeMap, CareTypeMap } from '../../../utils/constants';
import styles from './CareTypeFilter.module.css';

type CareTypeFilterProps = {
  view?: 'tab' | 'text';
};

const CareTypeFilter: React.FC<CareTypeFilterProps> = ({ view = 'tab' }) => {
  const dispatch = useAppDispatch();
  const { allProducts, filters } = useAppSelector((state) => state.filters);

  const careTypesSet = new Set(
    allProducts.flatMap((product) => product.careType)
  );

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;
    const name = target.name as keyof Filters;
    const { value } = target;

    if (filters.careType === value) {
      dispatch(updateFilter({ name, value: '' }));
    } else {
      dispatch(updateFilter({ name, value }));
    }
  };

  return (
    <ul className={view === 'tab' ? styles.tabView : styles.textView}>
      {[...careTypesSet].map((careType) => (
        <li className={styles.listItem} key={careType}>
          <button
            type="button"
            className={`${styles.button} ${
              careType === filters.careType ? styles.active : ''
            }`}
            value={careType}
            name="careType"
            onClick={handleChange}
          >
            {careTypeMap[careType as keyof CareTypeMap]}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CareTypeFilter;
