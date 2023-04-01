import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';
import { hideModal } from '../../store/modal/slice';
import styles from './Modal.module.css';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modal);
  useDisableBodyScroll(isOpen);

  const handleClick = () => {
    dispatch(hideModal());
  };

  return isOpen ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Спасибо за заказ</h2>
        <p className={styles.text}>
          Наш менеджер свяжется с вами в ближайшее время
        </p>
        <button className={styles.closeBtn} onClick={handleClick} type="button">
          <span className="visually-hidden">Закрыть модальное окно</span>
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
