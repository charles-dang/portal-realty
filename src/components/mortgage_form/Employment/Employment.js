import { isEmpty } from "lodash";
import React, { Component } from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import EmploymentForm from "../components/EmploymentForm/EmploymentForm";
import { Auth } from "../utils/FormAuth";
import EmploymentModal from "./addEmployment";
import "./Employment.css";

class Employment extends Component {
  state = {
    showModal: false,
    EMPLOYMENT_APPLICANT_TYPE: "",
    borrowerFirstName: "",
    borrowerLastName: "",
    borrowerMiddleName: "",
    coborrowerFirstName: "",
    coborrowerLastName: "",
    coborrowerMiddleName: "",
    borrowerEmployer: [{}],
    coborrowerEmployer: [{}]
  };

  componentDidUpdate(prevProps) {
    if (
      !isEmpty(this.props.data) &&
      !Object.is(prevProps.data, this.props.data)
    ) {
      this.props.data.forEach(APPLICANT_DATA => {
        if (APPLICANT_DATA.APPLICANT_TYPE === "APPLICANT") {
          this.setState({
            borrowerFirstName: APPLICANT_DATA.FIRST_NAME,
            borrowerLastName: APPLICANT_DATA.LAST_NAME,
            borrowerMiddleName: APPLICANT_DATA.MIDDLE_NAME,
            borrowerEmployer: APPLICANT_DATA.APPLICATION_EMPLOYER
              ? APPLICANT_DATA.APPLICATION_EMPLOYER
              : [{}]
          });
        } else {
          this.setState({
            coborrowerFirstName: APPLICANT_DATA.FIRST_NAME,
            coborrowerLastName: APPLICANT_DATA.LAST_NAME,
            coborrowerMiddleName: APPLICANT_DATA.MIDDLE_NAME,
            coborrowerEmployer: APPLICANT_DATA.APPLICATION_EMPLOYER
              ? APPLICANT_DATA.APPLICATION_EMPLOYER
              : [{}]
          });
        }
      });
      return;
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleValidation(e);
  }

  handleValidation(e) {
    const currentState = this.state;
    currentState[e.target.name] = e.target.value;
    let ComponentName = "borrowerName";
    if (e.target.name.slice(0, 2) === "co") {
      ComponentName = "coBorrowerName";
      const validationMessage = Auth.validateCoBorrowerEmployerFormNames(
        currentState
      );
      this.props.handleValidationMessage(`${ComponentName}`, validationMessage);
    } else {
      const validationMessage = Auth.validateBorrowerEmployerFormNames(
        currentState
      );
      this.props.handleValidationMessage(`${ComponentName}`, validationMessage);
    }
  }

  handleFormChange(e) {
    let componentName = "borrowerName";
    if (e.target.name.slice(0, 2) === "co") {
      componentName = "coBorrowerName";
    }
    this.props.handleFormChange(
      this.state,
      componentName,
      this.props.arrayIndex
    );
  }

  handleBasicInfo(e) {
    let componentName = "employmentBorrower";
    if (e.target.name.slice(0, 2) === "co") {
      componentName = "employmentCoBorrower";
      this.props.handleFormChange(
        {
          FIRST_NAME: this.state.coborrowerFirstName,
          LAST_NAME: this.state.coborrowerLastName,
          MIDDLE_NAME: this.state.coborrowerMiddleName
        },
        componentName
      );
      return;
    }
    this.props.handleFormChange(
      {
        FIRST_NAME: this.state.borrowerFirstName,
        LAST_NAME: this.state.borrowerLastName,
        MIDDLE_NAME: this.state.borrowerMiddleName
      },
      componentName
    );
  }

  showEmploymentModal(EMPLOYMENT_APPLICANT_TYPE) {
    this.setState({ EMPLOYMENT_APPLICANT_TYPE, showModal: true });
  }

  render() {
    const addNewEmployer = <Tooltip id="tooltip">Add New Employer</Tooltip>;
    return (
      <React.Fragment>
        <EmploymentModal
          addEmployment={(identifier, data) =>
            this.props.addEmployment(identifier, data)
          }
          EMPLOYMENT_APPLICANT_TYPE={this.state.EMPLOYMENT_APPLICANT_TYPE}
          onClose={() => this.setState({ showModal: false })}
          showModal={this.state.showModal}
        />
        <div className="employment">
          <div className="borrower">
            <p className="borrower-head">Borrower</p>
            <div className="borrowerFormEmployment nameDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Name
                  </ControlLabel>
                </Col>
                <Col md={9} className="singleLineDiv">
                  <FormControl
                    type="text"
                    value={this.state.borrowerFirstName}
                    placeholder="First Name"
                    className={!this.state.borrowerFirstName ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="borrowerFirstName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                  <FormControl
                    type="text"
                    value={this.state.borrowerMiddleName}
                    placeholder="MI"
                    className={!this.state.borrowerMiddleName ? "validate" : ""}
                    style={{ width: "25%" }}
                    onChange={e => this.handleChange(e)}
                    name="borrowerMiddleName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                  <FormControl
                    type="text"
                    value={this.state.borrowerLastName}
                    placeholder="Last Name"
                    className={!this.state.borrowerLastName ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="borrowerLastName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                </Col>
              </Row>
            </div>
            <div className="borrower-head employer-head">
              <p>Employment</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewEmployer}
                onClick={() => this.showEmploymentModal("employmentBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
            {this.state.borrowerEmployer.map((data, index) => {
              return (
                <EmploymentForm
                  passEmployerValidation={(componentName, message) =>
                    this.props.handleValidationMessage(componentName, message)
                  }
                  data={data}
                  handleFormChange={this.props.handleFormChange}
                  arrayIndex={index}
                  identifier={"employerBorrower"}
                  APPLICANT_TYPE={"borrower"}
                  key={index}
                />
              );
            })}
            <div className="borrower-head employer-head">
              <p>Employment</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewEmployer}
                onClick={() => this.showEmploymentModal("employmentBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
          </div>
          <div className="coBorrower">
            <p className="borrower-head">Co-Borrower</p>
            <div className="coborrowerFormEmployment nameDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Name
                  </ControlLabel>
                </Col>
                <Col md={9} className="singleLineDiv">
                  <FormControl
                    type="text"
                    value={this.state.coborrowerFirstName}
                    placeholder="First Name"
                    className={
                      !this.state.coborrowerFirstName ? "validate" : ""
                    }
                    onChange={e => this.handleChange(e)}
                    name="coborrowerFirstName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                  <FormControl
                    type="text"
                    value={this.state.coborrowerMiddleName}
                    placeholder="Middle Name"
                    className={
                      !this.state.coborrowerMiddleName ? "validate" : ""
                    }
                    style={{ width: "25%" }}
                    onChange={e => this.handleChange(e)}
                    name="coborrowerMiddleName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                  <FormControl
                    type="text"
                    value={this.state.coborrowerLastName}
                    placeholder="Last Name"
                    className={!this.state.coborrowerLastName ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="coborrowerLastName"
                    onBlur={e => this.handleBasicInfo(e)}
                  />
                </Col>
              </Row>
            </div>
            <div className="borrower-head employer-head">
              <p>Employment</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewEmployer}
                onClick={() => this.showEmploymentModal("employmentCoBorrower")}
              >
                <i className="fas fa-plus" />
              </OverlayTrigger>
            </div>
            {this.state.coborrowerEmployer.map((data, index) => {
              return (
                <EmploymentForm
                  passEmployerValidation={(componentName, message) =>
                    this.props.handleValidationMessage(componentName, message)
                  }
                  data={data}
                  handleFormChange={this.props.handleFormChange}
                  arrayIndex={index}
                  identifier={"employerCoBorrower"}
                  APPLICANT_TYPE={"coBorrower"}
                  key={index}
                />
              );
            })}
            <div className="borrower-head employer-head">
              <p>Employment</p>
              <OverlayTrigger
                placement="top"
                overlay={addNewEmployer}
                onClick={() => this.showEmploymentModal("employmentCoBorrower")}
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

export default Employment;
