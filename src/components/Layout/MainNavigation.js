import { NavLink } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>CW Movie Booking</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/AllMovies" activeClassName={classes.active}>
              <HeaderButton title="Home"/>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
