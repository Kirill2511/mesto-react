import React from 'react';
import close from "../images/close-Icon.svg";

function ButtonClose(props) {
  return (
    <img className="button popup__close"
         onClick={props.closeHandler}
         src={close}
         alt="Закрыть"
    />
  );
}

export default ButtonClose;
