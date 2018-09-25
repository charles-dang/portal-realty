import { Auth } from "./FormAuth";
const handleValidationChecks = function handleValidationChecks() {
  let validationState = true;
  const valCheck1 = Auth.validateDeclarationForm({
    ...this.state.data.PROPERTY_INFORMATION,
    ...this.state.data.DOWN_PAYMENT,
    ...this.state.data.DETAILS_OF_TRANSACTION,
    ...this.state.data.MORTGATE_TYPE_AND_TERMS,
    ...this.state.data.DECLARATIONS
  });
  if (valCheck1) {
    this.setState(currentState => {
      return {
        tabsValidationMessage: valCheck1,
        key: 1,
        showValidationModal: true
      };
    });
    return (validationState = false);
  }
  this.state.data.APPLICANT_DATA.forEach(APPLICANT_DATA => {
    const valCheck2 = Auth.validateBorrowerForm(APPLICANT_DATA);
    if (valCheck2) {
      this.setState({
        tabsValidationMessage: valCheck2,
        key: 2,
        showValidationModal: true
      });
      return (validationState = false);
    }
    APPLICANT_DATA.APPLICATION_ADDRESS.forEach(RESIDENCE => {
      const valCheck3 = Auth.validateResidenceForm(RESIDENCE);
      if (valCheck3) {
        this.setState({
          tabsValidationMessage: valCheck3,
          key: 2,
          showValidationModal: true
        });
        return (validationState = false);
      }
    });
  });
  this.state.data.APPLICANT_DATA.forEach(APPLICANT_DATA => {
    APPLICANT_DATA.APPLICATION_EMPLOYER.forEach(EMPLOYER => {
      const valCheck4 = Auth.validateEmployerForm(EMPLOYER);
      if (valCheck4) {
        this.setState({
          tabsValidationMessage: valCheck4,
          key: 3,
          showValidationModal: true
        });
        return (validationState = false);
      }
    });
  });
  return validationState;
};

export default handleValidationChecks;
