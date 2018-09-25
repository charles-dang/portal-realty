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
import "./ResidenceAddress.css";

class ResidenceAddress extends Component {
  state = {
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

  componentDidMount() {
    this.setState(this.props.data);
  }
  componentDidUpdate(prevProps) {
    if (
      !isEmpty(this.props.data) &&
      !Object.is(prevProps.data, this.props.data)
    ) {
      this.setState(this.props.data);
      return;
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      RESIDENCE_TYPE: props.RESIDENCE_TYPE
    };
  }

  handleChange(e) {
    if (e.target.name === "ADDRESS_1" || e.target.name === "ADDRESS_2") {
      const val = e.target.value;
      this.setState({
        STREET_ADDRESS: this.state.STREET_ADDRESS + val
      });
    }
    this.setState({ [e.target.name]: e.target.value });
    this.handleValidation(e);
  }

  handleValidation(e) {
    const currentState = this.state;
    currentState[e.target.name] = e.target.value;
    const validationMessage = Auth.validateResidenceForm({
      ...currentState,
      RESIDENCE_TYPE: this.props.RESIDENCE_TYPE
    });
    this.props.passResidenceValidation(
      `${this.props.RESIDENCE_TYPE} residence`,
      validationMessage
    );
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

  handleFormChange() {
    this.props.handleFormChange(
      this.state,
      this.props.identifier,
      this.props.arrayIndex
    );
  }

  handleCheckbox() {
    this.setState({
      addressCurrent: !this.state.addressCurrent,
      END_DATE: moment()
    });
  }

  render() {
    return (
      <div className="ResidenceAddress">
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
                      value={this.state.STATE}
                      style={{ width: "20%" }}
                      placeholder="State"
                      className={!this.state.STATE ? "validate" : ""}
                      name="STATE"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
                    />
                    <FormControl
                      type="text"
                      value={this.state.ZIP_CODE}
                      placeholder="Zip Code"
                      className={!this.state.ADDRESS_1 ? "validate" : ""}
                      style={{ width: "30%" }}
                      name="ZIP_CODE"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
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
                        onBlur={() => this.handleFormChange()}
                      />
                    ) : (
                      <i
                        style={{ margin: "auto", color: "#45bb45" }}
                        onClick={() => this.handleToggle()}
                        className="fas fa-toggle-on fa-2x"
                        onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
                  />
                  <Checkbox
                    onBlur={() => this.handleFormChange()}
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
                    onBlur={() => this.handleFormChange()}
                  />
                </div>
              </Col>
            </Row>
            {/* <Button bsStyle="primary">Add</Button> */}
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default ResidenceAddress;
