import Popup from "./Popup";

function ImagePopup({ isOpen, card, onClose, title, children }) {
  return (
    <Popup isOpen={isOpen} name="big-photo" onClose={onClose} title={title} children={children}>
      <figure className="popup__img-container">
        <button onClick={onClose} type="button" className="popup__close-button button" />
        <img src={card.link} alt={card.name} className="popup__img" />
        <figcaption className="popup__place-name-of-big-photo">{card.name}</figcaption>
      </figure>
    </Popup>
    // <div
    //   // onClick={handleCloseByOverlay}
    //   className={`popup popup_dark-overlay popup-big-photo ${card.link ? "popup_visible" : ""}`}
    // >
    //   <figure className="popup__img-container">
    //     <button onClick={onClose} type="button" className="popup__close-button button" />
    //     <img src={card.link} alt={card.name} className="popup__img" />
    //     <figcaption className="popup__place-name-of-big-photo">{card.name}</figcaption>
    //   </figure>
    // </div>
  );
}

export default ImagePopup;
