import React, { createContext, useMemo, useState } from 'react';

export const TokenContext = createContext();

function TokenContextProvider({ children }) {
 
    const [token, setToken] = useState("");
    const tokenShare = useMemo(() => ({token, setToken}), [token, setToken]);
 
  return (
    <TokenContext.Provider value={tokenShare}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContextProvider;