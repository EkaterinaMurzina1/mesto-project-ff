(()=>{"use strict";function e(e,t){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image"),r=n.querySelector(".card__title"),c=n.querySelector(".card__delete-button"),p=n.querySelector(".card__like-button");return o.src=e.link,o.alt=e.name,r.textContent=e.name,c.addEventListener("click",(function(){!function(e){e.remove()}(n)})),o.addEventListener("click",(function(){t(e)})),p.addEventListener("click",(function(){!function(e){e.classList.toggle("card__like-button_is-active")}(p)})),n}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}var r=document.querySelector(".places__list"),c=document.querySelectorAll(".popup"),p=document.querySelector(".popup_type_edit"),u=document.querySelector(".popup_type_new-card"),i=document.querySelector(".popup_type_image"),d=i.querySelector(".popup__image"),l=i.querySelector(".popup__caption"),a=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),_=document.querySelectorAll(".popup__close"),m=document.querySelector('form[name="edit-profile"]'),y=m.querySelector(".popup__input_type_name"),f=m.querySelector(".popup__input_type_description"),v=document.querySelector('form[name="new-place"]'),k=v.querySelector(".popup__input_type_card-name"),q=v.querySelector(".popup__input_type_url");function S(e){d.src=e.link,d.alt=e.name,l.textContent=e.name,t(i)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(t){var n=e(t,S);r.append(n)})),s.addEventListener("click",(function(){t(u)})),a.addEventListener("click",(function(){y.value=document.querySelector(".profile__title").textContent,f.value=document.querySelector(".profile__description").textContent,t(p)})),m.addEventListener("submit",(function(e){e.preventDefault();var t=y.value,o=f.value,r=document.querySelector(".profile__title"),c=document.querySelector(".profile__description");r.textContent=t,c.textContent=o,n(p)})),v.addEventListener("submit",(function(t){t.preventDefault();var o=e({name:k.value,link:q.value});r.prepend(o),n(u),v.reset()})),_.forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup"))}))})),c.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))}))})();