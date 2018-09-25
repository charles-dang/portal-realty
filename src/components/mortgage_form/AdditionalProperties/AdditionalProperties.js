import { isEmpty } from "lodash";
import React, { Component } from "react";
import { FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import AdditionalPropertiesModal from "../components/AdditionalPropertiesModal/AdditionalPropertiesModal";
import "../Assets/Assets.css";

class Assets extends Component {
  state = {
    HOUSE: [],
    RENTAL_PROPERTIES: [],
    editAssetType: "",
    editAsset: false,
    editAssetData: [],
    editAssetDataIndex: ""
  };

  handleAssetDataAdd(assetData, assetType) {
    this.setState(currentState => {
      return {
        [assetType]: [...currentState[assetType], assetData]
      };
    });
    let state = JSON.parse(JSON.stringify(this.state));
    state[assetType] = [...this.state[assetType], assetData];

    this.props.handleFormChange(
      {
        HOUSE: state.HOUSE,
        RENTAL_PROPERTIES: state.RENTAL_PROPERTIES
      },
      "assets"
    );
  }

  handleAssetUpdate(assetData, assetType) {
    const index = this.state.editAssetDataIndex;
    let asset = this.state[assetType];
    asset[index] = assetData;
    let assetState = JSON.parse(JSON.stringify(this.state));
    assetState[assetType] = asset;

    this.props.handleFormChange(
      {
        HOUSE: assetState.HOUSE,
        RENTAL_PROPERTIES: assetState.RENTAL_PROPERTIES
      },
      "assets"
    );
    this.setState({
      [assetType]: asset,
      editAsset: false,
      editAssetData: [],
      editAssetDataIndex: "",
      editAssetType: ""
    });
  }

  editAsset(index, assetType) {
    this.setState({
      editAssetType: assetType,
      editAssetData: this.state[assetType][index],
      editAssetDataIndex: index,
      editAsset: true
    });
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

  deleteAsset(index, assetType) {
    let asset = this.state[assetType].filter((assetData, Arrayindex) => {
      return Arrayindex !== index;
    });
    this.setState({
      [assetType]: asset
    });
    let assetState = JSON.parse(JSON.stringify(this.state));
    assetState[assetType] = asset;
    this.props.handleFormChange(assetState, "assets");
  }

  componentDidMount() {
    this.setState(this.props.data);
  }

  render() {
    const deleteTooltip = <Tooltip id="tooltip">Delete</Tooltip>;
    const editTooltip = <Tooltip id="tooltip">Edit</Tooltip>;
    return (
      <div>
        <AdditionalPropertiesModal
          addData={(assetData, assetType) =>
            this.handleAssetDataAdd(assetData, assetType)
          }
          updateData={(assetData, assetType) =>
            this.handleAssetUpdate(assetData, assetType)
          }
          editAssetType={this.state.editAssetType}
          editAssetData={this.state.editAssetData}
          editModal={this.state.editAsset}
        />
        <div className="Assets">
          <div className={this.state.RENTAL_PROPERTIES[0] ? "border" : ""}>
            {this.state.RENTAL_PROPERTIES[0]
              ? this.state.RENTAL_PROPERTIES.map((rentalData, id) => {
                  return (
                    <div key={id} className="rentalProperty">
                      <div className="assetsCardheader">
                        <p>Rental Property</p>
                        <div className="assetHeaderIcons">
                          <OverlayTrigger placement="top" overlay={editTooltip}>
                            <i
                              onClick={() =>
                                this.editAsset(id, "RENTAL_PROPERTIES")
                              }
                              className="fas fa-pencil-alt"
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={deleteTooltip}
                          >
                            <i
                              onClick={() =>
                                this.deleteAsset(id, "RENTAL_PROPERTIES")
                              }
                              className="fas fa-times"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="rentalPropertyData">
                        <div className="flexRow">
                          <div className="alignleft" style={{ flex: 0.3 }}>
                            <b>Address</b>
                          </div>
                          <div className="alignleft" style={{ flex: 0.7 }}>
                            <div className="rentalAddress">
                              <div className="addInputDiv">
                                <FormControl
                                  disabled
                                  type="text"
                                  value={rentalData.STREET_ADDRESS}
                                />
                                <FormControl
                                  disabled
                                  type="text"
                                  value={rentalData.STREET_ADDRESS2}
                                />
                                <div className="singleLineDiv">
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={rentalData.CITY}
                                  />
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={rentalData.STATE}
                                  />
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={rentalData.ZIP_CODE}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Property Type</b>
                          <p className="alignleft">
                            {rentalData.PROPERTY_TYPE}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Market Value</b>
                          <p className="alignleft">
                            ${rentalData.MARKET_VALUE}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Monthly Payment</b>
                          <p className="alignleft">
                            ${rentalData.MONTHLY_MORTGAGE_PAYMENT}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Monthly Insurance</b>
                          <p className="alignleft">
                            ${rentalData.MONTHLY_INSURANCE}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Loan Balance</b>
                          <p className="alignleft">
                            ${rentalData.LOAN_BALANCE}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className={this.state.HOUSE[0] ? "border" : ""}>
            {this.state.HOUSE[0]
              ? this.state.HOUSE.map((houseData, id) => {
                  return (
                    <div key={id} className="house">
                      <div className="assetsCardheader">
                        <p>House</p>
                        <div className="assetHeaderIcons">
                          <OverlayTrigger placement="top" overlay={editTooltip}>
                            <i
                              onClick={() => this.editAsset(id, "HOUSE")}
                              className="fas fa-pencil-alt"
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={deleteTooltip}
                          >
                            <i
                              onClick={() => this.deleteAsset(id, "HOUSE")}
                              className="fas fa-times"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="houseData">
                        <div className="flexRow">
                          <div className="alignleft" style={{ flex: 0.3 }}>
                            <b>Address</b>
                          </div>
                          <div className="alignleft" style={{ flex: 0.7 }}>
                            <div className="rentalAddress">
                              <div className="addInputDiv">
                                <FormControl
                                  disabled
                                  type="text"
                                  value={houseData.STREET_ADDRESS}
                                />
                                <FormControl
                                  disabled
                                  type="text"
                                  value={houseData.STREET_ADDRESS2}
                                />
                                <div className="singleLineDiv">
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={houseData.CITY}
                                  />
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={houseData.STATE}
                                  />
                                  <FormControl
                                    disabled
                                    type="text"
                                    value={houseData.ZIP_CODE}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Property Type</b>
                          <p className="alignleft">{houseData.PROPERTY_TYPE}</p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Market Value</b>
                          <p className="alignleft">${houseData.MARKET_VALUE}</p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Monthly Payment</b>
                          <p className="alignleft">
                            ${houseData.MONTHLY_MORTGAGE_PAYMENT}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Monthly Insurance</b>
                          <p className="alignleft">
                            ${houseData.MONTHLY_INSURANCE}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Loan Balance</b>
                          <p className="alignleft">${houseData.LOAN_BALANCE}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Assets;
