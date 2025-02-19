function createCard(cardContent, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });
  cardImage.addEventListener("click", function () {
    openPopupImage(cardContent);
  });
  likeButton.addEventListener("click", function () {
    handleLikeClick(likeButton);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard };
