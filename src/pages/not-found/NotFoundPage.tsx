import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={`${styles.notFound} container`}>
      <h1 className={styles.title}>Извините, страница не найдена</h1>
      <Link className={styles.link} to="/">
        На Главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
