import { Link } from 'react-router-dom';
import AddToCartBtn from '../buttons/addToCart-btn/AddToCartBtn';
import { Product } from '../../store/products/types';
import ProductSize from '../product-size/ProductSize';
import format from '../../utils/format';
import styles from './ProductList.module.css';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return products.length === 0 ? (
    <ul className={styles.productList}>
      <p className={styles.empty}>По Вашему запросу ничего не найдено.</p>
    </ul>
  ) : (
    <ul className={styles.productList}>
      {products.map((product: Product) => {
        const {
          id,
          barcode,
          name,
          brand,
          manufacturer,
          sizeType,
          size,
          imgUrl,
          price,
        } = product;
        return (
          <article className={styles.productCard} key={id}>
            <div className={styles.topWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.productImg} src={imgUrl} alt={name} />
              </div>
              <ProductSize size={size} sizeType={sizeType} />
            </div>
            <div className={styles.productInfo}>
              <Link to={`product/${id}`} className={styles.productLink}>
                <h3 className={styles.productName}>{name}</h3>
              </Link>

              <div className={styles.middleWrapper}>
                <p className={styles.barcode}>
                  Штрихкод:{' '}
                  <span className={styles.barcodeValue}>{barcode}</span>
                </p>

                <p className={styles.manufacturer}>
                  Производитель:{' '}
                  <span className={styles.manufacturerValue}>
                    {manufacturer}
                  </span>
                </p>

                <p className={styles.brand}>
                  Бренд: <span className={styles.brandValue}>{brand}</span>
                </p>
              </div>

              <div className={styles.bottomWrapper}>
                <p className={styles.price}>
                  {format(price)} <span className={styles.currency}>₸</span>
                </p>
                <AddToCartBtn product={product} />
              </div>
            </div>
          </article>
        );
      })}
    </ul>
  );
};

export default ProductList;
