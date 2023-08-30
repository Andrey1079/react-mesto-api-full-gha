import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../Form/Input";

export default function AddPlacePopup({ isOpen, onClose, onAddedPlace, handleCloseByOverlay }) {
  React.useEffect(() => {
    url.current.value = "";
    caption.current.value = "";
  }, [isOpen]);
  const url = React.useRef();
  const caption = React.useRef();
  const handleAddPlace = (evt) => {
    onAddedPlace({ name: caption.current.value, link: url.current.value });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-photo"
      title="Новое место"
      text="Создать"
      onSubmit={handleAddPlace}
      handleCloseByOverlay={handleCloseByOverlay}
    >
      <Input
        inputRef={caption}
        className="popup__form-item popup__form-item_type_place"
        type="text"
        name="name"
        placeholder="Название"
        validationLength={{ min: 2, max: 30 }}
        id="place-name"
        required
      />

      <Input
        inputRef={url}
        className="popup__form-item popup__form-item_type_img-link"
        type="url"
        name="link"
        placeholder="cсылка на картинку"
        id="img-link"
        required
      />
    </PopupWithForm>
  );
}
