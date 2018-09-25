import moment from "moment";
import React, { Component } from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Radio,
  Row
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Auth } from "../../utils/FormAuth";
import "./BorrowerForm.css";
import { isEmpty } from "lodash";

class BorrowerForm extends Component {
  state = {
    FIRST_NAME: "",
    LAST_NAME: "",
    MIDDLE_NAME: "",
    AGE: new Date(),
    SSN: "",
    EMAIL: "",
    HOME_PHONE: "",
    YEARS_IN_SCHOOL: "",
    MARITAL_STATUS: "",
    APPLICANT_TYPE: ""
  };

  handleRadioChange(marriageStatus) {
    this.setState({
      MARITAL_STATUS: marriageStatus
    });
  }
  componentDidUpdate(prevProps) {
    if (
      !isEmpty(this.props.data) &&
      !Object.is(prevProps.data[0], this.props.data[0])
    ) {
      this.setState(this.props.data[0]);
      return;
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleValidation(e);
  }

  handleFormChange() {
    this.props.handleFormChange(this.state, this.props.identifier);
  }

  handleValidation(e) {
    const currentState = this.state;
    currentState[e.target.name] = e.target.value;
    const validationMessage = Auth.validateBorrowerForm(currentState);
    this.props.passValidationMessage(
      this.state.APPLICANT_TYPE,
      validationMessage
    );
  }

  dateChange(date) {
    this.setState({
      AGE: date
    });
  }

  static getDerivedStateFromProps(props) {
    return {
      APPLICANT_TYPE: props.APPLICANT_TYPE
    };
  }

  render() {
    return (
      <div className="BorrowerForm">
        <form>
          <FormGroup controlId="formBasicText" className="borrowerformGroup">
            <div className="nameDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Name
                  </ControlLabel>
                </Col>
                <Col md={9} className="singleLineDiv">
                  <FormControl
                    type="text"
                    value={this.state.FIRST_NAME}
                    placeholder="First Name"
                    className={!this.state.FIRST_NAME ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="FIRST_NAME"
                    onBlur={() => this.handleFormChange()}
                  />
                  <FormControl
                    type="text"
                    value={this.state.MIDDLE_NAME}
                    placeholder="MI"
                    style={{ width: "25%" }}
                    className={!this.state.MIDDLE_NAME ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="MIDDLE_NAME"
                    onBlur={() => this.handleFormChange()}
                  />
                  <FormControl
                    type="text"
                    value={this.state.LAST_NAME}
                    placeholder="Last Name"
                    className={!this.state.LAST_NAME ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="LAST_NAME"
                    onBlur={() => this.handleFormChange()}
                  />
                </Col>
              </Row>
            </div>
            <div className="AGEDiv">
              <Row className="addRow">
                <Col md={7}>
                  <Row style={{ margin: "0px !important" }}>
                    <Col md={5} style={{ textAlign: "left" }}>
                      <ControlLabel style={{ margin: "auto" }}>
                        DOB
                      </ControlLabel>
                    </Col>

                    <Col md={7} style={{ paddingLeft: "21px" }}>
                      <DatePicker
                        selected={
                          this.state.AGE ? moment(this.state.AGE) : moment()
                        }
                        onChange={e => this.dateChange(e)}
                        dateFormat="L"
                        className="form-control"
                        onBlur={() => this.handleFormChange()}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col style={{ paddingLeft: "0", marginLeft: -1 }} md={5}>
                  <div className="singleLineDiv">
                    <ControlLabel style={{ margin: "auto 8px" }}>
                      SSN
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.SSN}
                      placeholder="SSN"
                      className={!this.state.SSN ? "validate" : ""}
                      onChange={e => this.handleChange(e)}
                      name="SSN"
                      onBlur={() => this.handleFormChange()}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="MarriageDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel className="MarriageControlLabel">
                    Marriage
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <div className="marriageRadio">
                    <FormGroup>
                      <Radio
                        onChange={() => this.handleRadioChange("single")}
                        onBlur={() => this.handleFormChange()}
                        name="marriageStatus"
                        inline
                        checked={this.state.MARITAL_STATUS === "single"}
                      >
                        Single
                      </Radio>
                      <Radio
                        onChange={() => this.handleRadioChange("married")}
                        onBlur={() => this.handleFormChange()}
                        name="marriageRadio"
                        inline
                        checked={this.state.MARITAL_STATUS === "married"}
                      >
                        Married
                      </Radio>
                      <Radio
                        onChange={() => this.handleRadioChange("divorced")}
                        onBlur={() => this.handleFormChange()}
                        name="marriageRadio"
                        inline
                        checked={this.state.MARITAL_STATUS === "divorced"}
                      >
                        Divorced
                      </Radio>
                      <Radio
                        onChange={() => this.handleRadioChange("widowed")}
                        onBlur={() => this.handleFormChange()}
                        name="marriageRadio"
                        inline
                        checked={this.state.MARITAL_STATUS === "widowed"}
                      >
                        Widowed
                      </Radio>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="emailDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Email
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="EMAIL"
                    value={this.state.EMAIL}
                    placeholder="Email"
                    className={!this.state.EMAIL ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="EMAIL"
                    onBlur={() => this.handleFormChange()}
                  />
                </Col>
              </Row>
            </div>
            <div className="phoneDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Phone
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="HOME_PHONE"
                    value={this.state.HOME_PHONE}
                    placeholder="Home Phone Number"
                    className={!this.state.HOME_PHONE ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="HOME_PHONE"
                    onBlur={() => this.handleFormChange()}
                  />
                </Col>
              </Row>
            </div>
            <div className="eduDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Education
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    name="YEARS_IN_SCHOOL"
                    componentClass="select"
                    className={!this.state.YEARS_IN_SCHOOL ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    onBlur={() => this.handleFormChange()}
                    placeholder="Education"
                    value={this.state.YEARS_IN_SCHOOL}
                  >
                    <option value="">Select</option>
                    <option value="highSchool">High School</option>
                    <option value="middleSchool">Middle School</option>
                    <option value="college">College</option>
                  </FormControl>
                </Col>
              </Row>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default BorrowerForm;
