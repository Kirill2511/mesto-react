import React from "react";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <button
  aria-label="Удалить"
  className="element__delete element__delete_invisible"
  name="Удалить"
  type="submit"
  onClick={handleClick}
  />
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container_like">
          <button aria-label="Лайк" className="element__heart" name="Лайк" type="submit"/>
          <p className="card__count-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
