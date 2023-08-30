import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './Popups/ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import IsAnyPopupOpenedContext from '../contexts/IsAnyPopupOpenedContext';
import EditProfilePopup from './Popups/EditProfilePopup';
import EditAvatarPopup from './Popups/EditAvatarPopup';
import AddPlacePopup from './Popups/AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './Popups/InfoTooltip';
import authentication from '../utils/authentication';
import ProtectedRoute from './ProtectedRoute';
import useResize from './customHooks/useResize';

function App() {
  //                                                ---- Стейты  ----
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isResponseOk, setIsResponseOk] = React.useState(false);
  //
  //                                               ----  Переменные  ----
  const isAnyPopupOpened =
    isEditProfilePopupOpen ||
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isTooltipOpen;
  const navigate = useNavigate();
  let windowWidth = useResize(500);
  //
  //                                                ---- Эффекты  ----

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getStartInfo()
        .then((startData) => {
          const [userData, initialCards] = startData;
          setCurrentUser(userData);
          setCards(initialCards.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //
  //                                               ---- Функции для кнопок ----
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  //
  //                                               ---- Функции для попапов ----
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
  };
  //
  // submit для попапа редактирования данных пользователя
  const handleUpdateUser = (user) => {
    api
      .setUserInfo(user)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //
  // submit для попапа редактирования аватара
  const handleUpdateAvatar = (avatar) => {
    api
      .patchAvatar(avatar)
      .then((newDate) => {
        setCurrentUser(newDate);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //
  // submit для попапа добавления фото
  const handleAddPlace = (card) => {
    api
      .postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //
  //                                               ---- Функции для галереи ----
  //
  // установка/снятие лайка
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .toggleLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  };
  //
  // удаление карточки
  const handleCardDelete = (id) => {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((item) => !(item._id === id)));
      })
      .catch((err) => console.log(err));
  };
  // открытие большой фотографии
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  //                                               ---- Функции для регистрации/авторизации/logout ----
  const handleSignIn = (signInData) => {
    authentication
      .signIn(signInData)
      .then((res) => {
        localStorage.setItem('token', res.token);
        checkToken();
      })
      .catch((err) => {
        setIsResponseOk(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  };
  const handleSignUp = (registrationData) => {
    authentication
      .signUp(registrationData)
      .then(() => {
        setIsResponseOk(true);
        setIsTooltipOpen(true);
        navigate('/login');
      })
      .catch((err) => {
        setIsResponseOk(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  };
  const checkToken = () => {
    if (localStorage.getItem('token')) {
      authentication
        .checkToken(localStorage.getItem('token'))
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/login', { replace: true });
  };

  return (
    <IsAnyPopupOpenedContext.Provider value={isAnyPopupOpened}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Routes>
            <Route
              exact
              path="/login"
              element={
                <>
                  <Header page="login"></Header>
                  <Login onSubmit={handleSignIn} />
                </>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <>
                  <Header page="register"></Header>
                  <Register onSubmit={handleSignUp} />
                </>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    width={windowWidth}
                    page="main"
                    onLogOut={handleLogOut}
                    email={email}></Header>
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLikeClick={handleCardLike}
                    onCardDeleteClick={handleCardDelete}
                    element={Main}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdatedUserInfo={handleUpdateUser}></EditProfilePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdatedAvatar={handleUpdateAvatar}></EditAvatarPopup>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddedPlace={handleAddPlace}></AddPlacePopup>

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            succes={isResponseOk}></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </IsAnyPopupOpenedContext.Provider>
  );
}

export default App;
