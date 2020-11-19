import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import OpenImagePopup from "./OpenImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import DeleteWithPopup from "./DeleteWithPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [isAddPlacePopupOpen, setAddCard] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isPopupWithDeleteOpen, setPopupWithDelete] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isPopupImageOpen, setPopupImage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditProfileClick() {
    setEditProfile(true);
  }

  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  function handleAddCardClick() {
    setAddCard(true);
  }

  function handleCardClick(card) {
    setPopupImage(true);
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setPopupWithDelete(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setEditProfile(false);
    setEditAvatar(false);
    setAddCard(false);
    setPopupImage(false);
    setPopupWithDelete(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handlerEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handlerEscClose);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", handlerEscClose);
      document.removeEventListener("click", closeByOverlay);
    };
  });

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(items) {
    setIsLoading(true);
    api
      .setUserInfo(items)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);
    api
      .setUserAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .postNewCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
        <Footer />

        {/* Попат обновления аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        {/* Попат редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        {/* Попат добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          postNewCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        {/* Попат подтверждения */}
        <DeleteWithPopup
          isOpen={isPopupWithDeleteOpen}
          isClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={deletedCard}
          isLoading={isLoading}
        />

        {/* Попат увеличения картинки */}
        <OpenImagePopup
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
