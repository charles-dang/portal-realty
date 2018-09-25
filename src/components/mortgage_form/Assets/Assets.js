import { isEmpty } from "lodash";
import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AssetModal from "../components/AssetModal/AssetModal";
import "./Assets.css";

class Assets extends Component {
  state = {
    BANK: [],
    AUTOMOBILES: [],
    "401K_INVESTMENT_ACCOUNT": [],
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
        BANK: state.BANK,
        AUTOMOBILES: state.AUTOMOBILES,
        "401K_INVESTMENT_ACCOUNT": state["401K_INVESTMENT_ACCOUNT"]
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
        BANK: assetState.BANK,
        AUTOMOBILES: assetState.AUTOMOBILES,
        "401K_INVESTMENT_ACCOUNT": assetState["401K_INVESTMENT_ACCOUNT"]
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
        <AssetModal
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
          <div
            className={this.state["401K_INVESTMENT_ACCOUNT"][0] ? "border" : ""}
          >
            {this.state["401K_INVESTMENT_ACCOUNT"][0]
              ? this.state["401K_INVESTMENT_ACCOUNT"].map(
                  (investmentData, id) => {
                    return (
                      <div key={id} className="investmentAcc">
                        <div className="assetsCardheader">
                          <p>401k/Investment Account</p>
                          <div className="assetHeaderIcons">
                            <OverlayTrigger
                              placement="top"
                              overlay={editTooltip}
                            >
                              <i
                                onClick={() =>
                                  this.editAsset(id, "401K_INVESTMENT_ACCOUNT")
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
                                  this.deleteAsset(
                                    id,
                                    "401K_INVESTMENT_ACCOUNT"
                                  )
                                }
                                className="fas fa-times"
                              />
                            </OverlayTrigger>
                          </div>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Bank Name</b>
                          <p className="alignleft marginLeft">
                            {investmentData.BANK_NAME}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Account</b>
                          <p className="alignleft marginLeft">
                            {investmentData.ACCOUNT_NUMBER}
                          </p>
                        </div>
                        <div className="flexRow">
                          <b className="alignleft">Current Balance</b>
                          <p className="alignleft marginLeft">
                            ${investmentData.ACCOUNT_BALANCE}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )
              : null}
          </div>
          <div className={this.state.BANK[0] ? "border" : ""}>
            {this.state.BANK[0]
              ? this.state.BANK.map((bankData, id) => {
                  return (
                    <div key={id} className="bankAcc">
                      <div className="assetsCardheader">
                        <p>Bank Account</p>
                        <div className="assetHeaderIcons">
                          <OverlayTrigger placement="top" overlay={editTooltip}>
                            <i
                              onClick={() => this.editAsset(id, "BANK")}
                              className="fas fa-pencil-alt"
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={deleteTooltip}
                          >
                            <i
                              onClick={() => this.deleteAsset(id, "BANK")}
                              className="fas fa-times"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Bank Name</b>
                        <p className="alignleft marginLeft">
                          {bankData.BANK_NAME}
                        </p>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Account Name</b>
                        <p className="alignleft marginLeft">
                          {bankData.ACCOUNT_NUMBER}
                        </p>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Current Balance</b>
                        <p className="alignleft marginLeft">
                          ${bankData.ACCOUNT_BALANCE}
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className={this.state.AUTOMOBILES[0] ? "border" : ""}>
            {this.state.AUTOMOBILES[0]
              ? this.state.AUTOMOBILES.map((automobileData, id) => {
                  return (
                    <div key={id} className="Automobiles">
                      <div className="assetsCardheader">
                        <p>Automobiles</p>
                        <div className="assetHeaderIcons">
                          <OverlayTrigger placement="top" overlay={editTooltip}>
                            <i
                              onClick={() => this.editAsset(id, "AUTOMOBILES")}
                              className="fas fa-pencil-alt"
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={deleteTooltip}
                          >
                            <i
                              onClick={() =>
                                this.deleteAsset(id, "AUTOMOBILES")
                              }
                              className="fas fa-times"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Year Make</b>
                        <p className="alignleft marginLeft">
                          {automobileData.MAKE}
                        </p>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Market Value</b>
                        <p className="alignleft marginLeft">
                          ${automobileData.MARKET_VALUE}
                        </p>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Monthly Payment</b>
                        <p className="alignleft marginLeft">
                          ${automobileData.MONTHLY_PAYMENT}
                        </p>
                      </div>
                      <div className="flexRow">
                        <b className="alignleft">Loan Balance</b>
                        <p className="alignleft marginLeft">
                          ${automobileData.LOAN}
                        </p>
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
