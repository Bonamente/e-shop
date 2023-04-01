import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import type { Product } from '../../../store/products/types';
import { addToCart } from '../../../store/cart/slice';
import styles from './AddToCartBtn.module.css';

type AddToCartBtnProps = {
  product: Product;
  amount?: number;
  size?: 'large' | 'small';
  shouldNavigate?: boolean;
};

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
  product,
  amount = 1,
  size = 'small',
  shouldNavigate = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    id,
    name,
    description,
    sizeType,
    size: productSize,
    price,
    imgUrl,
  } = product;

  const handleClick = () => {
    dispatch(
      addToCart({
        id,
        name,
        description,
        sizeType,
        size: productSize,
        price,
        amount,
        imgUrl,
      })
    );

    if (shouldNavigate) {
      navigate('/cart');
    }
  };

  return (
    <button
      className={size === 'small' ? styles.smallBtn : styles.largeBtn}
      type="button"
      onClick={handleClick}
    >
      <span>В корзину</span>
    </button>
  );
};

export default AddToCartBtn;
