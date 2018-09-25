import moment from "moment";
import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
  Row
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Auth } from "../utils/FormAuth";

class ResidenceModal extends Component {
  state = {
    show: false,
    validationMessage: "",
    RESIDENCE_APPLICANT_TYPE: "",
    validationDone: false,
    RESIDENCE_TYPE: "",
    ADDRESS_1: "",
    ADDRESS_2: "",
    STREET_ADDRESS: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    COUNTRY: "",
    TYPE: "",
    START_DATE: new Date(),
    END_DATE: new Date(),
    addressCurrent: false
  };

  handleClose() {
    this.props.onClose();
    this.setState({
      show: false,
      validationMessage: "",
      RESIDENCE_APPLICANT_TYPE: "",
      validationDone: false,
      RESIDENCE_TYPE: "",
      ADDRESS_1: "",
      ADDRESS_2: "",
      STREET_ADDRESS: "",
      CITY: "",
      STATE: "",
      ZIP_CODE: "",
      COUNTRY: "",
      TYPE: "",
      START_DATE: new Date(),
      END_DATE: new Date(),
      addressCurrent: false
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    this.handleClose();
    this.props.addResidence(this.state.RESIDENCE_APPLICANT_TYPE, this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleValidation(e);
  }

  handleValidation(e) {
    const currentState = this.state;
    currentState[e.target.name] = e.target.value;
    const validationMessage = Auth.validateResidenceForm({
      ...currentState,
      RESIDENCE_APPLICANT_TYPE: this.props.RESIDENCE_APPLICANT_TYPE
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
  START_DATEChange(date) {
    this.setState({
      START_DATE: date
    });
  }

  END_DATEChange(date) {
    this.setState({
      END_DATE: date
    });
  }

  handleToggle() {
    this.setState({
      TYPE: this.state.TYPE === "own" ? "rent" : "own"
    });
  }

  handleCheckbox() {
    this.setState({
      addressCurrent: !this.state.addressCurrent,
      END_DATE: moment()
    });
  }

  static getDerivedStateFromProps(props) {
    return {
      show: props.showModal,
      RESIDENCE_APPLICANT_TYPE: props.RESIDENCE_APPLICANT_TYPE
    };
  }
  render() {
    return (
      <div className="ResidenceModal">
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>Add Residence Address</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup className="addDiv">
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
                        className={!this.state.ADDRESS_1 ? "validate" : ""}
                        placeholder="Address 1"
                        onChange={e => this.handleChange(e)}
                      />
                      <FormControl
                        type="text"
                        name="ADDRESS_2"
                        value={this.state.ADDRESS_2}
                        className={!this.state.ADDRESS_2 ? "validate" : ""}
                        placeholder="Address 2"
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
                          value={this.state.STATE}
                          style={{ width: "20%" }}
                          placeholder="State"
                          className={!this.state.STATE ? "validate" : ""}
                          name="STATE"
                          onChange={e => this.handleChange(e)}
                        />
                        <FormControl
                          type="text"
                          value={this.state.ZIP_CODE}
                          placeholder="Zip Code"
                          className={!this.state.ADDRESS_1 ? "validate" : ""}
                          style={{ width: "30%" }}
                          name="ZIP_CODE"
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="ownGroupDiv">
                <Row className="addRow">
                  <Col md={4} />
                  <Col md={3}>
                    <div className="ownDiv">
                      <ControlLabel style={{ margin: "4px 10px 0px 10px" }}>
                        Own
                      </ControlLabel>
                      <div>
                        {this.state.TYPE === "own" ? (
                          <i
                            style={{ margin: "auto" }}
                            onClick={() => this.handleToggle()}
                            className="fas fa-toggle-off fa-2x"
                          />
                        ) : (
                          <i
                            style={{ margin: "auto", color: "#45bb45" }}
                            onClick={() => this.handleToggle()}
                            className="fas fa-toggle-on fa-2x"
                          />
                        )}
                      </div>
                      <ControlLabel style={{ margin: "4px 10px 0px 10px" }}>
                        Rent
                      </ControlLabel>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="CountryDiv">
                      <ControlLabel style={{ margin: "auto 8px" }}>
                        Country
                      </ControlLabel>
                      <FormControl
                        type="text"
                        name="COUNTRY"
                        value={this.state.COUNTRY}
                        placeholder="Country"
                        className={!this.state.COUNTRY ? "validate" : ""}
                        onChange={e => this.handleChange(e)}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="sinceDiv">
                <Row className="addRow rowAlign">
                  <Col md={3}>
                    <ControlLabel>Since</ControlLabel>
                  </Col>
                  <Col md={9}>
                    <div className="singleLineDiv">
                      <DatePicker
                        selected={
                          this.state.START_DATE
                            ? moment(this.state.START_DATE)
                            : moment()
                        }
                        onChange={e => this.START_DATEChange(e)}
                        dateFormat="L"
                        className="form-control"
                      />
                      <Checkbox
                        onClick={() => this.handleCheckbox()}
                        checked={this.state.addressCurrent}
                      >
                        Present
                      </Checkbox>
                      <DatePicker
                        disabled={this.state.addressCurrent}
                        selected={
                          this.state.END_DATE
                            ? moment(this.state.END_DATE)
                            : moment()
                        }
                        onChange={e => this.END_DATEChange(e)}
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

export default ResidenceModal;
