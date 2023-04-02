/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';
import Logo from '../logo/Logo';
import NavLinks from '../navLinks/NavLinks';
import CatalogBtn from '../buttons/catalog-btn/CatalogBtn';
import PriceListBtn from '../buttons/priceList-btn/PriceListBtn';
import CartInfo from '../cart/cart-info/CartInfo';
import styles from './MobileNavbar.module.css';

const MobileNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  useDisableBodyScroll(showDropdown);

  return (
    <div className={styles.mobileNavbar}>
      <div className={styles.visible}>
        <div className={styles.navbarTop}>
          <div className={`container ${styles.navbarTopContainer}`}>
            <button
              className={`${styles.toggleBtn} ${
                showDropdown ? `${styles.open}` : ''
              }`}
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="visually-hidden">Открыть/закрыть меню</span>
              <span />
              <span />
              <span />
              <span />
            </button>
            <Logo size="small" />
            <CartInfo type="simple" />
          </div>
        </div>

        <div className={styles.navbarBottom}>
          <div className={`container ${styles.navbarBottomContainer}`}>
            <div className={styles.bottomInnerWrapper}>
              <CatalogBtn size="small" />
            </div>

            <div className={styles.bottomInnerWrapper}>
              <form className={styles.searchForm}>
                <label className="visually-hidden" htmlFor="search-input">
                  Введите название
                </label>
                <input
                  id="search-input"
                  className={styles.searchInput}
                  type="text"
                  name="search"
                  placeholder="Поиск"
                />

                <button className={`${styles.searchBtn} button`} type="submit">
                  <span className="visually-hidden">Найти</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`container ${styles.dropdown} ${
          showDropdown ? `${styles.active}` : ''
        } `}
        onClick={() => setShowDropdown(false)}
      >
        <div
          className={styles.infoWrapper}
          onClick={(e) => e.stopPropagation()}
        >
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

          <div className={styles.salesTeam}>
            <p className={styles.salesTeamText}>Отдел продаж</p>
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
        </div>

        <div
          className={styles.navlinksWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={styles.menuTitle}>Меню сайта:</h2>
          <NavLinks closeMobileNavMenu={setShowDropdown} />
          <div className={styles.priceBtnWrapper}>
            <PriceListBtn />
          </div>
        </div>
        <div className={styles.overlay} />
      </div>
    </div>
  );
};

export default MobileNavbar;
