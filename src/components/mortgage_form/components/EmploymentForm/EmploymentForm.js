import { isEmpty } from "lodash";
import moment from "moment";
import React, { Component } from "react";
import {
  Checkbox,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Row
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Auth } from "../../utils/FormAuth";
import "./EmploymentForm.css";

class EmploymentForm extends Component {
  state = {
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

  componentDidUpdate(prevProps) {
    if (this.props.APPLICANT_TYPE === "borrower") {
    }
    if (
      !isEmpty(this.props.data) &&
      JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
    ) {
      this.setState(this.props.data);
      return;
    }
  }

  componentDidMount() {
    this.setState(this.props.data);
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
    this.props.passEmployerValidation(
      `${this.props.APPLICANT_TYPE} employer`,
      validationMessage
    );
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

  handleFormChange() {
    this.props.handleFormChange(
      this.state,
      this.props.identifier,
      this.props.arrayIndex
    );
  }

  render() {
    return (
      <div className="EmploymentForm">
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
                    onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
                  />
                  <FormControl
                    type="text"
                    name="ADDRESS_2"
                    value={this.state.ADDRESS_2}
                    placeholder="Address 2"
                    onChange={e => this.handleChange(e)}
                    onBlur={() => this.handleFormChange()}
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
                      onBlur={() => this.handleFormChange()}
                    />
                    <FormControl
                      type="text"
                      style={{ width: "20%" }}
                      value={this.state.STATE}
                      placeholder="State"
                      className={!this.state.STATE ? "validate" : ""}
                      name="STATE"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
                    />
                    <FormControl
                      type="text"
                      style={{ width: "30%" }}
                      value={this.state.ZIP_CODE}
                      placeholder="Zip Code"
                      className={!this.state.ZIP_CODE ? "validate" : ""}
                      name="ZIP_CODE"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
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
                  onBlur={() => this.handleFormChange()}
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
                  onBlur={() => this.handleFormChange()}
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
                  onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
                    dateFormat="L"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default EmploymentForm;
