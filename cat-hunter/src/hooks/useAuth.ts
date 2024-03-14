import {AuthContext} from "../providers/AuthContext";
import React from "react";

/**
 * Custom hook to use the AuthContext
 */
export const useAuth = () => {

  const items = React.useContext(AuthContext);

  if (!items) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return items;
}
