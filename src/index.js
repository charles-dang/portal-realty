import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import aws_config from "./config/aws_config";

//Configure AWS Amplify
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: aws_config.cognito.REGION,
    userPoolId: aws_config.cognito.USER_POOL_ID,
    identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: aws_config.s3.REGION,
    bucket: aws_config.s3.BUCKET,
    identityPoolId: aws_config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: aws_config.apiGateway.URL,
        region: aws_config.apiGateway.REGION
      },
    ]
  }
});


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
