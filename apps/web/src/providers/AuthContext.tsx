import React, {createContext, useEffect, useState} from 'react';
import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import userPool from "../auth/userPool";

interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;
  session: CognitoUserSession | null;

  isLoggedIn: boolean;

  setAccessToken: (access_token: string) => void;
  setRefreshToken: (refresh_token: string) => void;
  setSession: (session: CognitoUserSession) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * AuthProvider
 * @param children
 * @constructor
 */
export function AuthProvider({children}: { children: React.ReactNode }) {
  const [refreshToken, _setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );

  const [accessToken, _setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );

  const [session, setSession] = useState<CognitoUserSession | null>(null);

  const setRefreshToken = (newRefreshToken: string) => {
    _setRefreshToken(newRefreshToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  const setAccessToken = (newAccessToken: string) => {
    _setAccessToken(newAccessToken);
    localStorage.setItem('accessToken', newAccessToken);
  };

  const refetchAccessToken = async (email: string) => {
    if (!session) {
      console.error('No session found to refresh token');
      return;
    }

    console.log(`Refetching access token for ${email}`)

    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    user.refreshSession(session.getRefreshToken(), (err: Error, session: CognitoUserSession) => {
      if (err) {
        console.error(err);
        return;
      }

      setAccessToken(session.getAccessToken().getJwtToken());
    });
  }

  // useEffect(() => {
  //
  //   const timer = setInterval(() => {
  //     if (refreshToken) {
  //       refetchAccessToken('nabridhwan@gmail.com')
  //     }
  //
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(timer);
  //   }
  //
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        isLoggedIn: false,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
