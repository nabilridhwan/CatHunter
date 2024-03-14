import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID!, // Your user pool id here
  ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID!, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
