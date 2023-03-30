import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import useResize from '../../hooks/useResize';

type BreadcrumbsProps = {
  page: string;
  product?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ page, product }) => {
  const [isSmallScreen] = useResize();

  return (
    // Hardcoded for demo version. Refactor later
    <nav className={styles.wrapper}>
      {isSmallScreen ? (
        <Link className={styles.back} to="/">
          Назад
        </Link>
      ) : (
        <>
          <Link className={styles.crum} to="/">
            Главная
          </Link>
          {product ? (
            <>
              <Link className={styles.crum} to="/">
                Каталог
              </Link>
              <p className={styles.crum}>{product}</p>
            </>
          ) : (
            <p className={styles.crum}>{page}</p>
          )}
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
