import styles from './AmountButtons.module.css';

type AmountButtonsProps = {
  increase: () => void;
  decrease: () => void;
  amount: number;
};

const AmountButtons: React.FC<AmountButtonsProps> = ({
  increase,
  decrease,
  amount = 0,
}) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.amountBtn} type="button" onClick={decrease}>
        <span className="visually-hidden">Уменьшить</span>-
      </button>

      <p className={styles.amount}>{amount}</p>

      <button className={styles.amountBtn} type="button" onClick={increase}>
        <span className="visually-hidden">Увеличить</span>+
      </button>
    </div>
  );
};

export default AmountButtons;
