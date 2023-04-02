import styles from './PriceListBtn.module.css';

type PriceListBtnProps = {
  type?: 'contained' | 'text';
};

const PriceListBtn: React.FC<PriceListBtnProps> = ({ type = 'contained' }) => (
  <a
    className={`${type === 'contained' ? styles.containedBtn : styles.textBtn}`}
    href="/icons/price-list.jpg"
    download
  >
    <span>Прайс-лист</span>
  </a>
);

export default PriceListBtn;
