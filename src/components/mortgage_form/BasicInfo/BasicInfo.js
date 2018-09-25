import { isEmpty } from "lodash";
import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BorrowerForm from "../components/Borrower/BorrowerForm";
import ResidenceAddress from "../components/ResidenceAddress/ResidenceAddress";
import ResidenceModal from "./addResidence";
import "./BasicInfo.css";

class BasicInfo extends Component {
  state = {
    showModal: false,
    RESIDENCE_APPLICANT_TYPE: "",
    APPLICANT_DATA: [
      {
        APPLICANT_TYPE: "",
        SSN: "",
        LAST_NAME: "",
        FIRST_NAME: "",
        EMAIL: "",
        YEARS_IN_SCHOOL: "",
        MARITAL_STATUS: "",
        HOME_PHONE: "",
        AGE: "",
        APPLICATION_ADDRESS: [
          {
            RESIDENCY_TYPE: "",
            STREET_ADDRESS: "",
            CITY: "",
            STATE: "",
            ZIP_CODE: "",
            DURATION_YEARS: "",
            DURATION_MONTHS: "",
            BASIS_TYPE: ""
          }
        ]
      }
    ]
  };

  componentDidMount() {
    this.setState({ APPLICANT_DATA: this.props.data });
  }

  componentDidUpdate(prevProps) {
    if (
      !isEmpty(this.props.data) &&
      !Object.is(prevProps.data, this.props.data)
    ) {
      this.setState({ APPLICANT_DATA: this.props.data });
      return;
    }
  }

  showResidenceModal(RESIDENCE_APPLICANT_TYPE) {
    this.setState({ RESIDENCE_APPLICANT_TYPE, showModal: true });
  }

  render() {
    const addNewResidence = (
      <Tooltip id="tooltip">Add New Residence Address</Tooltip>
    );
    return (
      <React.Fragment>
        <ResidenceModal
          addResidence={(identifier, data) =>
            this.props.addResidence(identifier, data)
          }
          RESIDENCE_APPLICANT_TYPE={this.state.RESIDENCE_APPLICANT_TYPE}
          onClose={() => this.setState({ showModal: false })}
          showModal={this.state.showModal}
        />
        <div className="basicInfo">
          <div className="borrower">
            <p className="borrower-head">Borrower</p>
            <BorrowerForm
              passValidationMessage={(componentName, message) =>
                this.props.handleValidationMessage(componentName, message)
              }
              APPLICANT_TYPE={"APPLICANT"}
              data={
                this.state.APPLICANT_DATA
                  ? this.state.APPLICANT_DATA.filter(APPLICANT_DATA => {
                      return APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT";
                    })
                  : {}
              }
              handleFormChange={this.props.handleFormChange}
              identifier={"basicBorrower"}
            />
            <div className="borrower-head employer-head">
              <p>Residence Address</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewResidence}
                onClick={() => this.showResidenceModal("basicBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
            {this.state.APPLICANT_DATA
              ? this.state.APPLICANT_DATA.map(APPLICANT_DATA => {
                  return APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT"
                    ? APPLICANT_DATA.APPLICATION_ADDRESS.map(
                        (RESIDENCE_DATA, index) => {
                          return (
                            <ResidenceAddress
                              key={index}
                              data={RESIDENCE_DATA}
                              arrayIndex={index}
                              RESIDENCE_TYPE={"borrower"}
                              passResidenceValidation={(
                                componentName,
                                message
                              ) =>
                                this.props.handleValidationMessage(
                                  componentName,
                                  message
                                )
                              }
                              handleFormChange={this.props.handleFormChange}
                              identifier={"basicResidenceBorrower"}
                            />
                          );
                        }
                      )
                    : null;
                })
              : null}
            <div className="borrower-head employer-head">
              <p>Residence Address</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewResidence}
                onClick={() => this.showResidenceModal("basicBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
          </div>
          <div className="coBorrower">
            <p className="borrower-head">Co-Borrower</p>
            <BorrowerForm
              passValidationMessage={(componentName, message) =>
                this.props.handleValidationMessage(componentName, message)
              }
              APPLICANT_TYPE={"CO-APPLICANT"}
              data={
                this.state.APPLICANT_DATA
                  ? this.state.APPLICANT_DATA.filter(APPLICANT_DATA => {
                      return APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT";
                    })
                  : {}
              }
              handleFormChange={this.props.handleFormChange}
              identifier={"basicCoBorrower"}
            />
            <div className="borrower-head employer-head">
              <p>Residence Address</p>
              <OverlayTrigger
                placement="left"
                overlay={addNewResidence}
                onClick={() => this.showResidenceModal("basicCoBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
            {this.state.APPLICANT_DATA
              ? this.state.APPLICANT_DATA.map(APPLICANT_DATA => {
                  return APPLICANT_DATA.APPLICANT_TYPE === "CO-APPLICANT"
                    ? APPLICANT_DATA.APPLICATION_ADDRESS.map((data, index) => {
                        return (
                          <ResidenceAddress
                            key={index}
                            data={data}
                            arrayIndex={index}
                            RESIDENCE_TYPE={"coBorrower"}
                            passResidenceValidation={(componentName, message) =>
                              this.props.handleValidationMessage(
                                componentName,
                                message
                              )
                            }
                            handleFormChange={this.props.handleFormChange}
                            identifier={"basicResidenceCoBorrower"}
                          />
                        );
                      })
                    : null;
                })
              : null}
            <div className="borrower-head employer-head">
              <p>Residence Address</p>
              <OverlayTrigger
                placement="left"
                overlay={addNewResidence}
                onClick={() => this.showResidenceModal("basicCoBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BasicInfo;
