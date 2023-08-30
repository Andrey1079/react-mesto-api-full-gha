import React from "react";
import IsAnyPopupOpenedContext from "../../contexts/IsAnyPopupOpenedContext";
export default function Popup({ isOpen, onClose, name, children }) {
  const isAnyPopupOpened = React.useContext(IsAnyPopupOpenedContext);
  const handleCloseByOverlay = (evt) => {
    evt.target === evt.currentTarget && onClose();
  };
  React.useEffect(() => {
    const handleCloseByEscape = (evt) => {
      evt.key === "Escape" && onClose();
    };
    if (isAnyPopupOpened) {
      document.addEventListener("keydown", handleCloseByEscape);
    }
    return () => document.removeEventListener("keydown", handleCloseByEscape);
  }, [isAnyPopupOpened, onClose]);

  return (
    <div onClick={handleCloseByOverlay} className={`popup popup-${name} ${isOpen && "popup_visible"}`}>
      {children}
    </div>
  );
}
