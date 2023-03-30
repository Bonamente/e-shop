import { usePagination, DOTS } from '../../hooks/usePagination';
import styles from './Pagination.module.css';

type PaginationProps = {
  onPageChange: (arg: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  }

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.pagination}>
      <button
        type="button"
        className={`${styles.paginationItem} ${styles.arrowLeft} ${
          currentPage === 1 ? `${styles.disabled}` : ''
        }`}
        onClick={handlePrev}
      >
        <span className="visually-hidden">Предыдущая страница</span>
      </button>

      {paginationRange &&
        paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={pageNumber}
                className={`${styles.paginationItem} ${styles.dots}`}
              >
                &#8230;
              </li>
            );
          }

          return (
            <button
              key={pageNumber}
              type="button"
              className={`${styles.paginationItem} ${
                pageNumber === currentPage ? `${styles.selected}` : ''
              }`}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

      <button
        type="button"
        className={`${styles.paginationItem} ${styles.arrowRight} ${
          currentPage === lastPage ? `${styles.disabled}` : ''
        }`}
        onClick={handleNext}
      >
        <span className="visually-hidden">Следующая страница</span>
      </button>
    </ul>
  );
};

export default Pagination;
