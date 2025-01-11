// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardContent) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;
    cardTitle.textContent = cardContent.name;
    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу
function showCards(cards) {
    cards.forEach(cardContent => {
        const card = createCard(cardContent);
        placesList.append(card);
    });
}
showCards(initialCards);