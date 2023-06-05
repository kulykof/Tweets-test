import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
        }
        to="/tweets"
      >
        Tweets
      </NavLink>
    </nav>
  );
};

export default NavBar;
