import styles from './ProductSize.module.css';

type ProductSizeProps = {
  size: number;
  sizeType: 'volume' | 'weight';
};

const ProductSize: React.FC<ProductSizeProps> = ({ size, sizeType }) => {
  return (
    <div className={styles.productSize}>
      <img
        className={styles.packagingIcon}
        src={
          sizeType === 'volume' ? 'icons/bottle-icon.svg' : 'icons/box-icon.svg'
        }
        width={sizeType === 'volume' ? 9 : 20}
        height={sizeType === 'volume' ? 15 : 16}
        alt="иконка упаковки"
      />

      <span> {`${size} ${sizeType === 'volume' ? 'мл' : 'г'}`}</span>
    </div>
  );
};

export default ProductSize;
