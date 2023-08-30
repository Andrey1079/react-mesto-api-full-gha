import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import React from "react";
import BurgerButton from "./BurgerButton/BurgerButton";

function Header(props) {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const handleClickBurgerButton = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  return (
    <header className="header page__header">
      <img src={logo} alt="логотип сайта Mesto" className="header__logo" />

      {props.page === "login" ? (
        <Link className="header__link" to="/register">
          Регистрация
        </Link>
      ) : props.page === "register" ? (
        <Link className="header__link" to="/login">
          Войти
        </Link>
      ) : (
        <div className={`header__loddeg-in-user-info ${isDetailsOpen && "header__loddeg-in-user-info_active"}`}>
          <p className="header__login">{props.email}</p>
          <Link onClick={props?.onLogOut} className="header__link" to="/login">
            Выйти
          </Link>
        </div>
      )}

      {props.width < 521 && (
        <BurgerButton isOpen={isDetailsOpen} onClick={handleClickBurgerButton} style={{ margin: "7px 30px 0 0" }} />
      )}
    </header>
  );
}
export default Header;
