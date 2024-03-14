import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class AuthGuard implements CanActivate {
  public verifier = CognitoJwtVerifier.create({
    tokenUse: 'access',
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    clientId: process.env.AWS_COGNITO_CLIENT_ID,
  });

  private async validateToken(token: string) {
    return await this.verifier.verify(token);
  }

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { authorization } = request.headers;

    if (!authorization) return false;

    //   Split the Bearer token from the header
    const token = authorization.split(' ')[1];

    //   Validate the token
    try {
      const payload = await this.validateToken(token);

      // Sets the request of the user
      request.user = payload;
      request.user.email = payload['cognito:groups']
        .at(0)
        .split('email@')
        .at(1);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
