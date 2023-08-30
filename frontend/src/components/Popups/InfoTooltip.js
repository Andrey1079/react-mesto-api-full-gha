import succes_img from "../../images/succes.jpg";
import fail_img from "../../images/fail.jpg";
import Popup from "./Popup";
export default function InfoTooltip({ isOpen, onClose, succes }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="tooltip" children>
      <div className="popup__card">
        <button onClick={onClose} type="button" className="popup__close-button button" />
        <img src={succes ? succes_img : fail_img} alt={succes ? "Все получилось" : "Что то не так"} className="tooltip__img" />
        <p className="tooltip__message">
          {succes ? "Вы успешно зарегистрировались!" : "Что то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </Popup>
  );
}
