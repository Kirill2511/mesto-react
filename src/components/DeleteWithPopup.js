import React from "react";
import PopupWithForm from "./FormWithPopup";

function DeleteWithPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <button
        aria-label="Да"
        className="popup__button popup__button_card-delete"
        name="submit"
        type="submit"
      >
        {props.isLoading ? "Удаление..." : "Да"}
      </button>
    </PopupWithForm>
  );
}

export default DeleteWithPopup;
