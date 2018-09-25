import React, { Component } from "react";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Modal,
  Row
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

import { Auth } from "../utils/FormAuth";

class EmploymentModal extends Component {
  state = {
    show: false,
    validationMessage: "",
    EMPLOYMENT_APPLICANT_TYPE: "",
    validationDone: false,
    ADDRESS_1: "",
    ADDRESS_2: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    COUNTRY: "",
    START_DATE: new Date(),
    END_DATE: new Date(),
    EMPLOYMENT_POSITION_DESCRIPTION: "",
    PHONE_NUMBER: "",
    INCOME: "",
    EMPLOYER_NAME: "",
    employmentPresent: false,
    APPLICANT_TYPE: ""
  };

  handleClose() {
    this.props.onClose();
    this.setState({
      show: false,
      validationMessage: "",
      EMPLOYMENT_APPLICANT_TYPE: "",
      validationDone: false,
      ADDRESS_1: "",
      ADDRESS_2: "",
      CITY: "",
      STATE: "",
      ZIP_CODE: "",
      COUNTRY: "",
      START_DATE: new Date(),
      END_DATE: new Date(),
      EMPLOYMENT_POSITION_DESCRIPTION: "",
      PHONE_NUMBER: "",
      INCOME: "",
      EMPLOYER_NAME: "",
      employmentPresent: false,
      APPLICANT_TYPE: ""
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    this.handleClose();
    this.props.addEmployment(this.state.EMPLOYMENT_APPLICANT_TYPE, this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleValidation(e);
  }

  handleValidation(e) {
    const currentState = this.state;
    currentState[e.target.name] = e.target.value;
    const validationMessage = Auth.validateEmployerForm({
      ...currentState,
      APPLICANT_TYPE: this.props.APPLICANT_TYPE
    });
    if (!validationMessage) {
      this.setState({
        validationDone: true,
        validationMessage: ""
      });
    } else {
      this.setState({
        validationMessage: validationMessage,
        validationDone: false
      });
    }
  }

  handleCheckbox() {
    this.setState({
      employmentPresent: !this.state.employmentPresent,
      END_DATE: moment()
    });
  }

  startDateChange(date) {
    this.setState({
      START_DATE: date
    });
  }

  endDateChange(date) {
    this.setState({
      END_DATE: date
    });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      show: props.showModal,
      EMPLOYMENT_APPLICANT_TYPE: props.EMPLOYMENT_APPLICANT_TYPE
    };
  }
  render() {
    return (
      <div className="EmploymentModal">
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>Add Employment</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup className="addDiv">
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ marginTop: "12px" }}>
                      Company Name
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <div className="addInputDiv">
                      <FormControl
                        type="text"
                        value={this.state.EMPLOYER_NAME}
                        placeholder="Company Name"
                        className={!this.state.EMPLOYER_NAME ? "validate" : ""}
                        onChange={e => this.handleChange(e)}
                        name="EMPLOYER_NAME"
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="addRow">
                  <Col md={3}>
                    <div>
                      <ControlLabel style={{ marginTop: "12px" }}>
                        Address
                      </ControlLabel>
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="addInputDiv">
                      <FormControl
                        type="text"
                        name="ADDRESS_1"
                        value={this.state.ADDRESS_1}
                        placeholder="Address 1"
                        className={!this.state.ADDRESS_1 ? "validate" : ""}
                        onChange={e => this.handleChange(e)}
                      />
                      <FormControl
                        type="text"
                        name="ADDRESS_2"
                        value={this.state.ADDRESS_2}
                        placeholder="Address 2"
                        className={!this.state.ADDRESS_2 ? "validate" : ""}
                        onChange={e => this.handleChange(e)}
                      />
                      <div className="singleLineDiv">
                        <FormControl
                          type="text"
                          name="CITY"
                          style={{ width: "40%" }}
                          value={this.state.CITY}
                          placeholder="City"
                          className={!this.state.CITY ? "validate" : ""}
                          onChange={e => this.handleChange(e)}
                        />
                        <FormControl
                          type="text"
                          style={{ width: "20%" }}
                          value={this.state.STATE}
                          placeholder="State"
                          className={!this.state.STATE ? "validate" : ""}
                          name="STATE"
                          onChange={e => this.handleChange(e)}
                        />
                        <FormControl
                          type="text"
                          style={{ width: "30%" }}
                          value={this.state.ZIP_CODE}
                          placeholder="Zip Code"
                          className={!this.state.ZIP_CODE ? "validate" : ""}
                          name="ZIP_CODE"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="addRow">
                  <Col md={3} />
                  <Col md={4} />
                  <Col md={5}>
                    <div className="countryDiv">
                      <ControlLabel style={{ margin: "auto 8px" }}>
                        Country
                      </ControlLabel>
                      <FormControl
                        type="text"
                        name="COUNTRY"
                        value={this.state.COUNTRY}
                        placeholder="COUNTRY"
                        className={!this.state.COUNTRY ? "validate" : ""}
                        onChange={e => this.handleChange(e)}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <div className="EMPLOYMENT_POSITION_DESCRIPTIONDiv">
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Title
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      value={this.state.EMPLOYMENT_POSITION_DESCRIPTION}
                      placeholder="Title"
                      className={
                        !this.state.EMPLOYMENT_POSITION_DESCRIPTION
                          ? "validate"
                          : ""
                      }
                      onChange={e => this.handleChange(e)}
                      name="EMPLOYMENT_POSITION_DESCRIPTION"
                    />
                  </Col>
                </Row>
              </div>
              <div className="PHONE_NUMBERDiv">
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Phone
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      value={this.state.PHONE_NUMBER}
                      placeholder="Phone"
                      className={!this.state.PHONE_NUMBER ? "validate" : ""}
                      onChange={e => this.handleChange(e)}
                      name="PHONE_NUMBER"
                    />
                  </Col>
                </Row>
              </div>
              <div className="INCOMEDiv">
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Monthly Income
                    </ControlLabel>
                  </Col>
                  <Col md={3} />
                  <Col md={6}>
                    <FormControl
                      type="text"
                      value={this.state.INCOME}
                      placeholder="$"
                      className={!this.state.INCOME ? "validate" : ""}
                      onChange={e => this.handleChange(e)}
                      name="INCOME"
                    />
                  </Col>
                </Row>
              </div>
              <FormGroup className="sinceDiv">
                <Row className="addRow rowAlign">
                  <Col md={3}>
                    <ControlLabel>From</ControlLabel>
                  </Col>
                  <Col md={9}>
                    <div className="singleLineDiv">
                      <DatePicker
                        selected={moment(this.state.START_DATE)}
                        onChange={e => this.startDateChange(e)}
                        dateFormat="L"
                        className="form-control"
                      />
                      <Checkbox
                        onClick={() => this.handleCheckbox()}
                        checked={this.state.employmentPresent}
                      >
                        Present
                      </Checkbox>
                      <DatePicker
                        disabled={this.state.employmentPresent}
                        selected={moment(this.state.END_DATE)}
                        onChange={e => this.endDateChange(e)}
                        dateFormat="L"
                        className="form-control"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer style={{ display: "flex" }}>
            {this.state.validationMessage ? (
              <div
                style={{ width: "450px", margin: "10px auto" }}
                className="validationTab"
              >
                {this.state.validationMessage}
              </div>
            ) : null}
            <Button
              style={{ height: "3em", margin: "auto" }}
              onClick={() => this.handleSubmit()}
              disabled={!this.state.validationDone}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EmploymentModal;
