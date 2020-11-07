import React from 'react';
import { api } from "../utils/Api";
import avatar from '../images/avatar.jpg'
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, data]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button className="button profile__edit-avatar" type="button" onClick={onEditAvatar}>
          <img alt="жак-ив" className="profile__avatar" srcSet={userAvatar} src={avatar}/>
        </button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{userName}</h1>
            <button aria-label="Редактировать профиль" className="profile__edit-button" type="button" onClick={onEditProfile}/>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button aria-label="Добавить карточку" className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} />))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
