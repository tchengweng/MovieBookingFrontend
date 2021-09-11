import { NavLink } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import classes from "./Header.module.css";

//Header on top of the website
const Header = () => {
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

export default Header;
