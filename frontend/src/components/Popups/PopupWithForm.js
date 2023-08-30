import React from "react";
import Form from "../Form/Form";
import Popup from "./Popup";
function PopupWithForm({ isOpen, onClose, name, title, text, children, onSubmit }) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name} title={title} text={text} children={children}>
      <div className="popup__card ">
        <button onClick={onClose} type="button" className="popup__close-button button" />
        <h2 className="popup__title">{title}</h2>

        <Form onSubmit={handleSubmit} text={text} className="popup__form">
          {children}
        </Form>
      </div>
    </Popup>
  );
}
export default PopupWithForm;
