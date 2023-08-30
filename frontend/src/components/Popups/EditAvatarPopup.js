import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from '../Form/Input';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdatedAvatar,
  handleCloseByOverlay,
}) {
  React.useEffect(() => {
    inputAvatar.current.value = '';
  }, [isOpen]);
  const inputAvatar = React.useRef();
  const handleSubmit = (evt) => {
    onUpdatedAvatar(inputAvatar.current.value);
  };
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="edit-avatar"
      title="Обновить аватар"
      handleCloseByOverlay={handleCloseByOverlay}>
      <Input
        inputRef={inputAvatar}
        className="popup__form-item popup__form-item_type_avtar-link"
        type="url"
        name="url"
        placeholder="cсылка на аватар"
        id="avatar-link"
      />
    </PopupWithForm>
  );
}
