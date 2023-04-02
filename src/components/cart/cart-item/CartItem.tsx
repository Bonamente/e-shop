import { useAppDispatch } from '../../../hooks/redux-hooks';
import AmountButtons from '../../buttons/amount-btns/AmountButtons';
import type { CartItem as CartItemType } from '../../../store/cart/types';
import {
  removeFromCart,
  updateCartItemAmount,
} from '../../../store/cart/slice';
import styles from './CartItem.module.css';

type CartItemProps = CartItemType;

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  sizeType,
  size,
  price,
  amount,
  imgUrl,
}) => {
  const dispatch = useAppDispatch();

  const increase = () => {
    dispatch(updateCartItemAmount({ id, value: 'inc' }));
  };

  const decrease = () => {
    dispatch(updateCartItemAmount({ id, value: 'dec' }));
  };

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemInfo}>
        <div className={styles.imgWrapper}>
          <img className={styles.itemImg} src={imgUrl} alt={name} />
        </div>
        <div className={styles.details}>
          <p className={styles.productSize}>
            <img
              className={styles.packagingIcon}
              src={
                sizeType === 'volume'
                  ? '/icons/bottle-icon.svg'
                  : '/icons/box-icon.svg'
              }
              width={sizeType === 'volume' ? 9 : 20}
              height={sizeType === 'volume' ? 15 : 16}
              alt="иконка упаковки"
            />
            <span> {`${size} ${sizeType === 'volume' ? 'мл' : 'г'}`}</span>
          </p>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <ul className={styles.actions}>
        <li className={styles.actionsItem}>
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
        </li>
        <li className={styles.actionsItem}>
          <p className={styles.price}>{price} ₸</p>
        </li>

        <li className={styles.actionsItem}>
          <button
            className={styles.removeBtn}
            onClick={() => dispatch(removeFromCart(id))}
            type="button"
          >
            <span className="visually-hidden">Удалить товар</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CartItem;
