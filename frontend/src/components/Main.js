import React, { useMemo } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onEditAvatar,
  onCardClick,
  onAddPlace,
  onCardLikeClick,
  cards,
  onCardDeleteClick,
}) {
  const userData = React.useContext(CurrentUserContext);
  const cardsElements = useMemo(
    () =>
      cards.map((item) => (
        <li
          key={item._id}
          className="gallery__item">
          <Card
            card={item}
            onCardClick={onCardClick}
            onLikeClick={onCardLikeClick}
            onDeleteClick={onCardDeleteClick}
          />
        </li>
      )),
    [cards, onCardClick, onCardDeleteClick, onCardLikeClick],
  );
  return (
    <main>
      {/* START PROFILE*/}
      <section className="profile page__profile">
        <button
          style={{ backgroundImage: `url(${userData.avatar})` }}
          onClick={onEditAvatar}
          className="button profile__avatar-edit-button"
        />
        <div className="profile__about-user">
          <div className="profile__name-plus-button">
            <h1 className="profile__user-name">{userData.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="button profile__edit-profile-button"></button>
          </div>
          <p className="profile__user-profession">{userData.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="button profile__add-photo-button"></button>
      </section>
      {/* END PROFILE */}
      {/* START Gallery */}
      <section className="gallery page__gallery">
        <ul className="gallery__list">{cardsElements}</ul>
      </section>
      {/* END GALLERY */}
    </main>
  );
}

export default Main;
