import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Input from "../Form/Input";

export default function EditProfilePopup({ isOpen, onClose, onUpdatedUserInfo, handleCloseByOverlay }) {
  const currentUser = React.useContext(CurrentUserContext);
  const inputName = React.useRef();
  const inputDescription = React.useRef();
  React.useEffect(() => {
    inputName.current.value = currentUser.name;
    inputDescription.current.value = currentUser.about;
  }, [isOpen, currentUser]);
  const handleSubmit = (evt) => {
    onUpdatedUserInfo({
      name: inputName.current.value,
      about: inputDescription.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      text="Сохранить"
      onSubmit={handleSubmit}
      handleCloseByOverlay={handleCloseByOverlay}
    >
      <Input
        inputRef={inputName}
        className="popup__form-item popup__form-item_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        id="user-name-input"
        validationLength={{ min: 2, max: 40 }}
        required
      />

      <Input
        inputRef={inputDescription}
        className="popup__form-item popup__form-item_type_profession"
        type="text"
        name="profession"
        placeholder="Профессия"
        validationLength={{ min: 2, max: 200 }}
        required
        id="user-profession"
      />
    </PopupWithForm>
  );
}
