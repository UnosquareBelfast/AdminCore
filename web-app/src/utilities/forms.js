export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const getFormElementsArray = formData => {
  const formElementsArray = [];
  for (let key in formData) {
    formElementsArray.push({
      id: key,
      config: formData[key],
    });
  }
  return formElementsArray;
};

export const updateFormDataOnChange = (form, inputIdentifier, value) => {
  const updatedFormElement = updateObject(form[inputIdentifier], {
    value,
    valid: checkValidity(value, form[inputIdentifier].validation),
    touched: true,
  });
  return updateObject(form, {
    [inputIdentifier]: updatedFormElement,
  });
};

export const isFormValidOnChange = updatedForm => {
  let formIsValid = true;

  for (let inputIdentifier in updatedForm) {
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
  }

  return formIsValid;
};

export const getFormDataOnSubmit = form => {
  const formData = {};
  for (let formElementIdentifier in form) {
    formData[formElementIdentifier] = form[formElementIdentifier].value;
  }
  return formData;
};
