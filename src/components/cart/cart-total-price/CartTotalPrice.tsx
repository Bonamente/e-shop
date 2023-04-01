import { useAppSelector } from '../../../hooks/redux-hooks';
import styles from './CartTotalPrice.module.css';

const CartTotalPrice = () => {
  const { totalPrice } = useAppSelector((state) => state.cart);

  return (
    <div>
      <h3 className="visually-hidden">Общая стоимость товаров составляет:</h3>
      <p className={styles.price}>{totalPrice} ₸</p>
    </div>
  );
};

export default CartTotalPrice;
