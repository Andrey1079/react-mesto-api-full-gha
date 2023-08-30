import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
  const userData = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === userData._id;
  const isLiked = card.likes.some((item) => item._id === userData._id);
  const likedUsers = card.likes.map((user) => (
    <li
      className="gallery__liked-user-item"
      key={user._id}>
      <img
        className="gallery__liked-user-avatar"
        src={user.avatar}
        alt="Аватар"></img>
      <p className="gallery__liked-user-name">{user.name}</p>
    </li>
  ));
  const image = React.useRef();
  const photo = image.current;
  const [isMouseAboveLike, setIsMouseAboveLike] = React.useState(false);
  const [ismouseAbovePhoto, setIsMouseAbovePhoto] = React.useState(false);
  const [positionOfcursor, setPositionOfCursor] = React.useState({ xPosition: 0, yPosition: 0 });
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onLikeClick(card);
  };
  const handleDeleteClick = () => {
    onDeleteClick(card._id);
  };
  const showLikedUsers = () => {
    if (card.likes.length > 0) {
      setIsMouseAboveLike(true);
    }
  };
  const hideLikedUsers = () => {
    setIsMouseAboveLike(false);
  };
  const showAuthor = () => {
    setIsMouseAbovePhoto(true);
  };
  const hideAuthor = () => {
    setIsMouseAbovePhoto(false);
  };
  const moveAuthorInfo = (evt) => {
    setPositionOfCursor({
      xPosition: evt.layerX + 15,
      yPosition: evt.layerY + 15,
    });
  };
  React.useEffect(() => {
    if (ismouseAbovePhoto) {
      photo.addEventListener('mousemove', moveAuthorInfo);
    }
    return () => photo?.removeEventListener('mousemove', moveAuthorInfo);
  }, [ismouseAbovePhoto, photo]);
  return (
    <>
      <button
        onClick={handleDeleteClick}
        type="button"
        className={`button gallery__bin-button ${isOwn && 'gallery__bin-button_visible'}`}></button>
      <img
        ref={image}
        onMouseEnter={showAuthor}
        onMouseLeave={hideAuthor}
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
        className="gallery__image"
      />
      <h2 className="gallery__city">{card.name}</h2>
      <button
        onMouseEnter={showLikedUsers}
        onMouseLeave={hideLikedUsers}
        onClick={handleLikeClick}
        type="button"
        className={`button gallery__like-button ${
          isLiked && 'gallery__like-button_active'
        }`}></button>
      <p className="gallery__like-counter">{card.likes.length}</p>
      <div
        className={`gallery__info-about-liked-users ${
          isMouseAboveLike && 'gallery__info-about-liked-users_visible'
        }`}>
        <ul className="gallery__list-of-liked-users">{likedUsers}</ul>
      </div>
      <div
        style={{ top: positionOfcursor.yPosition, left: positionOfcursor.xPosition }}
        className={`gallery__author ${ismouseAbovePhoto && 'gallery__author_visible'}`}>
        <img
          className="gallery__author-avatar"
          src={card.owner.avatar}
          alt="Аватар"></img>
        <p className="gallery__author-name">{card.owner.name}</p>
      </div>
    </>
  );
}
export default Card;
