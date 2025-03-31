const showInputError = (formElement, inputElement, errorMessage, settingValid) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(settingValid.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settingValid.errorClass);
  }
};

const hideInputError = (formElement, inputElement, settingValid) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingValid.inputErrorClass);
  errorElement.classList.remove(settingValid.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settingValid) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingValid);
  } else {
    hideInputError(formElement, inputElement, settingValid);
  }
};

const setEventListeners = (formElement, settingValid) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settingValid.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settingValid.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settingValid);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settingValid);
      toggleButtonState(inputList, buttonElement, settingValid);
    });
  });
};

const enableValidation = (settingValid) => {
  const formList = Array.from(
    document.querySelectorAll(settingValid.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, settingValid);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settingValid) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingValid.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingValid.inactiveButtonClass);
  }
};

function clearValidation(formElement, settingValid) {
  const buttonElement = formElement.querySelector(
    settingValid.submitButtonSelector
  );
  if (buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingValid.inactiveButtonClass);
  }
  const inputElements = Array.from(
    formElement.querySelectorAll(settingValid.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settingValid);
  });
}

export { enableValidation, clearValidation };
