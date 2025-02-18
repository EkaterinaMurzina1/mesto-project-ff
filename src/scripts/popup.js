function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEsc);
}

function pressEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

export { openPopup, closePopup };
