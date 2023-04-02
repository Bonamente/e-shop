/* eslint-disable consistent-return */
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useResize from '../../hooks/useResize';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import CareTypeFilter from '../../components/filters/care-type/CareTypeFilter';
import ProductList from '../../components/product-list/ProductList';
import MainFilter from '../../components/filters/price-manufacturer/MainFilter';
import Pagination from '../../components/pagination/Pagination';
import Sort from '../../components/sort/Sort';
import {
  filterProducts,
  loadAllProducts,
  sortProducts,
  setCurrentPage,
} from '../../store/filters/slice';
import styles from './CatalogPage.module.css';

const PageSize = 9;

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const [isSmallScreen] = useResize();
  const [isFilterShown, setIsFilterShown] = useState(false);

  const handleToggler = () => {
    setIsFilterShown(!isFilterShown);
  };

  const { products } = useAppSelector((state) => state.products);
  const { filteredProducts, sort, filters, currentPage } = useAppSelector(
    (state) => state.filters
  );

  const dataToDisplay = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return filteredProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredProducts]);

  useLayoutEffect(() => {
    dispatch(loadAllProducts(products));
  }, [products]);

  useEffect(() => {
    dispatch(filterProducts());
    dispatch(sortProducts());
  }, [sort, filters]);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo(0, 0);
  };

  return (
    <div className={`${styles.catalog} container`}>
      <Breadcrumbs page="Каталог" />

      <div className={styles.topWrapper}>
        <h1 className={styles.pageTitle}>Косметика и гигиена</h1>
        {isSmallScreen ? null : <Sort />}
      </div>

      {isSmallScreen ? (
        <div className={styles.togglerWrapper}>
          <h2 className={styles.filterTitle}>Подбор по параметрам</h2>
          <button
            className={`${styles.filterToggler} ${
              isFilterShown ? styles.toggled : ''
            }`}
            type="button"
            onClick={handleToggler}
          >
            <span className="visually-hidden">Показать/скрыть фильтры</span>
          </button>
        </div>
      ) : null}

      {(() => {
        switch (true) {
          case isSmallScreen && !isFilterShown:
            return (
              <>
                <CareTypeFilter view="text" />
                <Sort />
              </>
            );
          case isSmallScreen && isFilterShown:
            return <MainFilter />;
          default:
            return <CareTypeFilter />;
        }
      })()}

      {(() => {
        switch (true) {
          case isSmallScreen && !isFilterShown:
            return <ProductList products={dataToDisplay} />;
          case isSmallScreen && isFilterShown:
            return null;
          default:
            return (
              <div className={styles.middleWrapper}>
                <aside className={styles.filtersWrapper}>
                  <MainFilter />
                  <CareTypeFilter view="text" />
                </aside>
                <ProductList products={dataToDisplay} />
              </div>
            );
        }
      })()}

      {isSmallScreen && isFilterShown ? null : (
        <div className={styles.paginationWrapper}>
          <Pagination
            onPageChange={handleChangePage}
            siblingCount={1}
            totalCount={filteredProducts.length}
            currentPage={currentPage}
            pageSize={PageSize}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
