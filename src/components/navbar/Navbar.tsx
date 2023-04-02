import styles from './Navbar.module.css';
import NavLinks from '../navLinks/NavLinks';
import Logo from '../logo/Logo';
import CatalogBtn from '../buttons/catalog-btn/CatalogBtn';
import SearchBar from '../search-bar/SearchBar';
import PriceListBtn from '../buttons/priceList-btn/PriceListBtn';
import CartInfo from '../cart/cart-info/CartInfo';

const Navbar = () => {
  return (
    <div className={`navbar ${styles.navbar}`}>
      <div className={styles.navbarTop}>
        <div className={`container ${styles.navbarTopContainer}`}>
          <div className={styles.innerWrapper}>
            <div className={styles.address}>
              <p className={styles.addressText}>
                г. Кокчетав, ул. Ж. Ташенова 129Б
              </p>
              <p className={styles.addressSmallText}>(Рынок Восточный)</p>
            </div>
            <div className={styles.mail}>
              <p className={styles.mailAddressText}>
                <span className="visually-hidden">эл. почта:</span>
                <a
                  href="mailto:opt.sultan@mail.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  opt.sultan@mail.ru
                </a>
              </p>
              <p className={styles.mailText}>На связи в любое время</p>
            </div>
          </div>
          <div className={styles.innerWrapper}>
            <NavLinks />
          </div>
        </div>
      </div>
      <div className={styles.navbarBottom}>
        <div className={`container ${styles.navbarBottomContainer}`}>
          <div className={styles.bottomInnerWrapper}>
            <Logo />
            <CatalogBtn />
            <SearchBar type="stub" />
          </div>

          <div className={styles.bottomInnerWrapper}>
            <div className={styles.contacts}>
              <p className={styles.phone}>
                <span className="visually-hidden">телефон:</span>
                <a className={styles.phoneLink} href="tel:+1234567890">
                  +7 (777) 490-00-91
                </a>
              </p>
              <p className={styles.officeHours}>время работы: 9:00-20:00</p>
              <a className={styles.bookCall} href="/">
                Заказать звонок
              </a>
            </div>

            <PriceListBtn />
            <CartInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
