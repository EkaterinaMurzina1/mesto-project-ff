const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "bce5149c-353d-4919-9045-d67ab5f6cb93",
    "Content-Type": "application/json",
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getUserInfoApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
};

export const getCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponse);
};

export const editProfileApi = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(getResponse);
};

export const addNewCardApi = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(getResponse);
};

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
};

export const setLikeCardApi = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";

  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  }).then(getResponse);
};

export const updateAvatarApi = ({ avatar }) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(getResponse);
};
