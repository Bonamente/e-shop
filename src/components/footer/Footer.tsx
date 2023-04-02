/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, NavLink } from 'react-router-dom';
import Logo from '../logo/Logo';
import NavLinks from '../navLinks/NavLinks';
import PriceListBtn from '../buttons/priceList-btn/PriceListBtn';
import useResize from '../../hooks/useResize';
import styles from './Footer.module.css';

const Footer = () => {
  const [isSmallScreen] = useResize();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <section className={styles.about}>
          {isSmallScreen ? (
            <Logo color="light" size="small" />
          ) : (
            <Logo color="light" />
          )}

          {isSmallScreen ? (
            <div className={styles.topPriceListInfo}>
              <PriceListBtn />
            </div>
          ) : (
            ''
          )}

          <p className={styles.description}>
            Компания «Султан» — снабжаем розничные магазины товарами{' '}
            <br className={styles.break} />
            &quot;под ключ&quot; в Кокчетаве{' '}
            <br className={styles.mobileBreak} /> и Акмолинской области
          </p>

          <form className={styles.emailForm}>
            <label className={styles.emailLabel} htmlFor="email">
              Подпишись на скидки и акции
            </label>
            <div className={styles.emailWrapper}>
              <input
                id="email"
                className={styles.emailInput}
                type="email"
                name="user-email"
                placeholder="Введите ваш E-mail"
              />

              <button className={`${styles.emailBtn} button`} type="submit">
                <span className="visually-hidden">Найти</span>
              </button>
            </div>
          </form>
        </section>

        <div className={styles.innerWrapper}>
          <section className={styles.menu}>
            <h2 className={styles.menuTitle}>Меню сайта:</h2>
            <NavLinks />
          </section>

          <section className={styles.categories}>
            <h2 className={styles.categoriesTitle}>Категории:</h2>
            <ul className={styles.categoriesList}>
              <li className={styles.categoriesItem}>
                <NavLink
                  to="#"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.categoriesLink} active`
                      : `${styles.categoriesLink}`
                  }
                >
                  Бытовая химия
                </NavLink>
              </li>
              <li className={styles.categoriesItem}>
                <NavLink
                  to="#"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.categoriesLink} active`
                      : `${styles.categoriesLink}`
                  }
                >
                  Косметика и гигиена
                </NavLink>
              </li>
              <li className={styles.categoriesItem}>
                <NavLink
                  to="#"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.categoriesLink} active`
                      : `${styles.categoriesLink}`
                  }
                >
                  Товары для дома
                </NavLink>
              </li>
              <li className={styles.categoriesItem}>
                <NavLink
                  to="#"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.categoriesLink} active`
                      : `${styles.categoriesLink}`
                  }
                >
                  Товары для детей и мам
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="#"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.categoriesLink} active`
                      : `${styles.categoriesLink}`
                  }
                >
                  Посуда
                </NavLink>
              </li>
            </ul>
          </section>
        </div>

        <section className={styles.contacts}>
          <div className={styles.contactsWrapper}>
            <div className={styles.general}>
              <h2 className={styles.contactsTitle}>Контакты:</h2>

              <div className={styles.contactInfo}>
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

              <div className={styles.paymentNetworks}>
                <h3 className="visually-hidden">
                  К оплате принимаются карты следующих платежных систем:
                </h3>
                <div>
                  <img
                    src="/src/assets/img/visa-icon.svg"
                    alt="Visa"
                    width={61}
                    height={39}
                  />
                </div>
                <div>
                  <img
                    src="/src/assets/img/mastercard-icon.svg"
                    alt="MasterCard"
                    width={61}
                    height={39}
                  />
                </div>
              </div>
              <Link className={styles.adminPageLink} to="/admin">
                Админ-панель
              </Link>
            </div>
            <div
              className={styles.messengers}
              style={{ order: isSmallScreen ? 'initial' : -1 }}
            >
              {isSmallScreen ? (
                ''
              ) : (
                <div className={styles.priceListInfo}>
                  <h2>Скачать прайс-лист:</h2>
                  <PriceListBtn />
                </div>
              )}

              <h3 className={styles.messangersTitle}>Связь в мессенджерах:</h3>
              <ul className={styles.messangersList}>
                <li className={styles.messangersItem}>
                  <a
                    className={styles.messangersLink}
                    href="https://www.whatsapp.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/src/assets/img/whatsapp-icon.svg"
                      alt="WhatsApp"
                      width={39}
                      height={39}
                    />
                  </a>
                </li>
                <li className={styles.messangersItem}>
                  <a
                    className={styles.messangersLink}
                    href="https://web.telegram.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/src/assets/img/telegram-icon.svg"
                      alt="Telegram"
                      width={39}
                      height={39}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
