import React, { Component } from "react";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Radio,
  Row,
  Col
} from "react-bootstrap";
import PropertyInformation from "../components/declarationPropertyInformation/PropertyInformation";
import { Auth } from "../utils/FormAuth";
import "./Declaration.css";
import MortgageInformation from "../components/MortgageInformation/MortgageInformation";
import { isEmpty } from "lodash";

class Declaration extends Component {
  state = {
    holdingPropertyTitle: "Solely",
    propertyAsPrimary: "Yes",
    hadOwnershipInterest: "Yes",
    typeOfPropertyYouOwn: "Principle Residence",
    howDidYouHold: "Solely",
    addNotes: "",
    PROPERTY_INFORMATION: {
      STREET_ADDRESS: "",
      STREET_ADDRESS2: "",
      CITY: "",
      STATE: "",
      ZIP_CODE: "",
      COUNTRY: ""
    },
    MORTGATE_TYPE_AND_TERMS: {
      INTEREST_RATE: "",
      MORTGATE_TYPE: "",
      NUMBER_OF_MONTHS: "",
      AMORTIZATION_TYPE: "",
      LOAN_AMOUNT: ""
    },
    DOWN_PAYMENT: {
      DOWN_PAYMENT_AMOUNT: "",
      DOWN_PAYMENT_TYPE_CODE: ""
    },
    DETAILS_OF_TRANSACTION: {
      PURCHASE_PRICE: ""
    }
  };

  handleRadioChange(state, value) {
    this.setState({
      [state]: value
    });
    let decState = this.state;
    decState[state] = value;
    this.handleValidation(decState);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    let decState = this.state;
    decState[e.target.name] = e.target.value;
    this.handleValidation({
      ...this.state.PROPERTY_INFORMATION,
      ...this.state.MORTGATE_TYPE_AND_TERMS,
      ...this.state.DETAILS_OF_TRANSACTION,
      ...this.state.DOWN_PAYMENT,
      ...decState
    });
  }

  handleValidation(state) {
    const validationMessage = Auth.validateDeclarationForm(state);
    this.props.handleValidationMessage("declaration", validationMessage);
    this.props.handleFormChange(state, "declaration");
  }

  componentDidMount() {
    this.setState(this.props.data);
  }

  handleFormChange(state, identifier) {
    const stateName =
      identifier === "propertyInfo"
        ? "PROPERTY_INFORMATION"
        : identifier === "DETAILS_OF_TRANSACTION"
          ? "DETAILS_OF_TRANSACTION"
          : identifier === "DOWN_PAYMENT"
            ? "DOWN_PAYMENT"
            : identifier === "mortgageInfo"
              ? "MORTGATE_TYPE_AND_TERMS"
              : null;
    let newState = this.state[stateName];
    newState = state;
    const validationMessage = Auth.validateDeclarationForm({
      ...this.state.PROPERTY_INFORMATION,
      ...this.state.MORTGATE_TYPE_AND_TERMS,
      ...this.state.DETAILS_OF_TRANSACTION,
      ...this.state.DOWN_PAYMENT,
      ...newState,
      ...this.state
    });
    this.props.handleValidationMessage(identifier, validationMessage);
    this.props.handleFormChange(state, identifier);
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

  render() {
    //console.log(this.state);
    return (
      <div className="declaration">
        <div className="declaration_information_forms">
          <Row style={{ display: "flex" }}>
            <Col md={6}>
              <PropertyInformation
                handleFormChange={(state, identifier) =>
                  this.handleFormChange(state, identifier)
                }
                identifier={"propertyInfo"}
                data={{
                  ...this.state.PROPERTY_INFORMATION,
                  DOWN_PAYMENT: this.state.DOWN_PAYMENT,
                  DETAILS_OF_TRANSACTION: this.state.DETAILS_OF_TRANSACTION
                }}
              />
            </Col>
            <Col md={6}>
              <MortgageInformation
                handleFormChange={(state, identifier) =>
                  this.handleFormChange(state, identifier)
                }
                identifier={"mortgageInfo"}
                data={this.state.MORTGATE_TYPE_AND_TERMS}
              />
            </Col>
          </Row>
        </div>
        <form>
          <FormGroup className="decDiv">
            <ControlLabel>
              1. How will you hold your property title?
            </ControlLabel>
            <div>
              <Radio
                onChange={() =>
                  this.handleRadioChange("holdingPropertyTitle", "Solely")
                }
                name="holdingPropertyTitle"
                inline
                checked={this.state.holdingPropertyTitle === "Solely"}
              >
                Solely
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange(
                    "holdingPropertyTitle",
                    "Jointly (Married)"
                  )
                }
                name="holdingPropertyTitle"
                checked={
                  this.state.holdingPropertyTitle === "Jointly (Married)"
                }
                inline
              >
                Jointly (Married)
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange(
                    "holdingPropertyTitle",
                    "Jointly (Unmarried)"
                  )
                }
                name="holdingPropertyTitle"
                checked={
                  this.state.holdingPropertyTitle === "Jointly (Unmarried)"
                }
                inline
              >
                Jointly (Unmarried)
              </Radio>
            </div>
          </FormGroup>
          <FormGroup className="decDiv">
            <ControlLabel>
              2. Do you intend to occupy the property as primary residence?*If
              yes proceed to next
            </ControlLabel>
            <div>
              <Radio
                onChange={() =>
                  this.handleRadioChange("propertyAsPrimary", "Yes")
                }
                name="propertyAsPrimary"
                inline
                checked={this.state.propertyAsPrimary === "Yes"}
              >
                Yes
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange("propertyAsPrimary", "No")
                }
                name="propertyAsPrimary"
                checked={this.state.propertyAsPrimary === "No"}
                inline
              >
                No
              </Radio>
            </div>
          </FormGroup>
          <FormGroup className="decDiv">
            <ControlLabel>
              3. Have you had ownership interest in a property in last 3
              years?*If yes please proceed to the next
            </ControlLabel>
            <div>
              <Radio
                onChange={() =>
                  this.handleRadioChange("hadOwnershipInterest", "Yes")
                }
                name="hadOwnershipInterest"
                inline
                checked={this.state.hadOwnershipInterest === "Yes"}
              >
                Yes
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange("hadOwnershipInterest", "No")
                }
                name="hadOwnershipInterest"
                checked={this.state.hadOwnershipInterest === "No"}
                inline
              >
                No
              </Radio>
            </div>
          </FormGroup>
          <FormGroup className="decDiv">
            <ControlLabel>4. What type of property did you own?</ControlLabel>
            <div>
              <Radio
                onChange={() =>
                  this.handleRadioChange(
                    "typeOfPropertyYouOwn",
                    "Principle Residence"
                  )
                }
                name="typeOfPropertyYouOwn"
                checked={
                  this.state.typeOfPropertyYouOwn === "Principle Residence"
                }
                inline
              >
                Principle Residence
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange("typeOfPropertyYouOwn", "Second Home")
                }
                name="typeOfPropertyYouOwn"
                inline
                checked={this.state.typeOfPropertyYouOwn === "Second Home"}
              >
                Second Home
              </Radio>
            </div>
          </FormGroup>
          <FormGroup className="decDiv">
            <ControlLabel>
              5. How did you hold the title to the home?
            </ControlLabel>
            <div>
              <Radio
                onChange={() =>
                  this.handleRadioChange("howDidYouHold", "Solely")
                }
                checked={this.state.howDidYouHold === "Solely"}
                name="howDidYouHold"
                inline
              >
                Solely
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange("howDidYouHold", "Jointly (Married)")
                }
                checked={this.state.howDidYouHold === "Jointly (Married)"}
                name="howDidYouHold"
                inline
              >
                Jointly (Married)
              </Radio>
              <Radio
                onChange={() =>
                  this.handleRadioChange("howDidYouHold", "Jointly (Unmarried)")
                }
                checked={this.state.howDidYouHold === "Jointly (Unmarried)"}
                name="howDidYouHold"
                inline
              >
                Jointly (Unmarried)
              </Radio>
            </div>
          </FormGroup>
          <FormGroup className="addTextDiv">
            <ControlLabel style={{ display: "flex" }}>
              Additional Notes:
            </ControlLabel>
            <FormControl
              onChange={e => this.handleChange(e)}
              name="addNotes"
              className={!this.state.addNotes ? "validate" : ""}
              componentClass="textarea"
              placeholder="Additional Notes"
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Declaration;
