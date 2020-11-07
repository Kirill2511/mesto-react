import React from "react";

function ModalWithForm(props) {

  function handleClick(evt) {
    evt.preventDefault();
    console.log('Временно не работает');
  }

  return (
    <div className={`popup popup__${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button aria-label="Закрыть" className="popup__close-icon popup__close" type="button" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__fields popup__form-avatar" name={`${props.name}`} noValidate>
          {props.children}
          <button className="button popup__button" type="submit" onClick={handleClick}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm;
