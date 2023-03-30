import { Link } from 'react-router-dom';
import AddToCartBtn from '../buttons/addToCart-btn/AddToCartBtn';
import { Product } from '../../store/products/types';
import styles from './ProductList.module.css';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
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
              <p className={styles.productSize}>
                <img
                  className={styles.packagingIcon}
                  src={
                    sizeType === 'volume'
                      ? 'src/assets/img/bottle-icon.svg'
                      : 'src/assets/img/box-icon.svg'
                  }
                  width={sizeType === 'volume' ? 9 : 20}
                  height={sizeType === 'volume' ? 15 : 16}
                  alt="иконка упаковки"
                />

                <span> {`${size} ${sizeType === 'volume' ? 'мл' : 'г'}`}</span>
              </p>
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
                  {price} <span className={styles.currency}>₸</span>
                </p>
                <AddToCartBtn />
              </div>
            </div>
          </article>
        );
      })}
    </ul>
  );
};

export default ProductList;
