import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Col
} from "react-bootstrap";
import "./mortgageInfo.css";
import { isEmpty } from "lodash";

class MortgageInformation extends Component {
  state = {
    otherTerm: false,
    otherMortgage: false,
    otherAmortization: false,
    MORTGATE_TYPE: "",
    AMORTIZATION_TYPE: "",
    INTEREST_RATE: "",
    NUMBER_OF_MONTHS: ""
  };

  handleFormChange() {
    this.props.handleFormChange(this.state, this.props.identifier);
  }

  handleChange(e) {
    if (e.target.name === "MORTGATE_TYPE" && e.target.value === "other") {
      this.setState({
        MORTGATE_TYPE: "",
        otherMortgage: true
      });
    } else if (
      e.target.name === "AMORTIZATION_TYPE" &&
      e.target.value === "other"
    ) {
      this.setState({
        AMORTIZATION_TYPE: "",
        otherAmortization: true
      });
    } else if (
      e.target.name === "NUMBER_OF_MONTHS" &&
      e.target.value === "other"
    ) {
      this.setState({
        NUMBER_OF_MONTHS: "",
        otherTerm: true
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !isEmpty(this.props.data) &&
      JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
    ) {
      this.setState(this.props.data);
      return;
    }
  }

  render() {
    return (
      <div className="MortgageInformation">
        <p className="borrower-head">Mortgage Type and Term</p>
        <form>
          <div className="MORTGATE_TYPE">
            <Row className="addRow">
              <Col md={3}>
                <ControlLabel style={{ margin: "auto 2px" }}>
                  Mortgage Type
                </ControlLabel>
              </Col>
              <Col md={9}>
                {!this.state.otherMortgage ? (
                  <FormControl
                    name="MORTGATE_TYPE"
                    componentClass="select"
                    onChange={e => this.handleChange(e)}
                    onBlur={() => this.handleFormChange()}
                    placeholder="Mortgage Type"
                    className={!this.state.MORTGATE_TYPE ? "validate" : ""}
                    value={this.state.MORTGATE_TYPE}
                  >
                    <option value="">Select</option>
                    <option value="conventional">Conventional</option>
                    <option value="VA">VA</option>
                    <option value="FHA">FHA</option>
                    <option value="USDA">USDA/RURAL HOUSING SERVICE</option>
                    <option value="other">other</option>
                  </FormControl>
                ) : (
                  <FormControl
                    type="text"
                    value={this.state.MORTGATE_TYPE}
                    placeholder="Mortgage Type"
                    className={!this.state.MORTGATE_TYPE ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="MORTGATE_TYPE"
                    onBlur={() => this.handleFormChange()}
                  />
                )}
              </Col>
            </Row>
          </div>

          <FormGroup className="addDiv">
            <div className="AMORTIZATION_TYPE">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Amortization Type
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  {!this.state.otherAmortization ? (
                    <FormControl
                      name="AMORTIZATION_TYPE"
                      componentClass="select"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
                      placeholder="Amortization Type"
                      className={
                        !this.state.AMORTIZATION_TYPE ? "validate" : ""
                      }
                      value={this.state.AMORTIZATION_TYPE}
                    >
                      <option value="">Select</option>
                      <option value="adjustableRate">Adjustable Rate</option>
                      <option value="GEM">GEM</option>
                      <option value="fixedRate">Fixed Rate</option>
                      <option value="GPM">GPM</option>
                      <option value="other">other</option>
                    </FormControl>
                  ) : (
                    <FormControl
                      type="text"
                      value={this.state.AMORTIZATION_TYPE}
                      placeholder="Amortization Type"
                      className={
                        !this.state.AMORTIZATION_TYPE ? "validate" : ""
                      }
                      onChange={e => this.handleChange(e)}
                      name="AMORTIZATION_TYPE"
                      onBlur={() => this.handleFormChange()}
                    />
                  )}
                </Col>
              </Row>
            </div>

            <div className="INTEREST_RATE">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Interest Rate
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={this.state.INTEREST_RATE}
                    placeholder="Interest Rate"
                    className={!this.state.INTEREST_RATE ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    name="INTEREST_RATE"
                    onBlur={() => this.handleFormChange()}
                  />
                </Col>
              </Row>
            </div>
            <div className="NUMBER_OF_MONTHS">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Terms
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  {!this.state.otherTerm ? (
                    <FormControl
                      name="NUMBER_OF_MONTHS"
                      componentClass="select"
                      onChange={e => this.handleChange(e)}
                      onBlur={() => this.handleFormChange()}
                      placeholder="Terms"
                      className={!this.state.NUMBER_OF_MONTHS ? "validate" : ""}
                      value={this.state.NUMBER_OF_MONTHS}
                    >
                      <option value="">Select</option>
                      <option value="30yrs">30 Years</option>
                      <option value="15yrs">15 years</option>
                      <option value="5yrs">5 years</option>
                      <option value="other">other</option>
                    </FormControl>
                  ) : (
                    <FormControl
                      type="text"
                      value={this.state.NUMBER_OF_MONTHS}
                      placeholder="Terms"
                      className={!this.state.NUMBER_OF_MONTHS ? "validate" : ""}
                      onChange={e => this.handleChange(e)}
                      name="NUMBER_OF_MONTHS"
                      onBlur={() => this.handleFormChange()}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default MortgageInformation;
