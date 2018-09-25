import { isEmpty } from "lodash";
import React, { Component } from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Radio,
  Row
} from "react-bootstrap";
import "./propertyInfo.css";

class PropertyInformation extends Component {
  state = {
    STREET_ADDRESS: "",
    STREET_ADDRESS2: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    loanType: "New Purchase",
    DETAILS_OF_TRANSACTION: {
      PURCHASE_PRICE: ""
    },
    DOWN_PAYMENT: {
      DOWN_PAYMENT_AMOUNT: ""
    }
  };

  handleRadioChange(loanType) {
    this.setState({
      loanType: loanType
    });
  }

  handleFormChange(e) {
    if (e.target.name === "DOWN_PAYMENT") {
      this.props.handleFormChange(this.state.DOWN_PAYMENT, "DOWN_PAYMENT");
    } else if (e.target.name === "DETAILS_OF_TRANSACTION") {
      this.props.handleFormChange(
        this.state.DETAILS_OF_TRANSACTION,
        "DETAILS_OF_TRANSACTION"
      );
    } else {
      this.props.handleFormChange(
        {
          STREET_ADDRESS: this.state.STREET_ADDRESS,
          STREET_ADDRESS2: this.state.STREET_ADDRESS2,
          CITY: this.state.CITY,
          STATE: this.state.STATE,
          ZIP_CODE: this.state.ZIP_CODE,
          loanType: this.state.loanType
        },
        this.props.identifier
      );
    }
  }

  handleChange(e) {
    if (e.target.name === "DOWN_PAYMENT") {
      const eventValue = e.target.value;
      this.setState({
        ...this.state,
        DOWN_PAYMENT: {
          ...this.state["DOWN_PAYMENT"],
          DOWN_PAYMENT_AMOUNT: eventValue
        }
      });
    } else if (e.target.name === "DETAILS_OF_TRANSACTION") {
      const eventValue = e.target.value;
      this.setState(currentState => {
        return {
          DETAILS_OF_TRANSACTION: {
            ...currentState.DETAILS_OF_TRANSACTION,
            PURCHASE_PRICE: eventValue
          }
        };
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  // componentDidMount() {
  //   this.setState(this.props.data);
  // }

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
      <div className="PropertyInformation">
        <p className="borrower-head">Property Information</p>
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
                    name="STREET_ADDRESS"
                    value={this.state.STREET_ADDRESS}
                    placeholder="Address 1"
                    className={!this.state.STREET_ADDRESS ? "validate" : ""}
                    onChange={e => this.handleChange(e)}
                    onBlur={e => this.handleFormChange(e)}
                  />
                  <FormControl
                    type="text"
                    name="STREET_ADDRESS2"
                    value={this.state.STREET_ADDRESS2}
                    placeholder="Address 2"
                    onChange={e => this.handleChange(e)}
                    onBlur={e => this.handleFormChange(e)}
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
                      onBlur={e => this.handleFormChange(e)}
                    />
                    <FormControl
                      type="text"
                      value={this.state.STATE}
                      style={{ width: "20%" }}
                      placeholder="State"
                      className={!this.state.STATE ? "validate" : ""}
                      name="STATE"
                      onChange={e => this.handleChange(e)}
                      onBlur={e => this.handleFormChange(e)}
                    />
                    <FormControl
                      type="text"
                      value={this.state.ZIP_CODE}
                      placeholder="Zip Code"
                      className={!this.state.ZIP_CODE ? "validate" : ""}
                      style={{ width: "30%" }}
                      name="ZIP_CODE"
                      onChange={e => this.handleChange(e)}
                      onBlur={e => this.handleFormChange(e)}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="marriageDiv">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel className="loanTypeLabel">
                    Loan Type
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <div className="loanRadio">
                    <FormGroup>
                      <Radio
                        onChange={() => this.handleRadioChange("New Purchase")}
                        onBlur={e => this.handleFormChange(e)}
                        name="loanType"
                        inline
                        checked={
                          this.state.loanType === "New Purchase" ? true : false
                        }
                      >
                        New Purchase
                      </Radio>
                      <Radio
                        onChange={() => this.handleRadioChange("Refinance")}
                        onBlur={e => this.handleFormChange(e)}
                        name="loanType"
                        inline
                        checked={this.state.loanType === "Refinance"}
                      >
                        Refinance
                      </Radio>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="DETAILS_OF_TRANSACTION">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Purchase Price
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={
                      this.state.DETAILS_OF_TRANSACTION
                        ? this.state.DETAILS_OF_TRANSACTION.PURCHASE_PRICE
                        : ""
                    }
                    placeholder="Purchase Price"
                    className={
                      this.state.DETAILS_OF_TRANSACTION &&
                      !this.state.DETAILS_OF_TRANSACTION.PURCHASE_PRICE
                        ? "validate"
                        : ""
                    }
                    onChange={e => this.handleChange(e)}
                    name="DETAILS_OF_TRANSACTION"
                    onBlur={e => this.handleFormChange(e)}
                  />
                </Col>
              </Row>
            </div>
            <div className="DOWN_PAYMENT">
              <Row className="addRow">
                <Col md={3}>
                  <ControlLabel style={{ margin: "auto 2px" }}>
                    Down Payment
                  </ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={
                      this.state.DOWN_PAYMENT
                        ? this.state.DOWN_PAYMENT.DOWN_PAYMENT_AMOUNT
                        : ""
                    }
                    placeholder="Down Payment"
                    className={
                      this.state.DOWN_PAYMENT &&
                      !this.state.DOWN_PAYMENT.DOWN_PAYMENT_AMOUNT
                        ? "validate"
                        : ""
                    }
                    onChange={e => this.handleChange(e)}
                    name="DOWN_PAYMENT"
                    onBlur={e => this.handleFormChange(e)}
                  />
                </Col>
              </Row>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default PropertyInformation;
