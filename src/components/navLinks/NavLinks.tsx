import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.css';

const NavLinks = () => {
  return (
    <nav className={`header-nav ${styles.nav}`}>
      <ul className={`linkList ${styles.linkList}`}>
        <li className={styles.linkItem}>
          <NavLink
            to="#"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} active` : `${styles.navLink}`
            }
          >
            О компании
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            to="#"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} active` : `${styles.navLink}`
            }
          >
            Доставка и оплата
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            to="#"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} active` : `${styles.navLink}`
            }
          >
            Возврат
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            to="#"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} active` : `${styles.navLink}`
            }
          >
            Контакты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
