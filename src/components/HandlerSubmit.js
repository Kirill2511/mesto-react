import React from "react";

function HandlerSubmit(props) {
  return (
    <button type="submit" className={`popup__button`}>
      {props.onClick ? "Сохранение..." : props.button}
    </button>
  );
}

export default HandlerSubmit;
