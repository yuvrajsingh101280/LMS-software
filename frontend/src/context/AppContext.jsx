import React from "react";
import { createContext } from "react";
export const Appcontext = createContext();
const value = {};
export const AppContextPovider = ({ children }) => {
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
