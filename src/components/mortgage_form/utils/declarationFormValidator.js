const handledeclarationValidationMessage = function handledeclarationValidationMessage(
  componentName,
  message
) {
  if (message !== false) {
    this.setState(currentState => {
      return {
        validation: {
          ...currentState.validation,
          declarationValidation: { show: true, message: message }
        },
        showValidation: true
      };
    });
  } else {
    this.setState(currentState => {
      return {
        validation: {
          ...currentState.validation,
          declarationValidation: { show: false, message: "" }
        },
        showValidation: false
      };
    });
  }
};

export default handledeclarationValidationMessage;
