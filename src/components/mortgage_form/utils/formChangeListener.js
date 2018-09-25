const handleFormChange = function handleFormChange(
  data,
  identifier,
  arrayIndex
) {
  //console.log(data, identifier);
  if (identifier === "basicBorrower" || identifier === "employmentBorrower") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
            APPLICANT_DATA = { ...APPLICANT_DATA, ...data };
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (
    identifier === "basicCoBorrower" ||
    identifier === "employmentCoBorrower"
  ) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT") {
            APPLICANT_DATA = { ...APPLICANT_DATA, ...data };
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (identifier === "basicResidenceBorrower") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
            const newResidenceData = APPLICANT_DATA.APPLICATION_ADDRESS.map(
              (RESIDENCE_ADDRESS, i) => {
                if (i === arrayIndex) {
                  return data;
                }
                return RESIDENCE_ADDRESS;
              }
            );
            APPLICANT_DATA.APPLICATION_ADDRESS = newResidenceData;
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (identifier === "basicResidenceCoBorrower") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT") {
            const newResidenceData = APPLICANT_DATA.APPLICATION_ADDRESS.map(
              (RESIDENCE_ADDRESS, i) => {
                if (i === arrayIndex) {
                  return data;
                }
                return RESIDENCE_ADDRESS;
              }
            );
            APPLICANT_DATA.APPLICATION_ADDRESS = newResidenceData;
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (
    identifier === "borrowerName" ||
    identifier === "employerBorrower"
  ) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
            const newEmployerdata = APPLICANT_DATA.APPLICATION_EMPLOYER.map(
              (EMPLOYMENT_DETAILS, i) => {
                if (i === arrayIndex) {
                  return data;
                }
                return EMPLOYMENT_DETAILS;
              }
            );
            APPLICANT_DATA.APPLICATION_EMPLOYER = newEmployerdata;
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (
    identifier === "coBorrowerName" ||
    identifier === "employerCoBorrower"
  ) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
          if (APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT") {
            const newEmployerdata = APPLICANT_DATA.APPLICATION_EMPLOYER.map(
              (EMPLOYMENT_DETAILS, i) => {
                if (i === arrayIndex) {
                  return data;
                }
                return EMPLOYMENT_DETAILS;
              }
            );
            APPLICANT_DATA.APPLICATION_EMPLOYER = newEmployerdata;
          }
          return APPLICANT_DATA;
        })
      }
    });
  } else if (identifier === "assets") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ASSETS: { ...this.state.data.ASSETS, ...data }
      }
    });
  } else if (identifier === "mortgageInfo") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        MORTGATE_TYPE_AND_TERMS: data
      }
    });
  } else if (identifier === "propertyInfo") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        PROPERTY_INFORMATION: data
      }
    });
  } else if (identifier === "declaration") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        declaration: data
      }
    });
  } else if (identifier === "mortgageInfo") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        MORTGATE_TYPE_AND_TERMS: data
      }
    });
  } else if (identifier === "propertyInfo") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        PROPERTY_INFORMATION: data
      }
    });
  } else if (identifier === "DETAILS_OF_TRANSACTION") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        DETAILS_OF_TRANSACTION: data
      }
    });
  } else if (identifier === "DOWN_PAYMENT") {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        DOWN_PAYMENT: data
      }
    });
  }
};

export default handleFormChange;
