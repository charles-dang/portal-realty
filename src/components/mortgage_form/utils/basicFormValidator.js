const validator = function handleValidationMessage(componentName, message) {
  if (componentName === "APPLICANT") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrower: { show: true, message: message }
          },
          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrower: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "CO-APPLICANT") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrower: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrower: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "borrower residence") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerResidence: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            borrowerResidence: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  } else if (componentName === "coBorrower residence") {
    if (message !== false) {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerResidence: { show: true, message: message }
          },

          showValidation: true
        };
      });
    } else {
      this.setState(currentState => {
        return {
          validation: {
            ...currentState.validation,
            coBorrowerResidence: { show: false, message: "" }
          },

          showValidation: false
        };
      });
    }
  }
};

export default validator;
