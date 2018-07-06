import checkValidity from './inputValidationRules';

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
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
