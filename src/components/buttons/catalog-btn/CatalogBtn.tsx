import { Link } from 'react-router-dom';
import styles from './CatalogBtn.module.css';

type CatalogBtnProps = {
  size?: 'large' | 'small';
};

const CatalogBtn: React.FC<CatalogBtnProps> = ({ size = 'large' }) => (
  <Link className={size === 'large' ? styles.largeBtn : styles.smallBtn} to="/">
    Каталог
  </Link>
);

export default CatalogBtn;
