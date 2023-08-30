import React from "react";
import "./BurgerButton.css";
import closeButton from "../../images/close_popup_icon.svg";

export default function BurgerButton({ isOpen, style, onClick }) {
  return (
    <div onClick={onClick} style={style} className="burger-button">
      {isOpen ? (
        <img src={closeButton} alt="кнопка закрытия"></img>
      ) : (
        <>
          <div className="burger-button-top"></div>
          <div className="burger-button-middle"></div>
          <div className="burger-button-bottom"></div>
        </>
      )}
    </div>
  );
}
