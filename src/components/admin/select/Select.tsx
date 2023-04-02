import { Product } from '../../../store/products/types';
import styles from './Select.module.css';
import { compareByNameAscending } from '../../../utils/comparators';

type SelectProps = {
  products: Product[];
  handleSelect: (arg: string | null) => void;
};

const Select: React.FC<SelectProps> = ({ products, handleSelect }) => {
  const arrayForSort = [...products];

  return (
    <select
      className={styles.select}
      name="select"
      onChange={(e) => {
        handleSelect(e.target.value);
      }}
    >
      <option value="select">Выберите товар</option>

      {arrayForSort.sort(compareByNameAscending).map((product) => (
        <option key={product.id} value={product.id}>
          {product.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
