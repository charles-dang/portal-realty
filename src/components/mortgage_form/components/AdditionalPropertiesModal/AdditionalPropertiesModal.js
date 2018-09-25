import React, { Component } from "react";
import { Button, Col, ControlLabel, DropdownButton, FormControl, FormGroup, MenuItem, Modal, Row } from "react-bootstrap";
import { Auth } from "../../utils/FormAuth";

class AdditionalPropertiesModal extends Component {
  state = {
    edit: false,
    show: false,
    assetType: "",
    assetData: null,
    validationDone: false,
    validationMessage: "",

    HOUSE: {
      STREET_ADDRESS: "",
      STREET_ADDRESS2: "",
      CITY: "",
      ZIP_CODE: "",
      STATE: "",
      MONTHLY_MORTGAGE_PAYMENT: "",
      MONTHLY_INSURANCE: "",
      MARKET_VALUE: "",
      LOAN_BALANCE: "",
      PROPERTY_TYPE: "Primary Residence"
    },
    RENTAL_PROPERTIES: {
      STREET_ADDRESS: "",
      STREET_ADDRESS2: "",
      CITY: "",
      MONTHLY_INSURANCE: "",
      ZIP_CODE: "",
      STATE: "",
      MONTHLY_MORTGAGE_PAYMENT: "",
      MARKET_VALUE: "",
      LOAN_BALANCE: "",
      PROPERTY_TYPE: "Secondary Residence"
    }
  };

  handleClose() {
    this.setState({ show: false, assetData: null, assetType: "", edit: false });
  }

  handleOnSelect(assetType) {
    this.setState({
      assetType: assetType,
      assetData: JSON.parse(JSON.stringify(this.state[assetType]))
    });
    this.handleShow();
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    if (this.state.edit) {
      this.props.updateData(this.state.assetData, this.state.assetType);
    } else {
      this.props.addData(this.state.assetData, this.state.assetType);
    }
    this.handleClose();
  }

  handleChange(e) {
    const data = JSON.parse(JSON.stringify(this.state.assetData));
    data[e.target.name] = e.target.value;
    this.setState({
      assetData: JSON.parse(JSON.stringify(data))
    });
    this.handleValidation(data);
  }

  handleValidation(data) {
    const validationMessage = Auth.validateAssetModal(
      data,
      this.state.assetType
    );
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

  static getDerivedStateFromProps(props, state) {
    if (props.editModal && !state.edit) {
      return {
        assetData: props.editAssetData,
        assetType: props.editAssetType,
        show: true,
        edit: true,
        validationDone: true
      };
    }
    return null;
  }
  render() {
    return (
      <div className="AdditionalPropertiesModal">
        <div className="assetsDropdown">
          <DropdownButton
            title="Add Additional Properties"
            key="1"
            id={`dropdown-basic`}
          >
            <MenuItem
              onSelect={() => this.handleOnSelect("RENTAL_PROPERTIES")}
              eventKey="1"
            >
              Add Rental Property
            </MenuItem>
            <MenuItem
              onSelect={() => this.handleOnSelect("HOUSE")}
              eventKey="2"
            >
              Add House
            </MenuItem>
          </DropdownButton>
        </div>
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>Add {this.state.assetType.toLowerCase()}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* HOUSE and RENTAL_PROPERTIES */}
            {this.state.assetType === "RENTAL_PROPERTIES" ||
            this.state.assetType === "HOUSE" ? (
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
                          className={
                            !this.state.assetData.STREET_ADDRESS
                              ? "validate"
                              : ""
                          }
                          type="text"
                          name="STREET_ADDRESS"
                          value={this.state.assetData.STREET_ADDRESS}
                          placeholder="Address 1"
                          onChange={e => this.handleChange(e)}
                        />
                        <FormControl
                          type="text"
                          name="STREET_ADDRESS2"
                          value={this.state.assetData.STREET_ADDRESS2}
                          placeholder="Address 2"
                          onChange={e => this.handleChange(e)}
                        />
                        <div className="singleLineDiv">
                          <FormControl
                            className={
                              !this.state.assetData.CITY ? "validate" : ""
                            }
                            type="text"
                            name="CITY"
                            value={this.state.assetData.CITY}
                            style={{ width: "40%" }}
                            placeholder="City"
                            onChange={e => this.handleChange(e)}
                          />
                          <FormControl
                            className={
                              !this.state.assetData.STATE ? "validate" : ""
                            }
                            type="text"
                            value={this.state.assetData.STATE}
                            style={{ width: "20%" }}
                            placeholder="State"
                            name="STATE"
                            onChange={e => this.handleChange(e)}
                          />
                          <FormControl
                            className={
                              !this.state.assetData.ZIP_CODE ? "validate" : ""
                            }
                            type="text"
                            value={this.state.assetData.ZIP_CODE}
                            style={{ width: "30%" }}
                            placeholder="Zip Code"
                            name="ZIP_CODE"
                            onChange={e => this.handleChange(e)}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="addRow">
                    <Col md={3}>
                      <ControlLabel style={{ margin: "auto 2px" }}>
                        Property Type
                      </ControlLabel>
                    </Col>
                    <Col md={9}>
                      <FormControl
                        className={
                          !this.state.assetData.PROPERTY_TYPE ? "validate" : ""
                        }
                        name="PROPERTY_TYPE"
                        componentClass="select"
                        onChange={e => this.handleChange(e)}
                        placeholder="Property Type"
                        value={this.state.assetData.PROPERTY_TYPE}
                      >
                        <option value="Primary Residence">
                          Primary Residence
                        </option>
                        <option value="Secondary Residence">
                          Secondary Residence
                        </option>
                        <option value="Investment Property">
                          Investment Property
                        </option>
                      </FormControl>
                    </Col>
                  </Row>
                </FormGroup>
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Market Value
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      className={
                        !this.state.assetData.MARKET_VALUE ? "validate" : ""
                      }
                      type="text"
                      value={this.state.assetData.MARKET_VALUE}
                      placeholder="Market Value"
                      onChange={e => this.handleChange(e)}
                      name="MARKET_VALUE"
                    />
                  </Col>
                </Row>
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Monthly Payment
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      className={
                        !this.state.assetData.MONTHLY_MORTGAGE_PAYMENT
                          ? "validate"
                          : ""
                      }
                      type="text"
                      value={this.state.assetData.MONTHLY_MORTGAGE_PAYMENT}
                      placeholder="Monthly Payment"
                      onChange={e => this.handleChange(e)}
                      name="MONTHLY_MORTGAGE_PAYMENT"
                    />
                  </Col>
                </Row>
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Monthly Insurance
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      className={
                        !this.state.assetData.MONTHLY_INSURANCE
                          ? "validate"
                          : ""
                      }
                      type="text"
                      value={this.state.assetData.MONTHLY_INSURANCE}
                      placeholder="Monthly Insurance"
                      onChange={e => this.handleChange(e)}
                      name="MONTHLY_INSURANCE"
                    />
                  </Col>
                </Row>
                <Row className="addRow">
                  <Col md={3}>
                    <ControlLabel style={{ margin: "auto 2px" }}>
                      Loan Balance
                    </ControlLabel>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      className={
                        !this.state.assetData.LOAN_BALANCE ? "validate" : ""
                      }
                      type="text"
                      value={this.state.assetData.LOAN_BALANCE}
                      placeholder="Loan Balance"
                      onChange={e => this.handleChange(e)}
                      name="LOAN_BALANCE"
                    />
                  </Col>
                </Row>
              </form>
            ) : null}
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

export default AdditionalPropertiesModal;
