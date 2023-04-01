import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import CartItem from '../../components/cart/cart-item/CartItem';
import CartTotalPrice from '../../components/cart/cart-total-price/CartTotalPrice';
import { clearCart, countCartTotals } from '../../store/cart/slice';
import { showModal } from '../../store/modal/slice';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(countCartTotals());
  }, [cart]);

  const handleOrder = () => {
    dispatch(showModal());
    dispatch(clearCart());
  };

  return (
    <div className={`${styles.cart} container`}>
      <Breadcrumbs page="Корзина" />
      <h1 className={styles.title}>Корзина</h1>

      {cart.length < 1 ? (
        <div className={styles.emptyCart}>
          <h2 className={styles.emptyCartTitle}>
            В Вашей корзине пока ничего нет
          </h2>
          <Link className={styles.emptyCartLink} to="/">
            Выбрать товары
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.items}>
            {cart.map((item) => (
              <li className={styles.item} key={item.id}>
                <CartItem {...item} />
              </li>
            ))}
          </ul>

          <div className={styles.pageBottom}>
            <button
              className={styles.orderBtn}
              onClick={handleOrder}
              type="button"
            >
              Оформить заказ
            </button>

            <CartTotalPrice />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
