import { createContext, useState } from "react";

//create the provider component
export const CryptoProvider = ({ children }) => {
  const [test, setTest] = useState("test state");

  return (
    <CryptoContext.Provider value={{ test }}>{children}</CryptoContext.Provider>
  );
};

// create context object
export const CryptoContext = createContext({});
