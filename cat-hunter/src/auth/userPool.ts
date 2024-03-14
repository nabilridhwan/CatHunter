import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

const poolData = {
  UserPoolId: 'ap-southeast-1_MO91oKtAW', // Your user pool id here
  ClientId: '3g7kko47585j4kbia7j3di5h2l', // Your client id here

};

const userPool = new CognitoUserPool(poolData);

export default userPool;
