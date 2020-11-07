import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

function App() {
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  function handleEditProfileClick() {
    setEditProfile(true);
  }

  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  const [isAddPlacePopupOpen, setAddCard] = React.useState(false);
  function handleAddCardClick() {
    setAddCard(true);
  }

  const [selectedCard, setSelectedCard] = React.useState(undefined);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfile(false);
    setEditAvatar(false);
    setAddCard(false);
    handleCardClick(undefined);
  }

  React.useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="page">
    <Header/>
    <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddCardClick}
          onCardClick={handleCardClick}/>
    <Footer/>

    {/* Обновить аватар */}
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      submitName="Сохранить"
    >
      <label className="popup__label">
        <input className="popup__item popup__input_avatar-link"
               id="link-avatar"
               name="avatar"
               placeholder="Ссылка на картинку"
               required
               type="url"
        />
      </label>

    </PopupWithForm>

    {/* Редактировать профиль */}
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      submitName="Сохранить"
    >

      <label className="popup__label">
        <input className="popup__item popup__name"
               id="name-input"
               maxLength="40"
               minLength="2"
               name="name"
               placeholder="Имя"
               type="text"
               required
        />
      </label>
      <label className="popup__label">
        <input className="popup__item popup__about"
               id="activity-input"
               maxLength="200"
               minLength="2"
               name="about"
               placeholder="Обо мне"
               type="text"
               required
        />
      </label>
    </PopupWithForm>

    {/* Добавить карточку */}
    <PopupWithForm
      name="addCard"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      submitName="Создать"
    >
      <label className="popup__label">
        <input className="popup__item popup__input-name"
               id="place-input"
               maxLength="30"
               minLength="1"
               name="place"
               placeholder="Название" required type="text"/>
      </label>
      <label className="popup__label">
        <input className="popup__item popup__input-url"
               id="link-input"
               name="link"
               placeholder="Ссылка на картинку"
               required type="url"/>
      </label>

    </PopupWithForm>

    {/* Попат подтверждения */}
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      onClose={closeAllPopups}
      submitName="Да"
    >
    </PopupWithForm>

    {/* Попат увелечения картинки */}
    <PopupWithImage
      card={selectedCard}
      onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
