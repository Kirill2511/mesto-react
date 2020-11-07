import React from "react";

function PopupWithImage({ card, onClose }) {
	return (
		<div className={`popup popup_card-image ${card && "popup_opened"}`}>
			<div className="popup__gallery">
				<img src={card && card.link} alt={card && card.name} className="popup__image"/>
				<h2 className="popup__card-about">{card && card.name}</h2>
				<button aria-label="Закрыть" className="popup__close-icon popup__close" type="submit" onClick={onClose}/>
			</div>
		</div>
	)
}

export default PopupWithImage;
