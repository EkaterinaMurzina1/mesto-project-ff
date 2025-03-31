import "./pages/index.css";
import { createCard, deleteCard, handleLikeClick } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/popup";
import { enableValidation, clearValidation } from "./scripts/validation";
import { getUserInfoApi, getCardsApi, editProfileApi, addNewCardApi, updateAvatarApi } from "./scripts/api";

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupImgView = document.querySelector(".popup_type_image");

const previewImage = popupImgView.querySelector(".popup__image");
const popupCaptionImg = popupImgView.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const formEditProfile = document.querySelector('form[name="edit-profile"]');

const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const formAddPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formAddPlace.querySelector(".popup__input_type_card-name");
const placeLinkInput = formAddPlace.querySelector(".popup__input_type_url");

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

const profilePopupAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = profilePopupAvatar.querySelector('form[name="profile-avatar"]');
const avatarLinkInput = formEditAvatar.querySelector(".popup__input_type_avatar");
const profileAvatar = document.querySelector(".profile__image");
let currentUserId;

addButton.addEventListener("click", function () {
  formAddPlace.reset();
  clearValidation(formAddPlace, settingValid);
  openPopup(popupAddNewCard);
});

profileAvatar.addEventListener("click", function () {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, settingValid);
  openPopup(profilePopupAvatar);
});

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  clearValidation(formEditProfile, settingValid);
  openPopup(popupEditProfile);
});

function formEditSubmit(event) {
  event.preventDefault();
  renderLoading(true, formEditProfile);
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  editProfileApi({ name: nameValue, about: jobValue })
    .then((userInfo) => {
      nameElement.textContent = userInfo.name;
      jobElement.textContent = userInfo.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => console.log("Ошибка:", err))
    .finally(() => {
      renderLoading(false, formEditProfile);
    });
}

function openPopupImage(cardImage) {
  previewImage.src = cardImage.link;
  previewImage.alt = cardImage.name;
  popupCaptionImg.textContent = cardImage.name;
  openPopup(popupImgView);
}

function formAddSubmit(event) {
  event.preventDefault();
  renderLoading(true, formAddPlace);
  const namePlace = placeNameInput.value;
  const linkPlace = placeLinkInput.value;
  addNewCardApi({ name: namePlace, link: linkPlace })
    .then((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        handleLikeClick,
        openPopupImage,
        currentUserId
      );
      addCard(newCard, true);
      formAddPlace.reset();
      closePopup(popupAddNewCard);
    })
    .catch((err) => console.log("Ошибка:", err))
    .finally(() => {
      renderLoading(false, formAddPlace);
    });
}

function formEditAvatarSubmit(event) {
  event.preventDefault();
  renderLoading(true, formEditAvatar);
  const avatarLink = avatarLinkInput.value;

  updateAvatarApi({ avatar: avatarLink })
    .then((avatarInfo) => {
      profileAvatar.style.backgroundImage = `url(${avatarInfo.avatar})`;
      formEditAvatar.reset();
      closePopup(profilePopupAvatar);
    })
    .catch((err) => console.log("Ошибка:", err))
    .finally(() => {
      renderLoading(false, formEditAvatar);
    });
}

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

function addCard(cardElement, toStart) {
  if (toStart) {
    placesList.prepend(cardElement);
  } else {
    placesList.append(cardElement);
  }
}

Promise.all([getUserInfoApi(), getCardsApi()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    nameElement.textContent = userData.name;
    jobElement.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        handleLikeClick,
        openPopupImage,
        currentUserId
      );
      addCard(newCard);
    });
  })
  .catch((err) => console.log("Ошибка:", err));

const settingValid = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const renderLoading = (isLoading, formElement) => {
  const saveButton = formElement.querySelector(".popup__button");
  if (isLoading) {
    saveButton.setAttribute("data-text", saveButton.textContent);
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = saveButton.getAttribute("data-text");
    saveButton.removeAttribute("data-text");
  }
};

formEditProfile.addEventListener("submit", formEditSubmit);
formEditAvatar.addEventListener("submit", formEditAvatarSubmit);
formAddPlace.addEventListener("submit", formAddSubmit);
enableValidation(settingValid);
