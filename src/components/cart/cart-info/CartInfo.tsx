import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { countCartTotals } from '../../../store/cart/slice';
import format from '../../../utils/format';
import styles from './CartInfo.module.css';

type CartInfoProps = {
  type?: 'detailed' | 'simple';
};

const CartInfo: React.FC<CartInfoProps> = ({ type = 'detailed' }) => {
  const dispatch = useAppDispatch();
  const { totalItems, totalPrice, cart } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(countCartTotals());
  }, [cart]);

  const btnSize =
    type === 'detailed'
      ? { width: '46px', height: '46px' }
      : {
          width: '25px',
          height: '25px',
          marginTop: '5px',
          marginRight: '9px',
          backgroundSize: `22px 16px`,
        };

  const valueSize =
    type === 'detailed'
      ? { width: '22px', height: '22px' }
      : {
          width: '17px',
          height: '17px',
          fontSize: '10px',
          fontWeight: 700,
          top: '-4px',
          right: '-9px',
        };

  return (
    <div className={styles.wrapper}>
      <Link to="/cart" className={styles.cartBtn} style={btnSize}>
        <span className="visually-hidden">
          В вашей корзине покупок находится товаров в количестве:
        </span>
        <span className={styles.cartValue} style={valueSize}>
          {totalItems}
        </span>
        <span className="visually-hidden">шт.</span>
      </Link>

      {type === 'detailed' ? (
        <div className={styles.detailedInfo}>
          <p className={styles.detailedText}>Корзина</p>
          <p>
            <span className="visually-hidden">Общая стоимость товаров:</span>
            <span className={styles.totalPrice}>{format(totalPrice)} ₸</span>
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CartInfo;
