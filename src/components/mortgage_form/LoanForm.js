import { isEmpty } from "lodash";
import React, { Component } from "react";
import { Modal, Pager, Tab, Tabs } from "react-bootstrap";
import dataScaffolding from "./constants/dataScaffolding";
import handleValidationMessage from "./utils/basicFormValidator";
import handledeclarationValidationMessage from "./utils/declarationFormValidator";
import handleEmployerValidationMessage from "./utils/employmentFormValidator";
import handleFormChange from "./utils/formChangeListener";
import handleValidationChecks from "./utils/submitValidationChecks";
import AdditionalProperties from "./AdditionalProperties/AdditionalProperties";
import "./form.css";
import Assets from "./Assets/Assets";
import BasicInfo from "./BasicInfo/BasicInfo";
import Declaration from "./Declaration/Declaration";
import Employment from "./Employment/Employment";

class LoanForm extends Component {
  constructor(props) {
    super(props);
    this.handleValidationMessage = handleValidationMessage.bind(this);
    this.handleEmployerValidationMessage = handleEmployerValidationMessage.bind(
      this
    );
    this.handledeclarationValidationMessage = handledeclarationValidationMessage.bind(
      this
    );
    this.handleFormChange = handleFormChange.bind(this);
    this.handleValidationChecks = handleValidationChecks.bind(this);
  }

  state = {
    data: !isEmpty(this.props.data) ? this.props.data : dataScaffolding,
    initialData: {},
    key: 1,
    disbaleForward: false,
    disableBackward: false,
    showValidation: false,
    enableSubmitPager: false,
    showValidationModal: false,
    tabsValidationMessage: "",
    validation: {
      borrower: { show: false, message: "" },
      coBorrower: { show: false, message: "" },
      borrowerResidence: { show: false, message: "" },
      coBorrowerResidence: { show: false, message: "" },
      borrowerName: { show: false, message: "" },
      coBorrowerName: { show: false, message: "" },
      borrowerEmployment: { show: false, message: "" },
      coBorrowerEmployment: { show: false, message: "" },
      declarationValidation: { show: false, message: "" }
    }
  };

  componentDidMount() {
    this.handlePagerDisable(this.state.key);
    fetch(
      "https://0qedt3i0f8.execute-api.us-west-2.amazonaws.com/dev/api/loan",
      { method: "GET" }
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ data: res, initialData: res });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleSubmit() {
    const validationCheck = this.handleValidationChecks();
    if (validationCheck) {
      console.log("submitted data", this.state.data);
      if (isEmpty(this.state.initialData)) {
        fetch(
          "https://0qedt3i0f8.execute-api.us-west-2.amazonaws.com/dev/api/loan",
          {
            method: "POST",
            body: JSON.stringify(this.state.data)
          }
        ).then(() => console.log("New form submitted", this.state.data));
      } else {
        fetch(
          "https://0qedt3i0f8.execute-api.us-west-2.amazonaws.com/dev/api/loan",
          {
            method: "PUT",
            body: JSON.stringify(this.state.data)
          }
        ).then(() => console.log("form edited", this.state.data));
      }
    } else {
      this.setState({ showValidationModal: true });
    }
  }

  addResidence(identifier, residenceData) {
    if (identifier === "basicBorrower") {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
            if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
              const newResidenceData = APPLICANT_DATA.APPLICATION_ADDRESS;
              newResidenceData.push(residenceData);
              APPLICANT_DATA.APPLICATION_ADDRESS = newResidenceData;
            }
            return APPLICANT_DATA;
          })
        }
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
            if (APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT") {
              const newResidenceData = APPLICANT_DATA.APPLICATION_ADDRESS;
              newResidenceData.push(residenceData);
              APPLICANT_DATA.APPLICATION_ADDRESS = newResidenceData;
            }
            return APPLICANT_DATA;
          })
        }
      });
    }
  }

  addEmployment(identifier, employerData) {
    if (identifier === "employmentBorrower") {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
            if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
              const EMPLOYMENT_DETAILS = APPLICANT_DATA.APPLICATION_EMPLOYER;
              EMPLOYMENT_DETAILS.push(employerData);
              APPLICANT_DATA.APPLICATION_EMPLOYER = EMPLOYMENT_DETAILS;
            }
            return APPLICANT_DATA;
          })
        }
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          APPLICANT_DATA: this.state.data.APPLICANT_DATA.map(APPLICANT_DATA => {
            if (APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT") {
              const EMPLOYMENT_DETAILS = APPLICANT_DATA.APPLICATION_EMPLOYER;
              EMPLOYMENT_DETAILS.push(employerData);
              APPLICANT_DATA.APPLICATION_EMPLOYER = EMPLOYMENT_DETAILS;
            }
            return APPLICANT_DATA;
          })
        }
      });
    }
  }

  handleTabChangeForward = () => {
    this.setState(currentState => {
      return {
        key: currentState.key + 1
      };
    });
    this.handlePagerDisable(this.state.key + 1);
  };

  handleTabChangeBackwards = () => {
    this.setState(currentState => {
      return {
        key: currentState.key - 1
      };
    });
    this.handlePagerDisable(this.state.key - 1);
  };

  handleSelect = key => {
    this.setState({ key });
    this.handlePagerDisable(key);
  };

  handlePagerDisable(key) {
    if (key === 1) {
      this.setState({
        disableBackward: true
      });
    } else if (key === 5) {
      this.setState({
        disableForward: true,
        enableSubmitPager: true
      });
    } else {
      this.setState({
        disableForward: false,
        disableBackward: false,
        enableSubmitPager: false
      });
    }
  }

  closeValidationModal() {
    this.setState({
      showValidationModal: false
    });
  }

  render() {
    const {
      borrower,
      coBorrower,
      borrowerResidence,
      coBorrowerResidence,
      borrowerName,
      coBorrowerName,
      borrowerEmployment,
      coBorrowerEmployment,
      declarationValidation
    } = this.state.validation;
    return (
      <div className="App">
        <Tabs
          activeKey={this.state.key}
          onSelect={key => this.handleSelect(key)}
          className="tabs"
          bsStyle="tabs"
          id="1"
        >
          <Tab
            tabClassName="main-tabs main-tabs-right-border"
            eventKey={1}
            title="Declaration & Documents"
          >
            <Declaration
              handleValidationMessage={(componentName, message) =>
                this.handledeclarationValidationMessage(componentName, message)
              }
              handleFormChange={(data, identifier) =>
                this.handleFormChange(data, identifier)
              }
              data={{
                ...this.state.data.DECLARATIONS,
                MORTGATE_TYPE_AND_TERMS: this.state.data
                  .MORTGATE_TYPE_AND_TERMS,
                PROPERTY_INFORMATION: this.state.data.PROPERTY_INFORMATION,
                DOWN_PAYMENT: this.state.data.DOWN_PAYMENT,
                DETAILS_OF_TRANSACTION: this.state.data.DETAILS_OF_TRANSACTION
              }}
            />
          </Tab>
          <Tab
            tabClassName="main-tabs main-tabs-right-border"
            eventKey={2}
            title="Basic Info"
          >
            <BasicInfo
              data={this.state.data.APPLICANT_DATA}
              addResidence={(identifier, data) =>
                this.addResidence(identifier, data)
              }
              handleValidationMessage={(componentName, message) =>
                this.handleValidationMessage(componentName, message)
              }
              handleFormChange={(data, identifier, arrayIndex) =>
                this.handleFormChange(data, identifier, arrayIndex)
              }
            />
          </Tab>
          <Tab
            tabClassName="main-tabs main-tabs-right-border"
            eventKey={3}
            title="Employment"
          >
            <Employment
              handleValidationMessage={(componentName, message) =>
                this.handleEmployerValidationMessage(componentName, message)
              }
              addEmployment={(identifier, data) =>
                this.addEmployment(identifier, data)
              }
              handleFormChange={(data, identifier, arrayIndex) =>
                this.handleFormChange(data, identifier, arrayIndex)
              }
              data={this.state.data.APPLICANT_DATA}
            />
          </Tab>
          <Tab
            tabClassName="main-tabs main-tabs-right-border"
            eventKey={4}
            title="Assets"
          >
            <Assets
              handleFormChange={(data, identifier) =>
                this.handleFormChange(data, identifier)
              }
              data={this.state.data.ASSETS}
            />
          </Tab>
          <Tab
            tabClassName="main-tabs main-tabs-right-border"
            eventKey={5}
            title="Additional Properties"
          >
            <AdditionalProperties
              handleFormChange={(data, identifier) =>
                this.handleFormChange(data, identifier)
              }
              data={this.state.data.ASSETS}
            />
          </Tab>
        </Tabs>
        <div className="validationModal">
          <Modal
            show={this.state.showValidationModal}
            onHide={() => this.closeValidationModal()}
          >
            <Modal.Header closeButton>
              {this.state.tabsValidationMessage}
            </Modal.Header>
          </Modal>
        </div>
        {this.state.showValidation ? (
          <div className="validationTab">
            {borrower.show
              ? borrower.message
              : coBorrower.show
                ? coBorrower.message
                : borrowerResidence.show
                  ? borrowerResidence.message
                  : coBorrowerResidence.show
                    ? coBorrowerResidence.message
                    : borrowerName.show
                      ? borrowerName.message
                      : coBorrowerName.show
                        ? coBorrowerName.message
                        : borrowerEmployment.show
                          ? borrowerEmployment.message
                          : coBorrowerEmployment.show
                            ? coBorrowerEmployment.message
                            : declarationValidation.show
                              ? declarationValidation.message
                              : null}
          </div>
        ) : null}
        <Pager>
          <Pager.Item
            disabled={this.state.disableBackward}
            onClick={() => this.handleTabChangeBackwards()}
            href="#"
          >
            <i className="fas fa-angle-double-left" />
          </Pager.Item>
          {this.state.enableSubmitPager ? (
            <Pager.Item onClick={() => this.handleSubmit()} href="#">
              Submit
            </Pager.Item>
          ) : (
            <Pager.Item
              disabled={this.state.disableForward}
              onClick={() => this.handleTabChangeForward()}
              href="#"
            >
              Next
            </Pager.Item>
          )}
        </Pager>
      </div>
    );
  }
}

export default LoanForm;
