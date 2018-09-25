const employerValidator = function handleEmployerValidationMessage(
  componentName,
  message
) {
  if (componentName === "borrowerName") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerName: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerName: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "coBorrowerName") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerName: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerName: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "borrower employer") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerEmployment: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerEmployment: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "coBorrower employer") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerEmployment: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerEmployment: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  }
};

export default employerValidator;
