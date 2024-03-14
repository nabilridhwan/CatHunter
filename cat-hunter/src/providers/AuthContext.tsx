import React, {createContext, useState} from 'react';
import {CognitoUser, CognitoUserSession} from "amazon-cognito-identity-js";

interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;

  isLoggedIn: boolean;

  setAccessToken: (access_token: string) => void;
  setRefreshToken: (refresh_token: string) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);


/**
 * AuthProvider
 * @param children
 * @constructor
 */
export function AuthProvider({children}: { children: React.ReactNode }) {
  const [refreshToken, _setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

  const [accessToken, _setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));

  const setRefreshToken = (newRefreshToken: string) => {
    _setRefreshToken(newRefreshToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  const setAccessToken = (newAccessToken: string) => {
    _setAccessToken(newAccessToken);
    localStorage.setItem("accessToken", newAccessToken);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
