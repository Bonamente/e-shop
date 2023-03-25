import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.css';

type NavLinksProps = {
  closeMobileNavMenu?: (arg: boolean) => void;
};

const NavLinks: React.FC<NavLinksProps> = ({ closeMobileNavMenu }) => {
  return (
    <nav className={`nav ${styles.nav}`}>
      <ul className={`linkList ${styles.linkList}`}>
        <li className={styles.linkItem}>
          <NavLink
            to="#"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} active` : `${styles.navLink}`
            }
            onClick={
              closeMobileNavMenu ? () => closeMobileNavMenu(false) : undefined
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
            onClick={
              closeMobileNavMenu ? () => closeMobileNavMenu(false) : undefined
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
            onClick={
              closeMobileNavMenu ? () => closeMobileNavMenu(false) : undefined
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
            onClick={
              closeMobileNavMenu ? () => closeMobileNavMenu(false) : undefined
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
