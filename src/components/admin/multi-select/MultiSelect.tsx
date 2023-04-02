/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './MultiSelect.module.css';
import type { Option, IdObj } from '../product-form/ProductForm';

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  toggleOption: ({ id }: IdObj) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  toggleOption,
}) => (
  <div className={styles.multiSelect}>
    <div className={styles.selected}>
      <h3 className={styles.title}>Типы ухода:</h3>
    </div>
    <ul className={styles.options}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <li key={option.id} className={styles.option} tabIndex={0}>
            <label className={styles.label} htmlFor={option.id}>
              <input
                className={styles.optionCheckbox}
                id={option.id}
                type="checkbox"
                checked={isSelected}
                onClick={() => toggleOption({ id: option.id })}
              />
              {option.title}
            </label>
          </li>
        );
      })}
    </ul>
  </div>
);

export default MultiSelect;
