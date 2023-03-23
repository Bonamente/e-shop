import { Link } from 'react-router-dom';
import styles from './CatalogBtn.module.css';

type CatalogBtnProps = {
  type?: 'large' | 'small';
};

const CatalogBtn: React.FC<CatalogBtnProps> = ({ type = 'large' }) => (
  <Link
    className={`${type === 'large' ? styles.largeBtn : styles.smallBtn}`}
    to="/"
  >
    Каталог
  </Link>
);

export default CatalogBtn;
