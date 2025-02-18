import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/popup";

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImgView = document.querySelector(".popup_type_image");
const previewImage = popupImgView.querySelector(".popup__image");
const popupCaption = popupImgView.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const formAddPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formAddPlace.querySelector(".popup__input_type_card-name");
const placeLinkInput = formAddPlace.querySelector(".popup__input_type_url");

function showCards(cards) {
  cards.forEach((cardContent) => {
    const card = createCard(cardContent, openPopupImage);
    placesList.append(card);
  });
}

showCards(initialCards);

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

function openPopupImage(cardImage) {
  previewImage.src = cardImage.link;
  previewImage.alt = cardImage.name;
  popupCaption.textContent = cardImage.name;
  openPopup(popupImgView);
}

function formEditSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameElement = document.querySelector(".profile__title");
  const jobElement = document.querySelector(".profile__description");

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  closePopup(popupEdit);
}

editButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openPopup(popupEdit);
});

formEditProfile.addEventListener("submit", formEditSubmit);

function formAddSubmit(event) {
  event.preventDefault();

  const namePlace = placeNameInput.value;
  const linkPlace = placeLinkInput.value;
  const newCard = createCard({ name: namePlace, link: linkPlace });

  placesList.prepend(newCard);

  closePopup(popupAdd);
  formAddPlace.reset();
}

formAddPlace.addEventListener("submit", formAddSubmit);

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});
