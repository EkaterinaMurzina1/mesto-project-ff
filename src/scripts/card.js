import { deleteCardApi, setLikeCardApi } from "./api";

function createCard(
  cardContent,
  deleteCard,
  handleLikeClick,
  openPopupImage,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  likesCountElement.textContent = cardContent.likes.length;

  const isLiked = cardContent.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardContent.owner._id !== currentUserId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement, cardContent._id);
  });
  cardImage.addEventListener("click", function () {
    openPopupImage(cardContent);
  });
  likeButton.addEventListener("click", function () {
    handleLikeClick(likeButton, cardContent._id, likesCountElement);
  });

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.log("Ошибка:", err));
}

function handleLikeClick(likeButton, cardId, likesCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  setLikeCardApi(cardId, isLiked)
    .then((dataCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCountElement.textContent = dataCard.likes.length;
    })
    .catch((err) => console.log("Ошибка:", err));
}

export { createCard, deleteCard, handleLikeClick };
